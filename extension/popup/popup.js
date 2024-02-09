document.addEventListener('DOMContentLoaded', function () {
    document.querySelector('.local-footer-button').addEventListener('click', function () {
        const url = chrome.runtime.getURL('../newtab/newtab.html');
        chrome.tabs.create({ url: url });
    });
    


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


// var infoButton = document.getElementById('info');
// var resultPopup = document.getElementsByClassName('detailed-results')[0];

// function showPopup() { resultPopup.style.display = "block"; }
// function hidePopup() { resultPopup.style.display = "none"; }

// infoButton.addEventListener('mouseover', showPopup);
// infoButton.addEventListener('mouseleave', hidePopup);

// var button1 = document.querySelector('#button1');

// button1.addEventListener('click', function() {
//     alert("hello")
//     changeContent('content1');
// }
// );

var button1 = document.getElementById('button1');
var button2 = document.getElementById('button2');

button1.addEventListener('click', function() {
    changeContent('local');
});

button2.addEventListener('click', function() {
    changeContent('crowdsource');
});

function changeContent(contentId) {
    var contentDiv = document.getElementById('content');
    var button1 = document.getElementById('button1');
    var button2 = document.getElementById('button2');
    // Hide all buttons
    button1.classList.remove('active');
    button2.classList.remove('active');

    document.getElementById(contentId === 'local' ? 'button1' : 'button2').classList.add('active');
    document.getElementById(contentId === 'local' ? 'crowdsource' : 'local').classList.add('hidden-content');
    document.getElementById(contentId === 'local' ? 'local' : 'crowdsource').classList.remove('hidden-content');
  }
  