document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('report-btn').addEventListener('click', function () {
        chrome.tabs.create({ url: 'chrome://newtab' }, function (tab) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                function: function () {
                    document.querySelector('input[name="url"]').focus();
                }
            });
        });
    });
});

