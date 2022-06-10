$(document).ready(() => {
  let mode = $("#mode").html();
  let density = $("#density").html();
  let tolerance = $("#tolerance").html();
  let iq = $("#iq").html();
  try {
    mode = mode.trim();
  } catch(err) {
    //
  }
  try {
    density = density.trim();
  } catch(err) {
    //
  }
  try {
    tolerance = tolerance.trim();
  } catch(err) {
    //
  }
  try {
    iq = iq.trim();
  } catch(err) {
    //
  }
  console.log(mode)
  if (mode === "dc") {
    $("#density-comparer-form").css("display", "block");
    $("#iq-to-density-form").css("display", "none");
  } else if (mode === "itd") {
    $("#density-comparer-form").css("display", "none");
    $("#iq-to-density-form").css("display", "block");
  };
  
  $("#density-comparer").click(() => {
    $("#density-comparer-form").css("display", "block");
    $("#iq-to-density-form").css("display", "none");
  });
  $("#iq-to-density").click(() => {
    $("#density-comparer-form").css("display", "none");
    $("#iq-to-density-form").css("display", "block");
  });
  
  
})
