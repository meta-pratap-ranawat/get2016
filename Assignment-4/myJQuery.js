$(document).ready(init);
function init()
	{
 
  $( "#name" ).keyup( function() {
                      	    var value = $('#name').val();
	
			    changeBackGround(value,"#name");
			});
$("#name").on("focusout",function() {
			    	changeBackBackGround(this);
				});
     
  $( "#age" ).keyup(function() {
    var value = $('#age').val();
   
   changeBackGround(value,"#age");
	
  });
 $("#age").on("focusout",function() {
			    	changeBackBackGround(this);
				});
  
  $( "#address" ).keyup(function() {
    var value = $('#address').val();
  
    changeBackGround(value,"#address");
  });
 $("#age").on("focusout",function() {
			    	changeBackBackGround(this);
				});
	
}


function changeBackGround(value,selector){

			$( "#new" ).text( value );
			$(selector).animate(
			{
			'backgroundColor':'Gray'
			},5000
			);
	}	
function  changeBackBackGround( selector ){
			$(selector).animate(
			{
			'backgroundColor':'White'
			},500
			);
	}
