import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { getPathAndGraph } from "./api";

const robotAvatar = process.env.PUBLIC_URL + '/img/robot.svg';
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
      getPathAndGraph(this.state.messageList, (response) => {
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
    const { messageList, isOpen} = this.state;
    console.log('messageList', messageList)
    return (
    <div>
      <Launcher
        agentProfile={{
          teamName: "知识路径推理",
          imageUrl: robotAvatar
        }}
        onMessageWasSent={this._onMessageWasSent}
        messageList={messageList}
        isOpen={isOpen}
        handleClick={this.handleClick}
        showEmoji={false} 
        style={{height:500}}
      />
    </div >)
  }
}

export default ChatWindow