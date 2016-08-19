import * as React from 'react';

export default class ChatInput extends React.Component {

  static propTypes = {
    userID: React.PropTypes.number,
    sendMessage: React.PropTypes.func,
    botMessages: React.PropTypes.func,
    botUsers: React.PropTypes.array
  };

  constructor(props) {
    super(props);
    this.RandomFunction = this.RandomFunction.bind(this);
    this.MessagesFunction = this.MessagesFunction.bind(this);
  }

  componentDidMount() {
    this.refs.txtMessage.focus();
    this.RandomFunction();
  }

  // random comments every few seconds
  RandomFunction() {
    const dictionary = [
                          {
                            'inputString': [
                              'say random strings'
                            ],
                            'responseString' : [
                              'Say something',
                              'Are you sleeping',
                              'whats going on?',
                              'Are you bored?'
                            ]
                          }
                        ];

    const message = 'say random strings';

    var that = this.props;
    var messageList = [];

    function getMessage(message) {
        console.log(message);
        var replies = findInDictionary(message);
        var returnReplies;        

        returnReplies =  replyBot(replies);
        console.log(returnReplies);

        for (var I in returnReplies) {

          var messageObj = {
            Who: I,
            What: returnReplies[I],
            When: new Date().valueOf(),
          };
          // that.sendMessage(messageObj);
          messageList.push(messageObj);
          
        }
        console.log(messageList);
        that.botMessages(messageList);
    }


    function findInDictionary(message) {

        // Filter the message. Remove all special character
        var replies;

        // Find in bot dictionary
        for (var i in dictionary) {
            
            // If there is matching input string get the corresponding replies.

            for(var a = 0; a < dictionary[i].inputString.length; a++){

              if( dictionary[i].inputString[a] == message){
                replies = dictionary[i].responseString;
              }

            }

        }

        // Retrun the replies

        return replies;

    }


    function replyBot(replies) { 

        return {
                'Bot 1': replies[0],
                'Bot 2': replies[1],
                'Bot 3': replies[2],
                'Bot 4': replies[3]
            }

    }

    setInterval(function() {
      getMessage(message);
    }, 30000);
  }

  onSubmit = (e) => {
    e.preventDefault();
    this.MessagesFunction();
  }

