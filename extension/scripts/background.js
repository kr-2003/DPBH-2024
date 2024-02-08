chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "openPage") {
      chrome.tabs.create({ url: '../newtab/newtab.html'});
    }
  });

  var timesClosed=0;

  chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    console.log(message);
    if (message.cmd === 'nagging_plus_plus') {
        timesClosed=timesClosed+1;
        console.log("Nagging count: " + timesClosed);
    }
    else if(message.cmd == 'get_nag_count'){
      sendResponse({count: timesClosed});
    }
  });

  
