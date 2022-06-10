// woah. no looking! this is classified code.
// well, if you're here, you're probably smart enough to figure out how websites work so
// there's no stopping you anyways.

// global vars here! if i put it anywhere else i'll fuck myself over

let numOfTreasure = 5;
let remaining = numOfTreasure;
let checked = false;
let startTime = new Date();
const Timer = setInterval(() => {
  timer();
  if (remaining === 0) {clearInterval(Timer)};
}, 1000);

// function stuff (i think i've put too many in)

function generateChests(numOfTreasure) {
  chests = ""
  let height = $("body").height();
  let width = $("body").width();
  for (i = 0; i <= numOfTreasure - 1; i++) {
    let top = Math.floor(Math.random() * height - 50) + 50;
    let left = Math.floor(Math.random() * width - 50) + 50;
    chests += `<div class="treasure" id=${i} style="top: ${top}px; left: ${left}px;">
      <img class="image" src="treasure.png"/>
    </div>`
  }
  $(".game").html(chests);
  $(".timer").html(`it has taken you <br /> 0 seconds`)
  $(".remaining").html(`to find <br /> ${numOfTreasure - remaining}/${numOfTreasure} chests`)
};

function setClicks() {
  $(".treasure").click(event => {
    let treasure = $(event.target);
    treasure.css({"opacity": "1", "cursor": "default", "pointer-events": "none"});
    remaining -= 1;
    $(".remaining").html(`to find <br /> ${numOfTreasure - remaining}/${numOfTreasure} chests`);
  });
};

function timer() {
  let currentTime = new Date();
  let difference = Math.floor((currentTime - startTime) / 1000);
  let second = (() => {if (difference === 1) {return "second";} else {return "seconds";}})();
  $(".timer").html(`it has taken you <br /> ${difference} ${second}`);
  if (difference > 60 && checked === false) {
    $(".meta").append(`<div class="give-up" onclick="showChests();">...give up?</div>`);
    checked = true;
  };
};

function showChests() {
  clearInterval(Timer);
  $(".treasure").each((index, element) => {
    $(element).css({"opacity": "1", "cursor": "default", "pointer-events": "none"});
    $(".remaining").html(`to cheat <br /> yourself`)
  })
}

$(document).ready(() => {
  generateChests(numOfTreasure);
  setClicks();
  // timer has already been set
});
