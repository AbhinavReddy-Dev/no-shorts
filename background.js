var interval;
var timerOn = false;
var totalShorts = 0;
var totalDuration = 0;
var timeLimit = 60;

// get time limit from storage or set to 60 seconds by default
chrome.storage.sync.get(["timeLimit"], function (result) {
  timeLimit = result.timeLimit || 60;
  console.log("timeLimit", timeLimit);
});

// listen for message from tab url change
chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  // read changeInfo data and do something with it (like read the url)
  if (changeInfo.url && changeInfo.url.match(/shorts/)) {
    // increment total shorts watched
    chrome.storage.sync.get(["totalShorts"], function (result) {
      totalShorts = Number(result.totalShorts);
      totalShorts += 1;
      //   set total shorts watched
      chrome.storage.sync.set({ totalShorts: totalShorts });
      console.log("totalShorts", totalShorts);
      //   set badge text
      chrome.action.setBadgeText({ text: `${totalShorts}` });
      chrome.action.setBadgeBackgroundColor({ color: "#4688F1" });
    });
    // ----------------------------
    // currently not used but can be used to get video duration
    //
    // send message to content script to receive video duration
    //
    // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    //   chrome.tabs.sendMessage(
    //     tabs[0].id,
    //     { message: "shorts-video" },
    //     async function (response) {
    //       console.log("response", await response);
    //     }
    //   );
    // });
    // ----------------------------
    // start timer to show alert
    startTimer();
  }
});

// whenever the tab url is updated with a /short/ match
async function startTimer() {
  if (!timerOn) {
    var time = 0;
    timerOn = true;
    // get total duration from storage
    chrome.storage.sync.get(["totalDuration"], function (result) {
      totalDuration = Number(result.totalDuration);
      console.log("totalDuration", totalDuration);
    });
    // start timer and increment total duration every second
    interval = setInterval(function () {
      time += 1;
      totalDuration += 1;
      //   update total duration
      chrome.storage.sync.set({ totalDuration: totalDuration });
      //  update alert window when time limit is reached
      if (time > timeLimit) {
        chrome.tabs.create({ url: "alert.html" });
        stopTimer();
        return clearInterval(interval);
      }
    }, 1000);
  }
}

function stopTimer() {
  if (timerOn) {
    // Stop the timer if it is running
    timerOn = false;
    clearInterval(interval);
  }
}
