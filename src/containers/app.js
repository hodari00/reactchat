import React from 'react';
import UsersBlock from '../components/UsersBlock';
import ChatInput from '../components/ChatInput';
import BotChatHistory from '../components/BotChatHistory';

class App extends React.Component {
	render(){
		const { sendMessage, botMessages, state } = this;
	  	return (
	    	<div>
	    		<UsersBlock userID={ state.userID } botUsers={ state.botUsers } />
	    		<BotChatHistory history={ state.history } botHistory={ state.botHistory } />
	    		<ChatInput userID={ state.userID } sendMessage={ sendMessage } botMessages={ botMessages } />
	    	</div>
	  	);
	}

	state = {
    userID: Math.round(Math.random() * 100),
    botUsers: [1, 2, 3, 4],
    history: [],
    botHistory: [],
  };
  sendMessage = (message) => this.setState({ 
      history: this.state.history.concat(message) 
    })
  botMessages = (messageList) => this.setState({
  	botHistory: this.state.botHistory.concat(messageList)
  })
}

export default App;
