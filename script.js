document.getElementById('input').innerHTML = 100 ;
var nowShow = -50;

var header01_hlkjln = document.getElementById('header01_hlkjln');
var footer_hlkjln = document.getElementById('footer_hlkjln');
header01_hlkjln.style = 'top:'+nowShow+'px';
footer_hlkjln.style = 'top:'+nowShow+'px';

function viewer__bodyNext() { 
    this.nowShow = -80; 
}
function viewer__bodyPrev() { 
    this.nowShow = 0; 
}