  MessagesFunction() {

    const dictionary = [
                          {
                            'inputString': [
                              'init'
                            ],
                            'responseString': [
                              'Hi! what a lovely day',
                              'Hey user welcome',
                              'Hey folks! we are bots',
                              'Hello guys!'
                            ]
                          },
                          {   
                            'inputString': [
                              'hi how are you',
                              'hey how you doing',
                              'hello how are you'
                            ],
                            'responseString': [
                              'Im good thanks! how you?',
                              'Im good how about you?',
                              '',
                              'Great! you say'
                            ]
                          },
                          {
                            'inputString': [
                              'hello',
                              'hi',
                              'hey',
                              'wassup',
                              'whats up',
                              'sup'
                            ],
                            'responseString' : [
                              'Hello user',
                              'Hi boss',
                              'Heya!',
                              'Heeeeeeeelo! :D'
                            ]
                          },
                          {
                            'inputString': [
                              'what is your name',
                              'whats your name',
                              'your name',
                              'do you have a name'
                            ],
                            'responseString' : [
                              'My name? Im a bot',
                              'Im bot',
                              'Me either',
                              ''
                            ]
                          }
                        ];

    // Check if the message is empty

    const bot = {
        min : 1,
        max : 4
    };

    const message = this.refs.txtMessage.value;
    if (message.length === 0) { 
      return;
    }

    var that = this.props;
    var messageList = [];

    var messageObj = {
      Who: that.userID,
      What: message,
      When: new Date().valueOf(),
    };
    messageList.push(messageObj);

    function getMessage(message, whichBot = '') {

        var word = 'bot';
        var regex = new RegExp('\\b' + word + '\\b');

        whichBot = 'bot ' + message.charAt( message.search(regex) + 4);
        
        var replies = findInDictionary(message);
        var returnReplies;
        whichBot = checkBot(whichBot);        

        if(replies) {
            
            if(whichBot == 'ALL' || (whichBot >= bot.min && whichBot <= bot.max)){
                returnReplies =  replyBot(replies, whichBot);
            } else {
                returnReplies = noReplyFound(message, whichBot);
            }

        } 
        else {
            returnReplies = noReplyFound(message, whichBot);
        }

        console.log(returnReplies);

        for (var I in returnReplies) {

          messageObj = {
            Who: I,
            What: returnReplies[I],
            When: new Date().valueOf(),
          };
          // that.sendMessage(messageObj);
          messageList.push(messageObj);
          
        }
        console.log(messageList);
        that.botMessages(messageList);
    }


    function findInDictionary(message) {

        // Filter the message. Remove all special character

        message = message.toLowerCase().replace(/[^\w\s]/gi, '').replace(/[0-9]/g, '').replace(' bot ', '').replace('bot ', '');
      console.log(message)
        var replies;

        // Find in bot dictionary

        for (var i in dictionary) {
            
            // If there is matching input string get the corresponding replies.

            for(var a = 0; a < dictionary[i].inputString.length; a++){

              if( dictionary[i].inputString[a] == message){
                replies = dictionary[i].responseString;
              }

            }

        }

        // Retrun the replies

        return replies;

    }


    function replyBot(replies, whichBot) { 

        // We have now valid bots

        if (whichBot >= 1 && whichBot <= 4) {
            switch (whichBot) {
                case '1':
                    const userID = 1
                    const message = replies[whichBot - 1]
                    return {
                        'Bot 1': replies[whichBot - 1]
                    };
                    break;
                case '2':
                    return {
                        'Bot 2': replies[whichBot - 1]
                    };
                    break;
                case '3':
                    return {
                        'Bot 3': replies[whichBot - 1]
                    };
                    break;
                case '4':
                    return {
                        'Bot 4': replies[whichBot - 1]
                    };
                    break;
            }
        } 
        
        // User has not specified bot. So everyone replys 

        else if(whichBot == 'ALL'){
            return {
                'Bot 1': replies[0],
                'Bot 2': replies[1],
                'Bot 3': replies[2],
                'Bot 4': replies[3]
            }
        }

    }


    function noReplyFound(message, whichBot) {

        if(whichBot != '' &&  (whichBot >= 1 && whichBot <= 4)){
            switch (whichBot) {
                case '1':
                    return {
                        'Bot 1': 'I did not get the message.'
                    };
                    break;
                case '2':
                    return {
                        'Bot 2': 'Sorry what? Could you be more specific?'
                    };
                    break;
                case '3':
                    return {
                        'Bot 3': message +  ' What ? '
                    };
                    break;
                case '4':
                    return {
                        'Bot 4': 'I\'m not good enough to answer that.'
                    };
                    break;
            }
        } 
        else {
            return {
               'Bot 1': 'I did not get the message.',
               'Bot 2':  message + ' What ?',
               'Bot 3': 'Sorry what? Could you be more specific?',
               'Bot 4': 'I\'m not good enough to answer that.'                
            }
        }

    }


    function checkBot(whichBot) { 

        if(whichBot.toLowerCase().indexOf('bot') == -1 && whichBot != '') {
            return false; // not found
        }   

        var temp = whichBot.replace(/[^0-9/-]/g, '');

        if(temp >= bot.min && temp <= bot.max) {
            return temp; // found and return bot number
        }

        if(temp <= 0 && temp != ''){
            return false; // not found 
        } 
        
        if(temp == '-' || temp > bot.max){
            return false; // not found
        }
        
        if(temp == ''){
            return 'ALL'; // found
        }
    
    }

    // Build a message object and send it
    getMessage(message);

    // Clear the input field and set focus
    this.refs.txtMessage.value = '';
    this.refs.txtMessage.focus();
  };

  render() {
    const { props, onSubmit } = this;
    const imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';
    return (
      <footer className="teal">
        <form className="container" onSubmit={ onSubmit }>
          <div className="row">
            <div className="input-field col s10">
              <i className="prefix mdi-communication-chat" />
              <input ref="txtMessage" type="text" placeholder="Type your message" />
              <span className="chip left">
                <img src={ imgURL } />
                <span>User #{ props.userID }</span>
              </span>
            </div>
            <div className="input-field col s2">
              <button type="submit" className="waves-effect waves-light btn-floating btn-large">
                <i className="mdi-content-send" />
              </button>
            </div>
          </div>
        </form>
      </footer>
    );
  }
}