import { getAllVisibleChildrenText } from "./dripPricing.js";
import config from "./config.js";
import { cleanUrl } from "./dripPricing.js";

async function engine() {
    let allText = getAllVisibleChildrenText(document.body);
    allText = allText.filter(text => text.length > 0);
    chrome.runtime.sendMessage({ msg: "getMLModelData", allText: allText, url: cleanUrl()}, function (response) {
        console.log(response);
    });
}
engine();