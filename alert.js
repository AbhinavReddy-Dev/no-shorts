// time limit

var timeLimit;
const timelimitInput = document.getElementById("time-limit");

//   get time limit
chrome.storage.sync.get(["timeLimit"], function (result) {
  console.log("timeLimit", result.timeLimit);
  timelimitInput.value = result.timeLimit;
});

//   update time limit
timelimitInput.addEventListener("change", function () {
  timeLimit = timelimitInput.value;
});

// display total shorts duration
chrome.storage.sync.get(["totalDuration"], function (result) {
  const duration = result.totalDuration;
  //   limit the duration to 5 digits
  document.getElementById("totalDuration").innerHTML =
    duration.length > 5 ? duration.toString().slice(0, 5) + "+" : duration;
});

// display total shorts watched
chrome.storage.sync.get(["totalShorts"], function (result) {
  const shorts = result.totalShorts;
  //   limit the shorts to 3 digits
  document.getElementById("totalShorts").innerHTML =
    shorts.length > 3 ? shorts.toString().slice(0, 5) + "+" : shorts;
});

//   set time limit
document.getElementById("set-limit").addEventListener("click", function () {
  console.log("timeLimit", timeLimit);
  alert("Time limit set to " + timeLimit + " seconds");
  chrome.storage.sync.set({ timeLimit: timeLimit });
});

// close the alert window and redirect to youtube
document.getElementById("close").addEventListener("click", function () {
  console.log("close");
  location.href = "";
  window.close();
});
