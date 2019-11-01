chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if(request.message === "fetch_yt_links") {
      let data = [], title, url;
      let hrefs = [...$("a[href^='https://www.youtube.com/watch'], a[href^='https://youtu.be/']")];
      // console.log("hrefs", hrefs);
      
      hrefs = hrefs.reduce((prevLink, currLink)=> {
        let dup = false;
        for (const link of prevLink) {
          if(link.href === currLink.href) {
            dup = true;
            return prevLink;
          }
        }
        if(!dup) {
          return [...prevLink, currLink];
        }
      }, []);
      // console.log("hrefs", hrefs);
      for (const link of hrefs) {
        let titleEle = link.querySelector("h3") || link.querySelector("div[role='heading']");
        let fullUrl = link.href;
        if(fullUrl.includes("youtube.be")) {
          url = `https://www.youtube.com/embed/${fullUrl.substring(fullUrl.lastIndexOf("/") + 1)}`;
        } else {
          if(link.classList.length === 0){
            url = `https://www.youtube.com/embed/${fullUrl.substring(fullUrl.lastIndexOf("=") + 1)}`;
          }
        }
        if(titleEle) {
          title = titleEle.innerText;
          data.push({title, url});
        } else {
          if(link.childElementCount == 0) {
            title = link.innerText;
            data.push({title, url })
          } else {
            let probableTitle =  link.offsetParent.querySelectorAll("h1, h2, h3, h4, h5")[0];
            title = (probableTitle && probableTitle.innerText) || "<Untitled>";
            data.push({title, url })
          }
        }
      }
      chrome.runtime.sendMessage({message: "resolved_yt_links", data});
    }
  }
);
