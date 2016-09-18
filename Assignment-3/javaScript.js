$(document).ready(function(){
    $('#start, #right').click(function () {
        $("#divJ").animate({left: '+=250px'},10000,'linear');
    });

    $('#stop').click(function () {
        $("#divJ").stop();
    });

    $('#back , #left').click(function () {
        $("#divJ").animate({left: '-=250px'},10000,'linear');
    });

    $('#top').click(function () {
        $("#divJ").animate({top: '-=250px'},10000,'linear');
    });

    $('#bottom').click(function () {
        $("#divJ").animate({top: '+=250px'},10000,'linear');
    });

});