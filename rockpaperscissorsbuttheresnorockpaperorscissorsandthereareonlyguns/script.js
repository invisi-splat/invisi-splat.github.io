let choice = ["rock.", "paper.", "scissors."];

$(document).ready(() => {
  window.scrollTo(0,0);
  $("#gun").click((event) => {
    $("#selection").css("top", "120%");
    $("#result").css("top", "-90%");
    $("#cpu-choice").html(`${choice[Math.floor(Math.random() * 3)]}`)

    setTimeout(() => {
      $(".player-choice").css("opacity", "1");
    }, 5000)
    setTimeout(() => {
      $(".result").css("opacity", "1");
    }, 7000)
    setTimeout(() => {
      $("#vibe-check").css("display", "block");
      $("#yike").css("display", "block");
      $("body").css("background-color", "#ffcccc");
      $("#kaboom")[0].play()
    }, 8000)
    setTimeout(() => {
      $("#win-screen").css("display", "block")
      $("#yay")[0].play()
    }, 12000)
    console.log("h")
    event.preventDefault();
  })
})
