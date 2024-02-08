
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openNewTab').addEventListener('click', function () {
        chrome.tabs.create({ url: 'chrome://randomTab' }, function (tab) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: function () {
                    document.querySelector('input[name="url"]').focus();
                }
            });
        });
    });

});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    
    if (request.cmd === "price_dipping") {
        const div = document.createElement('div');
        div.textContent = request.data.content;
        document.body.appendChild(div);
        console.log(request);
    }
});

chrome.runtime.sendMessage({ message: "getElementInfo" }, function(response) {
    var elementInfo = response.data;
    if (elementInfo) {
        console.log("Received element info from background.js:", elementInfo);
        // Do something with the element info if needed
    } else {
        console.log("Element information not available.");
    }
});




