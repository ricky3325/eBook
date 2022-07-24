document.getElementById('input').innerHTML = 100 ;
var nowShow = -10;

var header01_hlkjln = document.getElementById('header01_hlkjln');
var footer_hlkjln = document.getElementById('footer_hlkjln');
// header01_hlkjln.style = 'top:'+nowShow+'px';
// footer_hlkjln.style = 'bottom:'+nowShow+'px';

window.addEventListener('message', (e) =>{
    // console.log('Child='+ e.data);
    if(e.data == "bodyNext"){
        viewer__bodyNext();
    }
    else if(e.data == "bodyPrev"){
        viewer__bodyPrev();
    }
    else if(e.data == "bodyHide"){
        showHideBar();
    }
}, false);

function viewer__bodyNext() { 
    alert("bodyNext!!");
}
function viewer__bodyPrev() { 
    alert("bodyPrev!!");
    nowShow = 0; 
}
function showHideBar(){
    if(nowShow < 0){
        nowShow = 0;
    }
    else if(nowShow == 0){
        nowShow = -80;
    }
    setHeaderFooter();
}
function setHeaderFooter() { 
    header01_hlkjln.style = 'top:'+nowShow+'px';
    footer_hlkjln.style = 'bottom:'+nowShow+'px'; 
}
function zoomFunc(a) {
    var f = document.getElementById('book_page');
    f.contentWindow.postMessage(a,'*');
}