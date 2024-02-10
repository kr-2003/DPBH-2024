// Description: This script runs in the background and listens for messages from content.js

var cart = new Set();

var darkPatternsDetected = new Set();



function sendPopup(){
  
}



// listen for message from content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log("message from content.js", request);
    if (request.cmd === "add") {
      cart.add(request);  
    }
    else if(request.cmd === "finalTotal") {
      console.log("Total price:", request.totalPrice);
      let calculatedTotalPrice = 0;
      cart.forEach((item) => {
        calculatedTotalPrice += item.price;
      });
      let totalPriceInInt = parseInt(request.totalPrice.replace(/[^0-9.-]+/g,""));
      console.log("Calc Total price:", calculatedTotalPrice);

      let differenceInPrice = Math.abs(calculatedTotalPrice - totalPriceInInt);
      console.log(differenceInPrice);
      if(differenceInPrice > 0){
        darkPatternsDetected.add({ cmd: 'price_dipping', data: {subject: "Price Difference", content: differenceInPrice} });
      }
    } else if(request.message === "getDarkPatterns") {
      console.log("Received message from popup.js:", request);
      console.log("Sending dark patterns info to popup.js:", Array.from(darkPatternsDetected));
      sendResponse({data: Array.from(darkPatternsDetected)});
    }
});

