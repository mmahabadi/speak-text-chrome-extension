document.addEventListener("DOMContentLoaded", function () {
  const speedInput = document.getElementById("speed");
  const saveButton = document.getElementById("save-button");

  saveButton.addEventListener("click", function () {
    const speed = speedInput.value;
    chrome.storage.sync.set({ speed: speed }, function () {
      console.log("Speed saved: " + speed);
    });
  });

  chrome.storage.sync.get("speed", function (data) {
    if (data.speed) {
      speedInput.value = data.speed;
    }
  });
});
