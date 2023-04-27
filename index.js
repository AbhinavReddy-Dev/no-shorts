// return video duration in seconds
function videoDuration() {
  var video = document.getElementsByTagName("video");
  if (video.length == 0) {
    return null;
  }
  var duration = video[0].duration;
  return duration;
}

// currently not used but can be used to get video duration
// listen for message from background.js
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "shorts-video") {
    var duration = videoDuration();
    if (duration) {
      sendResponse({ message: "shorts-video", duration: duration });
    }
  }
  //   returning true is important for asynchronous response
  return true;
});
