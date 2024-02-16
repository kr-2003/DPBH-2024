// Description: This script runs in the background and listens for messages from content.js
// import config from "./config.js";
const config = {
  "server": "http://localhost:8000"
}

var cart = new Set();

const darkPatterns = [
  { id: 1, name: 'Basket Sneaking' },
  { id: 2, name: 'Interface Interference' },
  { id: 3, name: 'Nagging' },
  { id: 4, name: 'False Urgency' },
  { id: 5, name: 'Confirm Shaming' },
  { id: 6, name: 'Subscription Tags' },
  { id: 7, name: 'Forced Action' },
  { id: 8, name: 'Disguised Ads' },
  { id: 9, name: 'Bait and Switch' },
  { id: 10, name: 'Other' }
];

const sentiment_mapping = {
  "0": 'Shaming',
  "1": 'False Urgency',
  "2": 'Nagging',
  "3": 'Subscription Trap',
  "4": 'Basket Sneaking',
  "5": 'Not Dark Pattern'
}

var darkPatternsDetected = {}

async function getMLModelData(textList) {
  let url = config.server + "/predict"
  let response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 'text': textList })

  });
  return await response.json();
}

// listen for message from content.js
var naggingCount = 0;
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.cmd === "add") {
      console.log(request);
      cart.add(request);
    }
    else if (request.cmd === "finalTotal") {
      console.log("Total price:", request.totalPrice);
      let calculatedTotalPrice = 0;
      cart.forEach((item) => {
        calculatedTotalPrice += item.price;
      });
      let totalPriceInInt = parseInt(request.totalPrice.replace(/[^0-9.-]+/g, ""));
      console.log("Calc Total price:", calculatedTotalPrice);

      let differenceInPrice = Math.abs(calculatedTotalPrice - totalPriceInInt);
      let url = request.url;

      console.log(differenceInPrice);
      if (differenceInPrice > 0) {
        if (darkPatternsDetected[url] === undefined) {
          darkPatternsDetected[url] = {}};
        }
        darkPatternsDetected[url]["Basket Sneaking"]={
          darkPattern: "Basket Sneaking",
          data: {
            initialPrice: totalPriceInInt,
            finalPrice: calculatedTotalPrice,
            difference: differenceInPrice,
            elementCoordinates: request.elementCoordinates,
            exactUrl: request.exactUrl
          }
        }
    } else if (request.message === "getDarkPatterns") {
      console.log("Sending dark patterns");
      console.log(darkPatternsDetected);
      sendResponse({ data: darkPatternsDetected });
    } else if (request.cmd === 'nagging_plus_plus') {
      /** This is not working for now */
      
      // naggingCount = naggingCount + 1;
      // darkPatternsDetected.add({
      //   darkPattern: "Nagging",
      //   data: {
      //     naggingCount: naggingCount,
      //     url: request.url
      //   }
      // })
      // console.log("Nagging count: " + naggingCount);
    } else if (request.cmd == 'get_nag_count') {
      sendResponse({ count: naggingCount });
    } else if (request.action === "openPage") {
      chrome.tabs.create({ url: '../newtab/newtab.html' });
    } else if (request.msg === "getMLModelData") {
      console.log(request.allText);
      getMLModelData(request.allText).then((response) => {
        console.log(response);
        for (const [key, value] of Object.entries(response.result)) {
          console.log(key, value);
          let url = request.url;
          if (!darkPatternsDetected[url]) {
            darkPatternsDetected[url] = {};
          }
          darkPatternsDetected[url][sentiment_mapping[key]] = {
            darkPattern: sentiment_mapping[key],
            data: {
              count: value,
              exactUrl: url,
            }
          }
          console.log("this to be checked", darkPatternsDetected);
        }
        console.log(darkPatternsDetected);
        sendResponse(response);
      });

    }
  });