import "./dripPricing.js";
import "./falseUrgency.js";
import { scrollAndHighlight, ajioHardcode } from "./util.js";

export function main() {
    console.log("Simple log from main!");
    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
        console.log(request);
        if (request.msg == "highlight") {
            scrollAndHighlight(request.darkPatterns.data.elementCoordinates);
        } else if (request.msg === "populate") {
            alert("hello");
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
        }
        // Do something in response to the message
    });
}