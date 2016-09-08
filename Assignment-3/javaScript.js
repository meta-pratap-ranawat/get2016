$(document).ready(init);

function init() {
    $("span.message").click(Q1);
	$("div.box:first").click(Q2);
	$("button").click(Q3);
    $('img[alt="hello"]').click(Q4);
    $('#myDiv input[type="text"]').find('input[name^="txt"]').click(Q5);
    $('p:not(.box)').click(Q6);
    $('div.box, div.error').click(Q7);
    $('div.box div.error').click(Q8);
    $("div#myDiv").find('span.info').click(Q9);
}

function Q1() {
    
  $(this).css("color", "red");
    
}

function Q2() {
  
  $(this).css("background-color", "gray");

}

function Q3() {
  
  $(this).css("color", "red");

}

function Q4() {
  
  $(this).css("height", "100px");

}

function Q5() {
  
  $(this).css("height", "100px");

}

function Q6() {
  
  $(this).css("color", "gray");

}

function Q7() {
  
  $(this).css("background-color", "black");

}

function Q8() {
  
  $(this).css("background-color", "yellow");

}

function Q9() {
  
  $(this).css("color", "white");

}

