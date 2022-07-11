import React, { useState } from 'react';
import { Chat } from 'react-jwchat'

const robotAvatar = process.env.PUBLIC_URL + '/img/robot.svg';

const messageList = [
  {
    _id: '45',
    date: 1610016423,
    user: {
      id: 1234,
      avatar: robotAvatar,
      nickname: 'sirosong',
      desc: '这是我的第一条信息',
    },
    message: { type: 'text', content: '打野你会玩吗？' },
  },
  {
    _id: '47',
    date: 1610016470,
    user: {
      id: 9527,
      avatar: robotAvatar,
      nickname: '卡兹克',
      desc: '这是我的第一条信息',
    },
    message: { type: 'text', content: '❓ ' },
  }
]
const contact = {
  id: 9527,
  avatar: robotAvatar,
  nickname: '卡兹克',
  desc: '看我点水就完了',
}
const my = {
  id: 1234,
  avatar: robotAvatar,
  nickname: 'sirosong',
  desc: 'carry大神',
}

const JwChat = () => {
  const [msgList, setMsgList] = useState(messageList);
  console.log('version 45', React.version)
  return (
    <div style={{ display: 'flex' }}>
      <div>
        <Chat
          contact={contact}
          me={my}
          chatList={msgList}
          onSend={(msg) => console.log(msg)}
          style={{
            width: 300,
            height: 500,
            borderRadius: 5,
          }}
        />
      </div>
    </div>
  )
};

class ClassComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
 
  render() {
    return (
      <div style={{ display: 'flex' }}>
        <div>
          <Chat
            contact={contact}
            me={my}
            chatList={messageList}
            onSend={(msg) => console.log(msg)}
            onEarlier={() => console.log('EarlierEarlier')}
            style={{
              width: 600,
              height: 500,
              borderRadius: 5,
            }}
          />
        </div>
      </div>
    );
  }
}


export default JwChat;