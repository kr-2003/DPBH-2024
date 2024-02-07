document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openNewTab').addEventListener('click', function () {
        const url = chrome.runtime.getURL('../newtab/newtab.html');
        chrome.tabs.create({ url: url });
    });
});

