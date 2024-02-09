document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('openNewTab').addEventListener('click', function () {
        const url = chrome.runtime.getURL('../newtab/newtab.html');
        chrome.tabs.create({ url: url });
    });
    
const url = "http://localhost:3000/index";
const temp = "1 2 3 4 5 6 7 8 9 0";
var params = {
    method:'POST',
    headers: {
        'Content-Type': 'application/json' 
    },
    body: JSON.stringify({ website: temp})
}


fetch(url,params)
    .then(response => {
        console.log(response);
        return response.json();
    })
    .then(data => {
        console.log("data : ",data.website);
        document.getElementsByClassName('crowdsource-results')[0].innerHTML = "data from server: " + data.website;
    })
    .catch(error => console.error('Error:', error));
    
});


var infoButton = document.getElementById('info');
var resultPopup = document.getElementsByClassName('detailed-results')[0];

function showPopup() { resultPopup.style.display = "block"; }
function hidePopup() { resultPopup.style.display = "none"; }

infoButton.addEventListener('mouseover', showPopup);
infoButton.addEventListener('mouseleave', hidePopup);

