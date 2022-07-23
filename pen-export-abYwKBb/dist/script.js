document.getElementById('input').innerHTML = 100 ;
var nowShow = -10;

var header01_hlkjln = document.getElementById('header01_hlkjln');
var footer_hlkjln = document.getElementById('footer_hlkjln');
// header01_hlkjln.style = 'top:'+nowShow+'px';
// footer_hlkjln.style = 'bottom:'+nowShow+'px';

function viewer__bodyNext() { 
    alert("I am an alert box!!");
    nowShow = -80; 
    setHeaderFooter();
}
function viewer__bodyPrev() { 
    nowShow = 0; 
    setHeaderFooter();
}
function setHeaderFooter() { 
    header01_hlkjln.style = 'top:'+nowShow+'px';
    footer_hlkjln.style = 'bottom:'+nowShow+'px'; 
}