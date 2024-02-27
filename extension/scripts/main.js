import "./dripPricing.js";
import "./falseUrgency.js";
import "./mlEngine.js";

import { scrollAndHighlight, ajioHardcode, scrollAndChangeBackground } from "./util.js";

export function main() {
    console.log("Simple log from main!");
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request);
        if (request.msg == "highlight") {
            scrollAndHighlight(request.darkPatterns.data.elementCoordinates);
        } else if (request.msg === "populate") {
            // alert("hello");
            const darkPattern = request.darkPatterns;
            let localList = document.querySelector('.local-list');
            console.log(localList);
            for (let i = 0; i < darkPattern.length; i++) {
                const li = document.createElement('li');
                li.appendChild(document.createTextNode(darkPattern[i].darkPattern));
                li.appendChild(document.createTextNode(darkPattern[i].data.difference));
                localList.appendChild(li);
            }
        } else if(request.msg === "ajio-hardcode") {
            // alert("hello")
            ajioHardcode();
        } else if(request.msg === "changeBackground") {
            let allText = request.data;
            alert("hello");
            console.log(allText);
            let eachELementCoordinates = [];
            for (let i = 0; i < allText.length; i++) {

            }
            // scrollAndChangeBackground(request.darkPatterns.data.elementCoordinates);
        }
        // Do something in response to the message
    });
}