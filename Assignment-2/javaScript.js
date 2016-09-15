var data1;
$(document).ready(init);

function init() {
    console.log("Hello");
    
   $.getJSON("jQuery2/employee.json", displayName);
	$.getJSON("jQuery2/employee.json", function(data){
	
	$("#optionList").onchange(displayDetails);	
	
	});
	
	
    
       
}
function displayName(data){
       
       var list="";
    	data1 = data;
    console.log(data.employee.length+"");
        for(i=0;i<data.employee.length;i++){
            console.log(data.employee[i].name+"")
           list=list + "<option value=" + i + ">" + data.employee[i].name + "</option>";}
        document.getElementById("optionList").innerHTML = list;
   }

function displayDetails(data) {
	alert("Ok");
	var index = Number($(this).val());
	alert(index);
	document.getElementById("name").innerHTML = data.employee[index].name;
}
