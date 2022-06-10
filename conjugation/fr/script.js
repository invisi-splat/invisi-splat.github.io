// if you're snooping around in the code, i did this because i was too lazy to figure out how requirejs works and ajax calls weren't working for me for some reason

const tenses = ["conditional", "imperative", "imperfect", "perfect", "pluperfect", "present", "present_participle", "simple_future"]
const nicified_tenses = ["conditional", "imperative", "imperfect", "perfect", "pluperfect", "present", "present participle", "simple future"]
const pronouns = ["je", "tu", "il", "nous", "vous", "ils", ""]
const cutoff = [3, 3, 3, 5, 5, 4]

const imp_pronouns = ["(tu)", "(nous)", "(vous)"]
const imp_pronouns_num = [1, 3, 4]
let next = false;

let numerator = 0;
let denominator = 0;
let percentage = 0;

let streak = 0;

let correct = "";

function genPronoun(verbConj, tense) {
  if (tense === "imperative") {
    let pronoun = Math.floor(Math.random() * 3)
    return [imp_pronouns[pronoun], imp_pronouns_num[pronoun], verbConj[tense][pronoun]]
  } else if (tense === "present_participle") {
    return ["", 6, verbConj[tense][0]]
  } else {
    if (verbConj[tense].length === 1) {
      return ["il", 2, verbConj[tense][0].slice(3)]
    } else {
      let pronoun = Math.floor(Math.random() * 6)
      if (pronoun === 0 && verbConj[tense][pronoun].startsWith("j'")) {
        return ["j'", 0, verbConj[tense][pronoun].slice(2)]
      } else {
        return [pronouns[pronoun], pronoun, verbConj[tense][pronoun].slice(cutoff[pronoun])]
      }
    }
  }
}

function generateVerb() {
  special_verbs = []
  if ($("#aller").is(":checked")) {special_verbs.push("aller")}
  if ($("#avoir").is(":checked")) {special_verbs.push("avoir")}
  if ($("#être").is(":checked")) {special_verbs.push("être")}
  if ($("#faire").is(":checked")) {special_verbs.push("faire")}

  verb_endings = []
  if ($("#er").is(":checked")) {verb_endings.push("er")}
  if ($("#ir").is(":checked")) {verb_endings.push("ir")}
  if ($("#re").is(":checked")) {verb_endings.push("re")}

  let verb;
  let permitted_verbs = [];
  if ($("#all_verbs").is(":checked")) {
    verb = Object.keys(verbs)[Math.floor(Math.random() * Object.keys(verbs).length)];
  } else {
    for (i = 0; i < Object.keys(verbs).length; i++) {
      for (j = 0; j < verb_endings.length; j++) {
        if (verbs[Object.keys(verbs)[i]]["group"] === verb_endings[j]) {
          permitted_verbs.push(Object.keys(verbs)[i]);
          break;
        }
      }
    }
    permitted_verbs = [...permitted_verbs, ...special_verbs]
    verb = permitted_verbs[Math.floor(Math.random() * permitted_verbs.length)];
  }
  let verbConj = verbs[verb];

  let permitted_nums = [];
  if ($("#conditional").is(":checked")) {permitted_nums.push(0)}
  if ($("#imperative").is(":checked")) {permitted_nums.push(1)}
  if ($("#imperfect").is(":checked")) {permitted_nums.push(2)}
  if ($("#perfect").is(":checked")) {permitted_nums.push(3)}
  if ($("#pluperfect").is(":checked")) {permitted_nums.push(4)}
  if ($("#present").is(":checked")) {permitted_nums.push(5)}
  if ($("#present_participle").is(":checked")) {permitted_nums.push(6)}
  if ($("#simple_future").is(":checked")) {permitted_nums.push(7)}

  if (permitted_nums.length === 0) {
    $("#translation").html("...")
    $("#verb").html("...");
    $("#tense").html("you need to");
    $("#pronoun").html("select a tense!");
    $(".pre-text").html("...")
    $("#correct").html("come on, do it!")
  } else if (permitted_verbs.length === 0) {
    $("#translation").html("...")
    $("#verb").html("...");
    $("#tense").html("you need to");
    $("#pronoun").html("select a verb!");
    $(".pre-text").html("...")
    $("#correct").html("come on, do it!")
  }

  console.log(verb)
  console.log(verbConj)

  let tense_num = permitted_nums[Math.floor(Math.random() * permitted_nums.length)]
  console.log(tense_num)
  let tense = tenses[tense_num];
  console.log(tense)
  let pronoun = genPronoun(verbConj, tense);

  console.log(pronoun);

  $("#translation").html("to " + verbConj["translation"])
  $("#verb").html(verb);
  $("#tense").html(nicified_tenses[tense_num]);
  $("#pronoun").html(pronouns[pronoun[1]]);
  $(".pre-text").html(pronoun[0])
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
    $("#continue").css("display", "none");
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
      $("#continue").css("display", "inline");
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

function checkVerbs() {
  if ($("#all_verbs").is(":checked")) {
    $(".dark").css("pointer-events", "none");
    $(".dark").css("color", "grey");
    $(".box").each((i, e) => {
      if ($("#" + e.id).prev().is(":checked")) {
        $("#" + e.id).css("background-color", "#4D4D4D");
      } else {
        $("#" + e.id).css("background-color", "#1A1A1A");
      };
    })
  } else {
    $(".dark").css("pointer-events", "");
    $(".dark").css("color", "");
    $(".box").each((i, e) => {
      $("#" + e.id).css("background-color", "");
    })
  }
}

$(document).ready(() => {
  $("#input").on("keydown", function(e) {
    if (e.keyCode == 13) {
      checkAnswer();
    }
  });
  $("#save").click(() => {samMasterman();})
  $("#settings-icon").click(() => {settings();})
  $("#language").click(() => {window.location.href = "http://invisiprojs.rf.gd/conjugation/es"})
  $(".letter").click((e) => {
    const current = $("#input").val();
    $("#input").val(current + e.target.id)
    $("#input").focus()
  })
  $("#continue").click((e) => {checkAnswer()})
  $("#all_verbs_label").click((e) => {checkVerbs();})
  $("#input").focus();
  checkVerbs();
  generateVerb();
})
