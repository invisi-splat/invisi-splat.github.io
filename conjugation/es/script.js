// if you're snooping around in the code, i did this because i was too lazy to figure out how requirejs works and ajax calls weren't working for me for some reason


// shoot i forgot to spell subjunctive correctly
const tenses = ["present_indicative", "present_continuous", "preterite", "imperfect", "future", "perfect", "conditional", "pluperfect", "gerund", "imperative_affirmative", "imperative_negative", "subjective_present"]
const nicified_tenses = ["present indicative", "present continuous", "preterite", "imperfect", "future", "perfect", "conditional", "pluperfect", "gerund", "imperative affirmative", "imperative negative", "subjunctive present"]
const pronouns_bracket = ["(yo)", "(tú)", "(él)", "(nosotros)", "(vosotros)", "(ellos)", "", "(usted)", "(ustedes)"]
const pronouns = ["yo", "tú", "él", "nosotros", "vosotros", "ellos", "", "usted", "ustedes"]
const cutoff = [3, 3, 3, 9, 9, 6]

const imp_pronouns = ["tú", "usted", "nosotros", "vosotros", "ustedes"]
const imp_pronouns_num = [1, 7, 3, 4, 8]
let next = false;

let numerator = 0;
let denominator = 0;
let percentage = 0;

let streak = 0;

let correct = "";

function genPronoun(verbConj, tense) {
  if (tense === "gerund") {
    return ["", 6, verbConj[tense], true]
  } else if (tense === "imperative_affirmative" || tense === "imperative_negative") {
    let pronoun = Math.floor(Math.random() * 5)
    return [imp_pronouns[pronoun], imp_pronouns_num[pronoun], verbConj[tense][pronoun], false]
  } else {
    let pronoun = Math.floor(Math.random() * 6)
    return [pronouns[pronoun], pronoun, verbConj[tense][pronoun].slice(cutoff[pronoun]), false]
  }
}

function generateVerb() {
  let verb = Object.keys(verbs)[Math.floor(Math.random() * 192)];
  let verbConj = verbs[verb];

  let permitted_nums = [];
  if ($("#present_indicative").is(":checked")) {permitted_nums.push(0)}
  if ($("#present_continuous").is(":checked")) {permitted_nums.push(1)}
  if ($("#preterite").is(":checked")) {permitted_nums.push(2)}
  if ($("#imperfect").is(":checked")) {permitted_nums.push(3)}
  if ($("#future").is(":checked")) {permitted_nums.push(4)}
  if ($("#perfect").is(":checked")) {permitted_nums.push(5)}
  if ($("#conditional").is(":checked")) {permitted_nums.push(6)}
  if ($("#pluperfect").is(":checked")) {permitted_nums.push(7)}
  if ($("#gerund").is(":checked")) {permitted_nums.push(8)}
  if ($("#imperative_affirmative").is(":checked")) {permitted_nums.push(9)}
  if ($("#imperative_negative").is(":checked")) {permitted_nums.push(10)}
  if ($("#subjective_present").is(":checked")) {permitted_nums.push(11)}

  if (permitted_nums.length === 0) {
    $("#translation").html("...")
    $("#verb").html("...");
    $("#tense").html("you need to");
    $("#pronoun").html("select a tense!");
    $(".pre-text").html("...")
    $("#correct").html("come on, do it!")
  }

  console.log(verb)
  console.log(verbConj)

  let tense_num = permitted_nums[Math.floor(Math.random() * permitted_nums.length)]
  let tense = tenses[tense_num];
  console.log(tense_num)
  console.log(tense)
  let pronoun = genPronoun(verbConj, tense);


  console.log(pronoun);

  $("#translation").html("to " + verbConj["translation"])
  $("#verb").html(verb);
  $("#tense").html(nicified_tenses[tense_num]);
  $("#pronoun").html(pronouns[pronoun[1]]);
  if (pronoun[3]) {
    $(".pre-text").html(pronoun[0])
  } else {
    $(".pre-text").html("(" + pronoun[0] + ")")
  }
  correct = pronoun[2]
  $("#correct").css("visibility", "hidden");
  $("#correct").html(correct)

  $("#input").prop("readonly", false);
  $("#input").focus()
}

function checkAnswer() {
  let answer = $("#input").val().trim();
  if (next) {
    $("#input").css("color", "white");
    $("#cross").css("opacity", "0");
    $("#cross").css("visibility", "hidden");
    $("#correct").css("visibility", "hidden");
    $("#input").val("");
    generateVerb();
    next = false;
  } else {
    if (answer === correct) {
      console.log("Correct!")
      $("#tick").css("visibility", "visible");
      $("#tick").css("opacity", "1");
      setInterval(() => {
        $("#tick").css("opacity", "0");
        $("#tick").css("visibility", "hidden");
      }, 1500)
      $("#input").val("");
      numerator++;
      denominator++;
      percentage = Math.round(100 * (numerator/denominator));
      streak++;
      $("#numerator").html(numerator);
      $("#denominator").html(denominator);
      $("#percentage").html(percentage + "%");
      $("#streak").html(streak + "x");
      generateVerb();
    } else {
      $("#tick").css("opacity", "0");
      $("#tick").css("visibility", "hidden");
      $("#input").css("color", "#DC3737");
      $("#cross").css("visibility", "visible");
      $("#cross").css("opacity", "1");
      $("#correct").css("visibility", "visible");
      denominator++;
      percentage = Math.round(100 * (numerator/denominator));
      streak = 0;
      $("#numerator").html(numerator);
      $("#denominator").html(denominator);
      $("#percentage").html(percentage + "%");
      $("#streak").html(streak + "x");
      next = true;
      $("#input").prop("readonly", true);
    }
  }
}

function samMasterman() {
  $(".settings").css("top", "120%");
  $("#input").val("");
  generateVerb();
}

function settings() {
  $(".settings").css("top", "7%");
}

$(document).ready(() => {
  $("#input").on("keydown", function(e) {
    if (e.keyCode == 13) {
      checkAnswer();
    }
  });
  $("#save").click(() => {
    samMasterman();
  })
  $("#settings-icon").click(() => {
    settings();
  })
  $("#language").click(() => {
    window.location.href = "http://invisiprojs.rf.gd/conjugation/fr"
  })
  $(".letter").click((e) => {
    const current = $("#input").val();
    $("#input").val(current + e.target.id)
    $("#input").focus()
  })
  $("#input").focus()
  generateVerb()
})
