import React, { Component, useState } from 'react';
import { Launcher } from 'react-chat-window';
import { Chat, IContact } from 'react-jwchat'
import { ForceGraph } from "./forceGraph";
import { Row, Col, Modal } from 'antd';
import { getAnswerAndGraph, resetRobot } from "./api";
import { getBugDetail, } from "./api";

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



// 聊天框
class ChatWindow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messageList: [],
      isOpen: true,
      loading: true,
      detail: {}
    };
    resetRobot(() => { this.setState({ loading: false }) });
  }
  // 在聊天框中展示聊天记录
  _sendMessage = (text) => {
    if (text && text.length > 0)  {
      this.setState({
        messageList: [
          ...this.state.messageList, 
          {author:'them',type:'text',data:{text}}
        ]
      })
    }
  };
  _onMessageWasSent = (message) => {
    this.setState({
      messageList: [...this.state.messageList, message],
      loading: true
    }, () => {
      getAnswerAndGraph(this.state.messageList, (response) => {
        console.log('response', response);
        const { answer, graph, result } = response;
        this._sendMessage(answer);
        this.props.setGraphData(graph);
        // console.log('this.props', this.props)
        this.setState({ loading: false })
      });
    });
  };
  handleClick = () => {
    if (this.state.isOpen)
      this.setState({ messageList: [], isOpen: false });
    else
      this.setState({ isOpen: true })
  };

  render() {
    const { messageList, isOpen, detail} = this.state;
    console.log('messageList', messageList)
    return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "建筑知识问答",
          imageUrl: robotAvatar
        }}
        onMessageWasSent={this._onMessageWasSent}
        messageList={messageList}
        isOpen={isOpen}
        handleClick={this.handleClick}
        showEmoji={false}
      />
    </div >)
  }
}

export class ChatRobot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      node: null
    };
  }
  setGraphData = data => this.setState({ data });
  // 点击直接对node信息发起检索
  onNodeClick(node) {
    console.log(node)
    this.setState({ node })
    this.ChatWindow._onMessageWasSent({
      author: 'me',
      type: 'text',
      data: {'text': node }
    })
  }
  
  render() {
    const [msgList, setMsgList] = useState(messageList)
    return (
      <Row type='flex' justify="start" style={{height:260}}>
        {/* 图谱展示所在列 */}
        <Col span={16}>
          <ForceGraph data={this.state.data} getNodeName={(node) => {
            this.onNodeClick(node)
          }} />
        </Col>
        {/* 对话框所在列 */}
        <Col span={8}>
          <ChatWindow
            setGraphData={this.setGraphData.bind(this)}
            switchNode={this.state.node}
            ref={(ChatWindow) => { this.ChatWindow = ChatWindow; }} 
          />
          <Chat
            contact={contact}
            me={my}
            chatList={msgList}
            onSend={(msg) => setMsgList([...msgList, msg])}
            onEarlier={() => console.log('EarlierEarlier')}
            style={{
              width: 600,
              height: 500,
              borderRadius: 5,
            }}
          />
        </Col>
      </Row>
    )
  }
}




