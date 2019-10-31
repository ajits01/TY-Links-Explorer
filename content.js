chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if(request.message === "fetch_yt_links") {
      let data = [], title, url;
      let hrefs = $("a[href^='https://www.youtube.com/watch']");
      for (const link of hrefs) {
        let titleEle = link.querySelector("h3") || link.querySelector("div[role='heading']");
        let fullUrl = link.href;
        if(titleEle) {
          title = titleEle.innerText;
          url = `https://www.youtube.com/embed/${fullUrl.substring(fullUrl.lastIndexOf("=") + 1)}`;
          data.push({title, url});
        }
      }
      chrome.runtime.sendMessage({message: "resolved_yt_links", data});
    }
  }
);