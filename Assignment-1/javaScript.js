function fnShow(){
  
  var obj = document.getElementById('none').style;
  obj.visibility='visible';
  
}

function fnHide(){
  
  var obj = document.getElementById('none').style;
  obj.visibility='hidden';
  
}

function fnDisplay(){
  
  var obj = document.getElementById('none').style;
  
  if(obj.visibility=='hidden'){
    obj.visibility='visible';
  } else {
    obj.visibility='hidden';
  }
}
