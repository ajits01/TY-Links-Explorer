

$(function() {
  /** Send message to content.js to fetch all YT links */
  chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {message: "fetch_yt_links"});
  });
});

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if(request.message === "resolved_yt_links") {
      let data = request.data;
      let ulElement = document.querySelector("#links");
      
      console.log("ulElement", ulElement);
      for (let {title, url} of data) {
        let childLi = document.createElement('li');
        let childA = document.createElement('a');
        childA.innerText = title.replace("- YouTube", "");
        childA.href = url;
        // childA.target = "_blank";
        childLi.appendChild(childA);
        ulElement.appendChild(childLi);
      }

      /** OnClick Event Handing */
      ulElement.addEventListener("click", function(e) {
        e.preventDefault();
        let url = e.target.href;
        console.log(url);
        chrome.storage.local.set({url: url}, function() {
          console.log("url set", url);
        });
        if (chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
        } else {
          window.open(chrome.runtime.getURL('video_player.html'));
        }
        // chrome.storage.local.get('url', function(result) {
        //   alert('Value currently is ', result.url);
        //   // videoEle.src = result.url;
        // });
        
      });
      /** Ends */
    }
  }
);

// let ulElement = document.querySelector("#links");
// if(ulElement) {
//   ulElement.addEventListener("click", function(e) {
//     e.preventDefault();
//     console.log(e);
//     if (chrome.runtime.openOptionsPage) {
//       chrome.runtime.openOptionsPage();
//     } else {
//       window.open(chrome.runtime.getURL('video_player.html'));
//     }
//   });
// }