var interval;
var timerOn = false;
var counter = 0;
var totalDuration = 0;
const timeLimit = 5;
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it (like read the url)
  if (changeInfo.url && changeInfo.url.match(/shorts/)) {
    console.log("changed url", changeInfo.url);
    var video = new Audio(changeInfo.url);
    console.log(video);
    changeInfo.url.match(/shorts/) ? startTimer() : stopTimer();
  }
});

function startTimer() {
  if (!timerOn) {
    var time = 0;
    timerOn = true;
    console.log("timer started");
    interval = setInterval(function () {
      time += 1;
      if (time > timeLimit) {
        console.log(`reached ${timeLimit} seconds`);
        //   chrome.action.setPopup({ popup: "alert.html" });
        chrome.tabs.create({ url: "alert.html" });
        stopTimer();
        return clearInterval(interval);

        //   alert("You've been watching YouTube Shorts for more than 2 minutes!");
        //   chrome.action.setPopup({ popup: "alert.html" });
        //   chrome.action.setBadgeText({ text: "ON" });
        //   chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });
      }
    }, 1000);
  }
}

function stopTimer() {
  if (timerOn) {
    // Stop the timer if it is running
    timerOn = false;
    console.log("timer stopped");
    clearInterval(interval);
  }
}
