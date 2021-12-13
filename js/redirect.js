const link1 = "../html/post1.html";
const link2 = "../html/post2.html";
const link3 = "../html/post3.html";
const link4 = "../html/post4.html";

const page = [link1, link2, link3, link4];

function redirect (value){
    window.open(page[value], '_blank');
}