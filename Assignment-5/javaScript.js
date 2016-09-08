$(document).ready(init);

function init() {
    
   $("#bx1").parent().css("background-color", "LightGreen").css("margin", "50px").css("height", "+=100px");
    
    $("#bx2").parent().css("background-color", "lightGray").css("margin", "50px").css("border", " solid black").css("height", "+=100px");
    
    $("#bx3").parent().children().css("height", "400px").css("background-color", "RoyalBlue").css("margin", "5px").css("border", "2px solid white");
    
    $("#bx4").parentsUntil('span#stop').css("margin", "50px").css("border", " solid black").css("height", "+=100px").css("margin", "500px");
    
    $("#bx4").closest('#close').css("height", "+=100px").css("border", "5px solid red");
}


