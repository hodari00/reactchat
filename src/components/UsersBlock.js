import * as React from 'react';

export default class UsersBlock extends React.Component {

	static propTypes = {
	    userID: React.PropTypes.number,
	    botUsers: React.PropTypes.array
	  };



	render() {
		const { props } = this;
		const imgURL = '//robohash.org/' + props.userID + '?set=set2&bgset=bg2&size=70x70';

		return (
			<div id="users" className="teal">
				<p>ONLINE USERS</p>
				<br />
				<span className="chip left">
	                <img src={ imgURL } />
	                <span>User #{ props.userID }</span>
	              </span>
	              {props.botUsers.map(function(users) {
		            return <div><span className="chip left">
	                <img src={ '//robohash.org/' + users + '?set=set2&bgset=bg2&size=70x70' } />
	                <span>User #Bot { users }</span>
	              </span>
	              <input type="radio" className="botStatus" name={ 'Bot ' + users } id={ users + '_online' } defaultChecked/><label htmlFor={ users + '_online' }>Online</label><br/>
		          <input type="radio" className="botStatus" name={ 'Bot ' + users } id={ users + '_offline' } /><label htmlFor={ users + '_offline' }>Offline</label></div>
		          })}

			</div>
		)
	}
}