window.onload = function() {
  let website = sessionStorage.getItem("website")
  console.log("Beginning request")
  console.log("Setup complete, sending request")
  try {
     console.log("Try statement")
    $.get({
      url: 'https://cors-anywhere.herokuapp.com/' + website,
      success: function (data) {
        console.log(data)
        website = new URL(website)
        console.log(website.hostname + "\n" + website.origin)
        data = data.replace("<!DOCTYPE html>", "")
        data = data.replace(/<html>/g,'');
        data = data.replace(/(?<=")\.\.\//g, website.origin + "/")
        data = data.replace(/(?<=href=")\//g, website.origin + "/")
        data = data.replace(/\.\//g, website.origin + "/")
        data = data.replace(/(?<=href=")\/\//g, website.origin + "/")
        console.log(data)
        document.documentElement.innerHTML = data
        console.log("Written data")
      }
    })
  } catch(err) {
    console.log(err)
  }
}
