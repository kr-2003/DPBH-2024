import "./dripPricing.js";
import "./falseUrgency.js";
import "./mlEngine.js";

import { scrollAndHighlight, ajioHardcode, changeBackground, changeBackgroundRevamped } from "./util.js";

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
            let eachElement = [];
            for (let i = 0; i < allText.length; i++) {
                // finding the corresponding elements in the DOM
                let elements = [...document.querySelectorAll('*')];
                elements = elements.filter(element => element.textContent === allText[i]);
                for (let j = 0; j < elements.length; j++) {
                    let rect = elements[j].getBoundingClientRect();
                    let coordinates = {
                        top: rect.top,
                        left: rect.left,
                        bottom: rect.bottom,
                        right: rect.right,
                        width: rect.width,
                        height: rect.height
                    };
                    eachELementCoordinates.push(coordinates);
                    eachElement.push(elements[j]);
                }
            }
            console.log(eachELementCoordinates);
            for (let i = 0; i < eachELementCoordinates.length; i++) {
                // changeBackground(eachELementCoordinates[i]);
                changeBackgroundRevamped(eachElement[i])
            }
        }
        // Do something in response to the message
    });
}