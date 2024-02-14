// Description: This script runs in the background and listens for messages from content.js

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

var darkPatternsDetected = {}



// function sendPopup() {

// }



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
        if(darkPatternsDetected[url] === undefined) {
          darkPatternsDetected[url] = [];
        }
        darkPatternsDetected[url].push({
          darkPattern: "Basket Sneaking",
          data: {
            initialPrice: totalPriceInInt,
            finalPrice: calculatedTotalPrice,
            difference: differenceInPrice,
            elementCoordinates: request.elementCoordinates,
            exactUrl: request.exactUrl
          }
        })
      }
    } else if (request.message === "getDarkPatterns") {
      sendResponse({ data: darkPatternsDetected });
    } else if (message.cmd === 'nagging_plus_plus') {
      naggingCount = naggingCount + 1;
      darkPatternsDetected.add({
        darkPattern: "Nagging",
        data: {
          naggingCount: naggingCount,
          url: request.url
        }
      })
      console.log("Nagging count: " + naggingCount);
    } else if (message.cmd == 'get_nag_count') {
      sendResponse({ count: naggingCount });
    } else if (message.action === "openPage") {
      chrome.tabs.create({ url: '../newtab/newtab.html' });
    }
  });