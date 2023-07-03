document.addEventListener("DOMContentLoaded", function () {
  var speakButton = document.getElementById("speak-button");

  speakButton.addEventListener("click", function () {
    var text = document.getElementById("text-to-speak").value;
    chrome.runtime.sendMessage({ action: "say", text: text });
  });
});
