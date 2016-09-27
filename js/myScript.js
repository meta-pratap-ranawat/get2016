$(document).ready(init);

function init() {
    $('#myModal').on('shown.bs.modal', function() {
        $('.accordProfile').on("shown.bs.collapse hidden.bs.collapse", function() {
            $('span',this).toggleClass("glyphicon-plus glyphicon-minus");
        });
    });
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});