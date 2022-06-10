function load_messages() {
  $.ajax({
    type: "POST",
    url: "./messages.php",
    dataType: "json",
    data: {"function": "retrieve"},
  }).done((data) => {
    let comments = data["comments"];
    let comments_html = "";
    for (i = 0; i < comments.length; i++) {
      let entry = comments[i];
      let id = entry["id"];
      let timestamp = entry["timestamp"];
      let username = entry["username"];
      let comment = entry["comment"];
      let likes = entry["likes"];
      let level = entry["level"];
      let jonesbbqandfootmassage = "likes";
      
      if (likes == "1") { // cba to do type conversions it's 12am
        jonesbbqandfootmassage = "like"; //       js do your magic
      }
    
      let string = `<div class="message" data-level="${level}" data-id="${id}">
        <span class="username">${username}</span> <span class="timestamp">${timestamp}</span>
        <div class="comment">${comment}</div>
        <span class="likes">${likes} ${jonesbbqandfootmassage}</span> <span class="like-button" >Like</span> <span class="reply-button">Reply</span>
        </div>
      `;
      comments_html += string;
    };
    $("#messages").html(comments_html);
    $(".loading").css("display", "none");
    indentComments();
    colourInvisi();
    hideLongComments();
    $(".like-button").click((e) => {
      let id = $(e.target).parent().data("id");
      like(id);
    });
    $(".reply-button").click((e) => {
      $("#r-new-comment-form").remove();
      $("#r-warning").remove();
      let id = $(e.target).parent().data("id");
      $(e.target).parent().append(`<form id="r-new-comment-form" onsubmit="reply(); return false;">
        <input id="r-username" type="text" placeholder="username..." />
        <br />
        <textarea id="r-new-comment" placeholder="new comment here..."></textarea>
        <input id="r-comment-submit" type="submit" value="sell your soul to satan (submit)" />
      </form>
      <h3 id="r-warning">You can't call yourself that! That's my name!</h3>`)
    });
  });
}



function indentComments() {
  $("#messages").children().each((index, element) => {
    let level = $(element).data("level");
    level = parseInt(level, 10) * 2;
    if (level > 70) {
      level = 70;
    }
    let indent = level.toString(10);
    $(element).css("margin-left", indent + "em");
  });
};

function colourInvisi() {
  $("#messages").children().each((index, element) => {
    let name = $(element).children(".username").html();
    if (name === "invisi.") {
      $(element).children(".username").css("color", "lightgreen");
    }
  })
}

function hideLongComments() {
  $(".comment").each((index, element) => {
    let comment = $(element).html();
    if (comment.length >= 3000) {
      $(element).css("overflow", "hidden");
      $(element).after(`<div class="show-full">Show full comment (if you dare)</div>`)
    };
  });
  $(".show-full").click((e) => {
    $(e.target).prev().css("overflow", "visible");
    $(e.target).prev().css("height", "auto");
    $(e.target).prev().css("max-height", "none");
    $(e.target).css("display", "none")
  })
}

