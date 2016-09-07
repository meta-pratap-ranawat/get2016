// JQuery for hide and show
$(document).ready(init);

// handler definition
function init() {
    $("#btnShow").click(fnShow);
	$("#btnHide").click(fnHide);
	$("#dis").click(fnDisplay);
}

// to show element having id none
function fnShow(){
  
  $("#none").show();
  
}

// to hide element having id none
function fnHide(){
  
  $('#none').hide();

}

// toggle element display
function fnDisplay(){
 
  if($("#none").css('display') == 'none'){
    $("#none").show();
  } else {
    $("#none").hide();
  }
}
