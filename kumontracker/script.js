$(document).ready(() => {
  // variable initialisation
  let gpos = 0;
  let mpos = 0;
  let length = 5;
  let direction = 1;
  let mode = 1;
  let cyclepos = 0;
  
  let grades = []
  let mistakes = []
  const namemap = {
    "A": "A",
    "B": "B",
    "C": "C",
    "D": "D",
    "1": "1",
    "2": "2",
    "3": "3",
    "4": "4",
    "5": "5",
    "6": "6",
    "7": "7",
    "8": "8",
    "9": "9",
    "backspace": "backspace",
    "reset": "reset",
    "full": "full",
    "mode": "mode",
    "length": "length",
    "direction": "direction"
  };
  const usermap = {
    direction: {
      1: "Back to front",
      0: "Front to back"
    },
    mode: {
      1: "Maths",
      0: "English"
    }
  };
  const cycle = [5, 10, 3, 4]
  
  // actual code
  const reset = () => {
    grades = [];
    mistakes = [];
    gpos = 0;
    mpos = 0;
  };
  
  const updateboxes = (length, mode) => {
    $(".box").remove();
    for (i = 0; i < length; i++) {
      if (mode) {$("#grade").append(`<div class="box" id="g-${direction ? (length - 1 - i) : i}"><span></span></div>`);};
      $("#mistakes").append(`<div class="box" id="m-${direction ? (length - 1 - i) : i}"><span></span></div>`);  
  };
    
    if (!mode) {
      $("div.grade").css("background-color", "lightgray");
      $("div.grade").css("opacity", "0.4");
      $("div.grade").css("pointer-events", "none");
      $("h1.title").css("color", "red");
    } else {
      $("div.grade").css("background-color", "lightgreen");
      $("div.grade").css("opacity", "1");
      $("div.grade").css("pointer-events", "auto");
      $("h1.title").css("color", "dodgerblue");
    };
    
    let total = 0;
    for (i = 0; i < mistakes.length; i++) {
      if (typeof(mistakes[i]) === "number") {
        total += mistakes[i];
      };
    };
    $(".total").html(`Total mistakes: ${total}`);
  };
  
  const fillboxes = (grades, mistakes) => {
    try {
      for (i = 0; i < grades.length; i++) {
        $(`#g-${i}`).get(0).innerHTML = `<span>${grades[i]}</span>`;
      };
    } catch {
      //i'm too lazy to validate input so i'll just do this
    }
    for (i = 0; i < mistakes.length; i++) {
      $(`#m-${i}`).html(`<span>${mistakes[i]}</span>`);
    };
    let total = 0;
    for (i = 0; i < mistakes.length; i++) {
      if (typeof(mistakes[i]) === "number") {
        total += mistakes[i];
      };
    };
    $(".total").html(`Total mistakes: ${total}`);
  };
  
  
  updateboxes(length, mode);
  
  $("div.button").click(event => {
    let button = $(event.target);
    let name = button.attr("name");
    name = namemap[name];
    
    if (name === "backspace") {
      let g = grades.length;
      let m = mistakes.length;
      if (g === m) {
        grades.pop();
        gpos -= 1;
        mistakes.pop();
        mpos -= 1;
      } else if (g < m) {
        mistakes.pop();
        mpos -= 1;
      } else if (m < g) {
        grades.pop();
        gpos -= 1;
      }
      updateboxes(length, mode);
      fillboxes(grades, mistakes);
    } else if (name === "reset") {
      reset();
      updateboxes(length, mode);
    } else if (name === "mode") {
      if (mode) {mode = 0;} else {mode = 1;};
      reset();
      updateboxes(length, mode);
      // procedure can be split here for clarity
      button.get(0).innerHTML = `<span>${usermap.mode[mode]}</span>`;
    } else if (name === "length") {
      (cyclepos < 3) ? (cyclepos += 1) : (cyclepos = 0);
      length = cycle[cyclepos];
      reset();
      updateboxes(length, mode);
      //
      button.get(0).innerHTML = `<span>${length}</span>`;
    } else if (name === "direction") {
      if (direction) {direction = 0;} else {direction = 1;};
      reset();
      updateboxes(length, mode);
      //
      button.get(0).innerHTML = `<span>${usermap.direction[direction]}</span>`;
    } else {
      if (name === "full") {
        if (gpos === mpos) {
          grades.push("✓");
          mistakes.push("✓");
        };
      } else if (!Number(name) && gpos < length) {
        if ((gpos === mpos || gpos === mpos - 1) && mode) {
          grades.push(name);
          gpos += 1;
        } else if (gpos === mpos + 1) {
          //do some error animation
        } else {
          alert("error")
        }
      } else if ((mpos != length) || !mode) {
        num = Number(name);
        if ((mpos === gpos || mpos === gpos - 1) || !mode) {
          mistakes.push(num);
          mpos += 1;
        } else if (mpos === gpos + 1) {
          //do some error animation
        } else {
          alert("error")
        };
      };
      fillboxes(grades, mistakes);
    };
  });
})