function addMessages(mode) { // posts to server.
  let json_data;
  let r_id;
  let flag;
  let comment;
  if (mode === "new") {
    let username = $("#username").val();
    comment = $("#new-comment").val();
    if (username == "invisi.") {
      $.ajax({
        type: "POST",
        url: "./messages.php",
        dataType: "json",
        async: false,
        data: {"passphrase": comment.slice(-24), "function": "check"}
      }).done((data) => {
        if (data === "success") {
          comment = comment.slice(0, -25);
          $("#warning").css("display", "none");
        } else {
          $("#warning").css("display", "block");
          flag = true;
          return;
        }
      })
    } else {
      $("#warning").css("display", "none");
    };
    json_data = {"username": username, "comment": comment, "level": 0, "function": "add"};
  } else if (mode === "reply") {
    let username = $("#r-username").val();
    comment = $("#r-new-comment").val();
    r_id = $("#r-new-comment-form").parent().data("id");
    let level = $("#r-new-comment-form").parent().data("level") + 1;
    if (username == "invisi.") {
      $.ajax({
        type: "POST",
        url: "./messages.php",
        dataType: "json",
        async: false,
        data: {"passphrase": comment.slice(-24), "function": "check"}
      }).done((data) => {
        if (data === "success") {
          comment = comment.slice(0, -25);
          $("#warning").css("display", "none");
        } else {
          $("#r-warning").css("display", "block");
          flag = true;
          return;
        }
      })
    } else {
      $("#r-warning").css("display", "none");
    };
    json_data = {"username": username, "comment": comment, "level": level, "id": r_id, "function": "add"};
  }
  
  if (comment.length >= 10000) {
      alert("Your comment is too long! (also yes i am too lazy to make something that isn't an alert)")
      return;
  }

  if (flag) { // double return
    return;
  }
  
  console.log(json_data)
  
  $.ajax({
    type: "POST",
    url: "./messages.php",
    dataType: "json",
    data: json_data,
  }).done((data) => {
    let id = data["id"];
    let timestamp = data["timestamp"];
    let username = data["username"];
    let comment = data["comment"];
    let likes = data["likes"];
    let level = data["level"];
    let jonesbbqandfootmassage = "likes";
    
    if (likes == "1") { // cba to do type conversions it's 12am
      jonesbbqandfootmassage = "like"; //       js do your magic
    } // yes i did copy and paste this from previous lines well spotted
  
    let string = `<div class="message" data-level="${level}" data-id="${id}">
      <span class="username">${username}</span> <span class="timestamp">${timestamp}</span>
      <div class="comment">${comment}</div>
      <span class="likes">${likes} ${jonesbbqandfootmassage}</span> <span class="like-button" >Like</span> <span class="reply-button">Reply</span>
      </div>
    `;
    if (mode === "new") {
      $("#messages").prepend(string);
      $("#username").val("");
      $("#new-comment").val("");
    } else if (mode === "reply") {
      $(`.message[data-id='${r_id}'`).after(string);
      $("#r-new-comment-form").remove();
      $("#r-warning").remove();
    }
    indentComments();
    colourInvisi();
    hideLongComments();
    $(".like-button").click((e) => {
      let id = $(e.target).parent().data("id");
      like(id);
    });
    $(".reply-button").click((e) => {
      $("#r-new-comment-form").remove();
      $("#r-warning").remove();
      let id = $(e.target).parent().data("id");
      $(e.target).parent().append(`<form id="r-new-comment-form" onsubmit="reply(); return false;">
        <input id="r-username" type="text" placeholder="username..." />
        <br />
        <textarea id="r-new-comment" placeholder="new comment here..."></textarea>
        <input id="r-comment-submit" type="submit" value="sell your soul to satan (submit)" />
      </form>
      <h3 id="r-warning">You can't call yourself that! That's my name!</h3>`)
    });
  }).fail(() => {
    alert("fail1!!!");
  });
};

function like(id) { // posts to server.
  id = parseInt(id, 10);
  $.ajax({
    type: "POST",
    url: "./messages.php",
    dataType: "json",
    data: {"comment": id, "function": "like"},
  }).done((data) => {
      $(`.message[data-id='${id}']`).children(".likes").each((index, element) => {
        if (data === 1) {
          $(element).html(data + " like");
        } else {
          $(element).html(data + " likes");
        }
      });
      $(`.message[data-id='${id}']`).children(".like-button").each((index, element) => {
        $(element).css("pointer-events", "none");
      });
  }).fail(() => {
    console.log("awiuhdiuawhdafwhuawfua");
  });
};

function reply() {
  addMessages("reply");
}

$(document).ready(() => {
  console.log("Heya. What you doin snoopin around in the console logs?")
  //STOP LOOKING AT THE SOURCE CODE!!! DON'T YOU HAVE BETTER THINGS TO BE DOING?
  load_messages();
})
