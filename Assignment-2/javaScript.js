$(document).ready(init);

function init() {
    $("#btnShow").click(fnShow);
	$("#btnHide").click(fnHide);
	$("#dis").click(fnDisplay);
}	
function fnShow(){
  
  $("#none").show();
  
}

function fnHide(){
  
  $('#none').hide();

}

function fnDisplay(){
  
  
  
  if($("#none").css('display') == 'none'){
    $("#none").show();
  } else {
    $("#none").hide();
  }
}