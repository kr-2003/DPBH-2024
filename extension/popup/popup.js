
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

function sendMessageToBackground() {
    chrome.runtime.sendMessage({ message: "getDarkPatterns" }, function(response) {
        var elementInfo = response.data;
        if (elementInfo) {
            console.log("Received element info from background.js:", elementInfo);
        } else {
            console.log("Element information not available.");
        }
    });
}

// Call the function initially
sendMessageToBackground();

// Set interval to call the function every 100 milliseconds
setInterval(sendMessageToBackground, 1000);




