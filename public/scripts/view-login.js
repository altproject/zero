$(document).ready(function() {
    $('#loginForm').on('submit', function() {
        $.ajax({
            url: $(this).attr('action'),
            type: $(this).attr('method'),
            data: $(this).serialize(),
            dataType: 'json',
            success: function(json) {
                if(json.response == 'ok') {

                } else {
                	var msg = $("<p class='error dismissible message'>" + json.message + "</p>");
                	$('#message').append(msg);
                	//$('#login').addClass('invalid');
                }
            }
        });
        return false;
    });
});