var jsonResonse;
$(document).ready(init);

function init() {
    console.log("Hello");
    
   $.getJSON("employee.json", displayName);
	
	$("#optionList").change(function(){
			
			var index = Number($(this).val());
			
			$("#name").html(jsonResonse.employee[index].name);
			$("#email").html(jsonResonse.employee[index].email);
			$("#dob").html(jsonResonse.employee[index].DOB);
			$("#address").html(jsonResonse.employee[index].Address);
			
		});
	
    
       
}
function displayName(data){
       
       var list="<option value=" + -1 + ">" + "------" + "</option>";;
    	jsonResonse = data;
   
        for(i=0;i<data.employee.length;i++){
            console.log(data.employee[i].name+"")
           list=list + "<option value=" + (i) + ">" + data.employee[i].name + "</option>";}
        $("#optionList").html(list);
		
		
   }
