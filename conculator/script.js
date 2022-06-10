// global vars! here goes nothing

let conculation = []; // holds full calculation
let franco = ""; // holds temp values
let result = 0; // holds the result

function evil(fn) { // tysm stack overflow
  return new Function('return ' + fn)();
}

function conculate(final) {
  if (conculation.length > 2 && final) {
    return evil(conculation.join(""));
  } else if (conculation.length > 2) {
    trimmedconculation = conculation.slice("0", "-1"); // removes trailing operators
    return evil(trimmedconculation.join(""));
  } else {
    return undefined;
  }
}

const countDecimals = function(value) {  // once again tysm stack overflow
  if (value != Infinity) {
    if ((value % 1) != 0) {
      return value.toString().split(".")[1].length;  
      return 0;
    }
  }
};

function fuckitup(result) {
  function g(x) {
    return math.cbrt(x) * (Math.sin(Math.sin(Math.sin(Math.sin(x) - Math.pow(x, 3)) - 1) + 1) + x) + 0.01 * x;
  }
  let fuckedup = 10 * Math.sin(g(result)) + Math.sin(g(result)) + result;
  console.log(fuckedup)
  let decimals = countDecimals(result);
  return fuckedup.toFixed(decimals);
}

function attachButtonEvents() {
  $(".button").click((event) => {
    let value = $(event.target).attr("id");
    if (["/", "*", "-", "+"].indexOf(value) >= 0) {
      conculation.push(franco); // push the number
      conculation.push(value); // push the operator
      franco = ""; // clear temp value
      result = conculate(final=false);
      if (result || result === 0) {
        conculation = [result, conculation[conculation.length - 1]]
        result = fuckitup(result);
      };
    } else if (value === "=") {
      conculation.push(franco);
      franco = "";
      result = conculate(final=true);
      if (result || result === 0) {
        conculation = [result]
        result = fuckitup(result);
      };
    } else if (value === "c") {
      conculation = [];
      franco = "";
      result = 0;
    } else if (value === "+/-") {
      if (franco) {
        if (franco.slice(1) === "-") {
          franco = franco.slice(franco.length * -1 + 1);
        } else {
          franco = "-" + franco;
        }
        result = franco;
      } else {
        let tempresult = toString(conculation[0]); // i'm tired my variable naming is shite rn
        console.log(tempresult);
        if (tempresult.slice(1) === "-") {
          conculation[0] = tempresult.slice(tempresult.length * -1 + 1);
        } else {
          conculation[0] = "-" + conculation[0];
        }
        result = conculation[0];
      }
    } else if (value === "%") {
      franco = parseFloat(franco) / 100;
      franco = franco.toString();
      result = franco;
    } else {
      franco += value;
      result = franco;
    }
    // result formatting
    if (result === Infinity || result === "NaN") {
      conculation = [];
      franco = "";
      result = "Fuck's sake";
    }
    
    updateDisplay(result)
  })
}

function updateDisplay(result) {
  $("#display").html(result)
}

$(document).ready(() => {
  attachButtonEvents()
});
