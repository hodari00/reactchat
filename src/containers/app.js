import React from 'react';
import UsersBlock from '../components/UsersBlock';
import ChatInput from '../components/ChatInput';
import ChatHistory from '../components/ChatHistory';

class App extends React.Component {
	render(){
		const { sendMessage, state } = this;
	  	return (
	    	<div>
	    		<UsersBlock userID={ state.userID } />
	    		<ChatHistory history={ state.history } />
	    		<ChatInput userID={ state.userID } sendMessage={ sendMessage } />
	    	</div>
	  	);
	}

	state = {
    userID: Math.round(Math.random() * 100),
    history: [],
  };
  sendMessage = (message) => this.setState({ 
      history: this.state.history.concat(message) 
    })
}

export default App;
