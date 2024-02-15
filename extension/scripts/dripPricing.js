// descreasing priority order
const tags = ["h1", "h2", "h3", "h4", "h5", "h6", "p", "strong", "em"]

const cartWords = ['add to cart'];

const checkoutWords = ['checkout', 'place order'];

const totalWords = ['Total', 'Subtotal']

function findElementsWithText(root, text, isCaseSensitive = false) {
    let elements = [];
    let treeWalker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null, false);

    while (treeWalker.nextNode()) {
        let node = treeWalker.currentNode;
        let textContent = node.textContent;

        if(!isCaseSensitive){
            textContent = textContent.toLowerCase();
            text = text.toLowerCase();
        }

        if (textContent.includes(text)) {
            elements.push(node.parentElement);
        }
    }
    return elements;
}

export function getAllVisibleChildrenText(node) {
    // Initialize an empty string to store the concatenated text content
    var allText = [];
    // Function to recursively traverse the DOM tree and concatenate text content of visible elements
    function traverse(node) {
        // Iterate through each child node
        for (var i = 0; i < node.childNodes.length; i++) {
            var childNode = node.childNodes[i];

            // Check if the child node is an element node
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                // Check if the element is hidden
                var isNone = window.getComputedStyle(childNode).getPropertyValue('display') === 'none';
                var isHidden = window.getComputedStyle(childNode).getPropertyValue('display') === 'hidden';
                // Check if the element is visible
                if (!isHidden && !isNone) {
                    // If the element is visible, concatenate its text content
                    if (childNode.nodeType === Node.TEXT_NODE) {
                        allText.push(childNode.textContent.trim());
                    } else {
                        // Recursively traverse visible child elements
                        traverse(childNode);
                    }
                }
            }
            // If the child node is a text node, concatenate its text content
            else if (childNode.nodeType === Node.TEXT_NODE) {
                allText.push(childNode.textContent.trim());
            }
        }
    }


    traverse(node);
    return allText;
}

function elementWithTotal () {
    var elementWithTotal = [];
    totalWords.forEach((word) => {
        const totalElements = findElementsWithText(document.body, word, true);
        elementWithTotal.push(...totalElements);
    })
    let total  = elementWithTotal.filter((element) => element.checkVisibility())
    return total
}




function traversingUp(element) {
    if(!element){
        return null;
    }
    var allText = getAllVisibleChildrenText(element);
    console.log(allText);
    for(var i = 0; i < allText.length; i++){
        if(allText[i].toLowerCase().includes("$")){
            console.log(allText[i])
            return allText[i];
        }
    }
    var parent = element.parentElement;
    if(parent === null){
        return null;
    }
    var isVisible = parent.checkVisibility();
    if (isVisible) {
        return traversingUp(parent);
    }
    return null;
}

function getTotalPrice() {
    let total = elementWithTotal();
    for(var i = 0; i < total.length; i++){
        const element = total[i];
        var totalPrice = traversingUp(total[i]);
        let rect = element.getBoundingClientRect();
        let coordinates = {
            top: rect.top,
            left: rect.left,
            bottom: rect.bottom,
            right: rect.right,
            width: rect.width,
            height: rect.height
        };
        if(totalPrice){
            return {totalPrice, elementCoordinates: coordinates, elementUrl: window.location.href};
        }
    }
    return {totalPrice:null};
}

function getPriceOfProduct() {

    var elementsWithDollarSign = findElementsWithText(document.body, "$");
    elementsWithDollarSign.push(...findElementsWithText(document.body, "Rs."));
    elementsWithDollarSign.push(...findElementsWithText(document.body, "INR"));
    elementsWithDollarSign.push(...findElementsWithText(document.body, "₹"));

    var prices = [];

    elementsWithDollarSign.forEach(function (element) {
        var textContent = element.textContent.trim();
        // Extract price with regex
        var price = textContent.match(/(\$|Rs\.|INR|₹)[\d,.]+/g);
        var fontSize = parseInt(window.getComputedStyle(element).fontSize.split('px')[0]);

        if (price) {
            prices.push({ price: parseFloat(price[0].replace(/[^\d.]/g, '')), element: element, fontSize: fontSize });
        }
    });

    prices.sort(function (a, b) {
        return b.fontSize - a.fontSize;
    })


    return prices[0].price;
}

function isCartButton(element) {
    let textContent = element.parentElement?.parentElement?.textContent;
    return textContent && cartWords.some(word => textContent.toLowerCase().includes(word.toLowerCase()));
}

function isCheckoutButton(element) {
    let textContent = element.parentElement?.parentElement?.textContent;
    return textContent && checkoutWords.some(word => textContent.toLowerCase().includes(word.toLowerCase()));
}

export function cleanUrl() {
    let currentURL = window.location.href;
    let urlObject = new URL(currentURL);
    let cleanURL = `${urlObject.protocol}//${urlObject.hostname}/`;
    return cleanURL;
}

function isCheckoutPage(){
    // find the elements with text  
    // using "total", "order" and "summary"      
    const elementWithOrder = findElementsWithText(document.body, "Order", true);
    const elementWithSummary = findElementsWithText(document.body, "Summary", true);
    // check condition on these
    // if yes then give total amount
    let {totalPrice, elementCoordinates, elementUrl} = getTotalPrice();
    if(totalPrice && elementWithOrder.length > 0 && elementWithSummary.length > 0){
        chrome.runtime.sendMessage({ cmd: 'finalTotal', totalPrice: totalPrice, url: cleanUrl(), elementCoordinates, exactUrl: window.location.href}, function (response) {
            var calculatedTotalPrice = response.total;
        });
    }
}


var isCartOperationComplete = false;
    // chrome.runtime.sendMessage({ cmd: 'get_total_amt' }, function (response) {
    //     var amt =  
    //     console.log(response);
    // });
    
var isCartOperationComplete = false;
var isCheckoutOperationComplete = false;

// check if you have pressed add to cart button
document.addEventListener('click', function (e) {
    
    if (!isCartOperationComplete) {
        e.preventDefault();
        e.stopPropagation();
        isCartOperationComplete = true;
        if (isCartButton(e.target)) {
            alert("this is a cart button")
            let price = getPriceOfProduct();
            console.log(price);
            // Send price to background.js 
            chrome.runtime.sendMessage({ cmd: 'add', price: price, url: window.location.href }, function (response) {
                console.log(response);
            });
        }
        
        e.target.click();
    }

    // if (!isCheckoutOperationComplete) {
    //     e.preventDefault();
    //     e.stopPropagation();

    //     if (isCheckoutButton(e.target)) {
    //         chrome.runtime.sendMessage({ cmd: 'checkout', url: window.location.href }, function (response) {
    //             console.log(response);
    //         });
    //         isCheckoutOperationComplete = true;
    //     }
        
    //     e.target.click();
    // }

    isCheckoutPage();
});

