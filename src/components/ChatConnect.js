/* =================================================================================
	DOCUMENT READY
================================================================================= */

$(document).ready(function() {

    var bot = new AutoBotChat();
    var userInput, message;

	message = bot.getMessage();
	renderChat(message);

    $('body').on('keypress', function(e){

    	if(e.keyCode === 13) {

    		userInput = $('#message').val();
    		$('#message').val('');
    		appendToChatBox('Me', userInput);

    		message = bot.getMessage(userInput, 'Bot 1');    		
    		renderChat(message);

       	}

    });


    function renderChat(message){    	
    	var i = 1;
	    for (var botName in message) {

	        if (message.hasOwnProperty(botName) && message[botName] != '') {
	            
	            appendToChatBox(botName, message[botName]);	            	           
	            
	        }

	    }

    }

    function appendToChatBox(who, message) {

		var elements = $('<div>', {
			class : who,
			html : '<li><strong>' + who.replace('_', ' ') + '</strong> : ' +  message + '</li>'
		})
		.appendTo('#chatBox');

		$('#chatBox').stop().animate({
			scrollTop: $('#chatBox')[0].scrollHeight
		}, 400);

    }


});

