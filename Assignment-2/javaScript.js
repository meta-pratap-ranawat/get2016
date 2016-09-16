var data1;
$(document).ready(init);

function init() {
    console.log("Hello");
    
   $.getJSON("employee.json", displayName);
	
	
	
    
       
}
function displayName(data){
       
       var list="";
    	data1 = data;
   
        for(i=0;i<data.employee.length;i++){
            console.log(data.employee[i].name+"")
           list=list + "<option value=" + i + ">" + data.employee[i].name + "</option>";}
        document.getElementById("optionList").innerHTML = list;
		
		$("#optionList").change(function(data){
			
			alert("Ok");
			var index = Number($(this).val());
			alert(index);
			document.getElementById("name").innerHTML = data.employee[index].name;
			
		});
   }

function displayDetails(data) {
	alert("Ok");
	var index = Number($(this).val());
	alert(index);
	document.getElementById("name").innerHTML = data.employee[index].name;
}
