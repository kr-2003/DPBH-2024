// alert("from falseurgency.js");
import { getAllVisibleChildrenText } from "./dripPricing.js";

var Ecomm = ["Add to Cart","Buy Now","Checkout","Add to Bag","Add to Basket","Add to Compare","Gift Someone","Add to Wishlist"];
var urgency = [/\d+\s+available/, /only\s+\d+\s+left/,/sale\s+ends\s+in+\d/, "hurry up", "ending soon", "last chance","limited time","limited offer","limited stock",];


class DarkPattern {
    constructor() {
        this.urgencyPatterns = urgency;
    }

    
    DPchecker(htmlContentArray) {
        console.log(htmlContentArray);
        for (var i = 0; i < this.urgencyPatterns.length; i++) {
            var pattern = this.urgencyPatterns[i];
            htmlContentArray.forEach((element) => {
                if (element.toLowerCase().match(pattern)) {
                    console.log("This page contains a Dark Pattern: " + pattern);
                }
            });
            // if (htmlContent.toLowerCase().match(pattern.toLowerCase())) {
            //     alert("This page contains a Dark Pattern: " + pattern);
            //     break;
            // }
        }
    }

}

var DP = new DarkPattern();
var htmlContentArray = getAllVisibleChildrenText(document.body)
DP.DPchecker(htmlContentArray);

// function isECommerce() {
//     for(var i=0; i < Ecomm.length; i++) {
//         if (htmlContent.includes(Ecomm[i])) {
//             alert("This is an E-commerce site");
//             break;
//         }
//     }
// }

document.addEventListener('click', function (event) {
    var ele = event.target.outerHTML;
    if (ele.includes("close")) {
        chrome.runtime.sendMessage({ cmd: 'nagging_plus_plus'}, function(response) {
            console.log("Logged A Close Button Click");
        });
    }
});

// isECommerce();
