document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openNewTab').addEventListener('click', function () {
        const url = chrome.runtime.getURL('../newtab/newtab.html');
        chrome.tabs.create({ url: url });
    });
    
    const url = "http://127.0.0.1:8000";
    const temp = "abcd";
    var params = {
        method:'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ website: temp})
    }
    
    var crowdsource;

    fetch(url,params)
        .then(response => response.json())
        .then(data => {
            crowdsource = data;
            console.log(crowdsource);
        })
        .catch(error => console.error('Error:', error));
    
    document.getElementsByClassName('crowdsource-results')[0].innerHTML = "data from server: " + crowdsource;
    
});

