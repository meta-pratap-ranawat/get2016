/*  javascript for show/hide element*/

// this function to show element
function fnShow(){
  
  var obj = document.getElementById('none').style;
  obj.visibility='visible';
  
}

// this function to hide element
function fnHide(){
  
  var obj = document.getElementById('none').style;
  obj.visibility='hidden';
  
}


// this function to toggle element display
function fnDisplay(){
  
  var obj = document.getElementById('none').style;
  
  if(obj.visibility=='hidden'){
    obj.visibility='visible';
  } else {
    obj.visibility='hidden';
  }
}
