var urgency = [/\d+\s+available/, /only\s+\d+\s+left/,/sale\s+ends\s+in+\d/,
"hurry up", "ending soon", "last chance","limited time","limited offer","limited stock"];

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

DPchecker(urgency);