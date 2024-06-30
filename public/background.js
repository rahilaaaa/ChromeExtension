chrome.webNavigation.onCompleted.addListener(function(details) {
    chrome.storage.sync.get(['blocklist'], function(result) {
      const blocklist = result.blocklist || [];
      const url = new URL(details.url);
      if (blocklist.includes(url.hostname)) {
        chrome.tabs.update(details.tabId, { url: "about:blank" });
      }
    });
  }, { url: [{ urlMatches: '<all_urls>' }] });
  
  
  