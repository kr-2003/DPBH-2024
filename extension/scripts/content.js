var urgency = [/\d+\s+available/, /only\s+\d+\s+left/,/sale\s+ends\s+in+\d/,
"hurry up", "ending soon", "last chance","limited time","limited offer","limited stock"];

var Ecomm = ["Add to Cart","Buy Now","Checkout","Add to Bag","Add to Basket","Add to Compare","Gift Someone","Add to Wishlist"];


var a = document.documentElement.outerHTML;
// console.log(a,"bad");
console.log(urgency);
function DPchecker(list){
    for (var i = 0; i < list.length; i++) {
        console.log("checking "+list[i]);
        if (a.match(list[i])) {
            alert("This page contains a Dark Pattern !!! " +list[i]);
            break;
        }
    }
}

function isECommerce() {
    for(var i=0;i<Ecomm.length;i++){
        if(a.match(Ecomm[i])){
            alert("This is an E-commerce site");
            break;
        }
    }
}


document.addEventListener('click', function (event) {
    var ele=event.target.outerHTML;
    console.log(ele,typeof(ele));
    if(ele.match(/close/))
    {
        chrome.runtime.sendMessage({ cmd: 'nagging_plus_plus' }, function(response) {
            console.log("Logged A Close Button Click");
        });
    }
});


isECommerce();
DPchecker(urgency);