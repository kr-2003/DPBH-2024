chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPage") {
      chrome.tabs.create({ url: '../newtab/newtab.html'});
    }
  });
  