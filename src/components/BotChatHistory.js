import * as React from 'react';
import * as ReactDOM from 'react-dom';
import ChatHistory from '../components/ChatHistory';

export default class BotChatHistory extends React.Component {
  static propTypes = {
    history: React.PropTypes.array,
    botHistory: React.PropTypes.array,
  };

  render() {
    const { props } = this;
    var BotArray = props.botHistory;
    var bot = document.getElementsByClassName('botStatus');
    


    return (
      <div>
      {
        BotArray.map((Obj) => {
          const imgURL = '//robohash.org/' + Obj.Who + '?set=set2&bgset=bg2&size=70x70';
          const messageDate = new Date(Obj.When);
          const messageDateTime = messageDate.toLocaleDateString() +
            ' at ' + messageDate.toLocaleTimeString();
            var Row;

            var onlineBots = [];
              if(bot != undefined) {
              for (var i = 0; i < bot.length; i++) {
                if((i%2 != 0) && (bot[i].checked)){
                  var Name = bot[i].getAttribute('name');
                  
                }

              }
            }

            if (Obj.Who != Name) {
              Row = <ul className="collection">
                    <li className="collection-item avatar">
                      <img src={ imgURL } alt={ Obj.Who } className="circle" />
                      <span className="title">User #{ Obj.Who }</span>
                      <p>
                        <i className="prefix mdi-action-alarm" />
                        <span className="message-date">{ messageDateTime }</span>
                        <br />
                        <span>{ Obj.What }</span>
                      </p>
                    </li>
                </ul>;
              } else {
                Row = <div></div>;
              }
            return (
                Row
            )
        })
      }
      </div>
    );
  }
}
