function getCurrentTabURL() {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            if (tabs && tabs[0] && tabs[0].url) {
                resolve(tabs[0].url);
            }
            else {
                reject(new Error("Unable to retrieve the current tab's URL"))
            }
            const url = tabs[0].url;
            resolve(url);
        });
    })
}

const serverUrl = "http://127.0.0.1:8000/index"

document.addEventListener('DOMContentLoaded', async function () {
    document.querySelector('.local-footer-button').addEventListener('click', function () {
        const url = chrome.runtime.getURL('../newtab/newtab.html');
        chrome.tabs.create({ url: url });
    });

    
    let url = await getCurrentTabURL()
    console.log(url);
    // console.log(temp);
    var params = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ website: url })
    };

    let res = await fetch(serverUrl, params);
    console.log(res);
    let data = await res.json()
    console.log(data);
    let dataCount = data.message
    for (var i = 0; i < dataCount.length; i++) {
        document.getElementsByClassName('crowdsource-item-data-count')[i].innerHTML = dataCount[i];
    }



    // fetch(url,params)
    //     .then(response => {
    //         console.log(response);
    //         return response.json();
    //     })
    //     .then(data => {
    //         console.log("data : ",data.message);
    //         var dataCount = data.message;
    //         for (var i = 0; i < dataCount.length; i++) {
    //             document.getElementsByClassName('crowdsource-item-data-count')[i].innerHTML = dataCount[i];
    //         }
    //         // document.getElementsByClassName('crowdsource-item-data-count')[0].innerHTML = dataCount[0];
    //     })
    //     .catch(error => {
    //         console.error('Error:', error);
    //     }, false)

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

button1.addEventListener('click', function () {
    changeContent('local');
});

button2.addEventListener('click', function () {
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


function sendMessageToBackground() {
    chrome.runtime.sendMessage({ message: "getDarkPatterns" }, async function (response) {
        // var elementInfo = response.data;
        // if(Object.keys(elementInfo).length) console.log(elementInfo);
        // const localList = document.getElementById('local-list');
        // let url = await getCurrentTabURL();
        // for (var i = 0; i < elementInfo.length; i++) {
        //     var li = document.createElement('li');
        //     li.appendChild(document.createTextNode(elementInfo[i].darkPattern));
        //     localList.appendChild(li);
        // }
        const elementInfo = {
            "https://checkout.proflowers.com/": [
                // {
                //     "darkPattern": "Basket Sneaking",
                //     "data": {
                //         "initialPrice": 209,
                //         "finalPrice": 0,
                //         "difference": 209,
                //         "elementCoordinates": {
                //             "top": 587.6796875,
                //             "left": 917.1171875,
                //             "bottom": 617.6796875,
                //             "right": 971.859375,
                //             "width": 54.7421875,
                //             "height": 30
                //         },
                //         "exactUrl": "https://checkout.proflowers.com/42881712296/checkouts/86102fc7315ec02b20f426b19f49fb3a?cid=pfdts&date=2024-02-29&locale=en-US&previous_step=shipping_method&prid=pfdtsssv&step=payment_method&zipcode=10002"
                //     }
                // }
            ]
        }
        // let url = await getCurrentTabURL();
        let url = "https://checkout.proflowers.com/";
        let darkPatterns = elementInfo[url][0];
        // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        //     var activeTab = tabs[0];
        //     chrome.tabs.sendMessage(activeTab.id, {msg: "highlight", darkPatterns: darkPatterns});
        //     // chrome.tabs.sendMessage(activeTab.id, {msg: "populate", darkPatterns: elementInfo[url]});
        // });

        let localList = document.querySelector('.local-list');
        console.log(localList);
        for (let i = 0; i < elementInfo[url].length; i++) {
            const li = document.createElement('li');
            li.appendChild(document.createTextNode(elementInfo[url][i].darkPattern));
            li.addEventListener('click', function() {
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                    var activeTab = tabs[0];
                    chrome.tabs.sendMessage(activeTab.id, {msg: "highlight", darkPatterns: elementInfo[url][i]});
                });
            });
            localList.appendChild(li);
        }
    });

    document.querySelector(".ajio-false").addEventListener('click', function () {
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            var activeTab = tabs[0];
            chrome.tabs.sendMessage(activeTab.id, { msg: "ajio-hardcode"});
        });
    });
}

// Call the function initially
sendMessageToBackground();

// Set interval to call the function every 100 milliseconds
// setInterval(sendMessageToBackground, 1000);



