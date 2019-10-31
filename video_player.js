$(function () {
  let videoEle = document.querySelector("#yt_video");
  chrome.storage.local.get(['url'], function(result) {
    // alert('Value currently is '+ result.url);
    videoEle.src = result.url;
  });
});