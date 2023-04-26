document.getElementById("close").addEventListener("click", function () {
  console.log("first");
  location.href = "https://www.youtube.com/";
  window.close();
});

function videoDuration() {
  var video = document.getElementsByTagName("video");
  console.log(video);
  if (video.length == 0) {
    console.log(video.length);
    console.log("No video found");
    return null;
  }
  var duration = video[0].duration;
  var loop = video.loop;
  //   if (duration <= 60 && loop) {
  //     console.log("Short video found");
  //     return true;
  //   }
  return duration;
}
// var interval;
// function startTimer() {
//   console.log("timer started");
//   var time = 0;
//   interval = setInterval(function () {
//     time += 1;
//     if (time > 10) {
//       alert(
//         "You've been watching YouTube Shorts for more than 2 minutes!, from index"
//       );
//       clearInterval(interval);
//     }
//   }, 1000);
// }

// function stopTimer(tabId) {
//   // Stop the timer if it is running
//   clearInterval(interval);
//   console.log("timer stopped");
// }

window.addEventListener("load", function () {
  console.log("url changed");
});

// // window.addEventListener("exit", function () {
// //   stopTimer();
// // });

// whenever the tab url is updated
window.addEventListener("hashchange", function (changeInfo) {
  if (changeInfo.url) {
    console.log("url changed");

    changeInfo.url.match(/shorts/) ? startTimer() : stopTimer();
  }
});
