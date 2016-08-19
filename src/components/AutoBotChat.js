/* =================================================================================
	AUTO BOT CHAT
================================================================================= */

var AutoBotChat = (function() {

    bot = {
        min : 1,
        max : 4
    }

    this.getMessage = function(message = 'init', whichBot = '') {

        console.log("yo");

        var replies = this.findInDictionary(message);
        
        whichBot = this.checkBot(whichBot);        

        if(replies) {
            
            if(whichBot == 'ALL' || (whichBot >= this.bot.min && whichBot <= this.bot.max)){
                return this.replyBot(replies, whichBot);
            } else {
                return this.noReplyFound(message, whichBot);
            }

        } 
        else {
            return this.noReplyFound(message, whichBot);
        }

    }


    this.findInDictionary = function(message) {

        // Filter the message. Remove all special character

        message = message.toLowerCase().replace(/[^\w\s]/gi, '');
        var replies;

        // Find in bot dictionary

        for (var i in dictionary) {
            
            // If there is matching input string get the corresponding replies.

            if ($.inArray(message, dictionary[i].inputString) >= 0) {

                replies = dictionary[i].responseString;

            }

        }

        // Retrun the replies
        return replies;

    }


    this.replyBot = function(replies, whichBot) {        
        
        // We have now valid bots

        if (whichBot >= 1 && whichBot <= 4) {
            switch (whichBot) {
                case '1':
                    return {
                        'Bot_1': replies[whichBot - 1]
                    };
                    break;
                case '2':
                    return {
                        'Bot_2': replies[whichBot - 1]
                    };
                    break;
                case '3':
                    return {
                        'Bot_3': replies[whichBot - 1]
                    };
                    break;
                case '4':
                    return {
                        'Bot_4': replies[whichBot - 1]
                    };
                    break;
            }
        } 
        
        // User has not specified bot. So everyone replys 

        else if(whichBot == 'ALL'){
            return {
                'Bot_1': replies[0],
                'Bot_2': replies[1],
                'Bot_3': replies[2],
                'Bot_4': replies[3]
            }
        }

    }


    this.noReplyFound = function(message, whichBot) {

        if(whichBot != '' &&  (whichBot >= 1 && whichBot <= 4)){
            switch (whichBot) {
                case '1':
                    return {
                        'Bot_1': 'I did not get the message.'
                    };
                    break;
                case '2':
                    return {
                        'Bot_2': 'Sorry what? Could you be more specific?'
                    };
                    break;
                case '3':
                    return {
                        'Bot_3': message +  ' What ? '
                    };
                    break;
                case '4':
                    return {
                        'Bot_4': 'I\'m not good enough to answer that.'
                    };
                    break;
            }
        } 
        else {
            return {
               'Bot_1': 'I did not get the message.',
               'Bot_2':  message + ' What ?',
               'Bot_3': 'Sorry what? Could you be more specific?',
               'Bot_4': 'I\'m not good enough to answer that.'                
            }
        }

    }


    this.checkBot = function(whichBot) { 

        if(whichBot.toLowerCase().indexOf('bot') == -1 && whichBot != '') {
            return false; // not found
        }   

        var temp = whichBot.replace(/[^0-9/-]/g, '');

        if(temp >= this.bot.min && temp <= this.bot.max) {
            return temp; // found and return bot number
        }

        if(temp <= 0 && temp != ''){
            return false; // not found 
        } 
        
        if(temp == '-' || temp > this.bot.max){
            return false; // not found
        }
        
        if(temp == ''){
            return 'ALL'; // found
        }
    
    }

});