$(document).ready(() => {
  $("#h").prop("volume", 0);
  $(".h").hover(() => {
    $("#h").animate({volume: 1}, 1000);
  }, () => {
    $("#h").animate({volume: 0}, 1000);
  })
  let h = 0;
  $(".h").click(() => {
    $("body").append(`<audio class="${h}" src="h.mp3"></audio>`)
    $(`.${h}`)[0].play();
    h++;
  })
});
