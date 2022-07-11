import React, { Component } from 'react';
import { Launcher } from 'react-chat-window';
import { ForceGraph } from "./forceGraph";
import { Row, Col, Modal } from 'antd';
import { getAnswerAndGraph, resetRobot } from "./api";
import ChatWindow from "./chatWindow"


// // 聊天框
// class ChatWindow extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       messageList: [],
//       isOpen: true,
//       loading: true,
//       detail: {}
//     };
//     resetRobot(() => { this.setState({ loading: false }) });
//   }
//   // 在聊天框中展示聊天记录
//   _sendMessage = (text) => {
//     if (text && text.length > 0)  {
//       this.setState({
//         messageList: [
//           ...this.state.messageList, 
//           {author:'them',type:'text',data:{text}}
//         ]
//       })
//     }
//   };
//   _onMessageWasSent = (message) => {
//     this.setState({
//       messageList: [...this.state.messageList, message],
//       loading: true
//     }, () => {
//       getAnswerAndGraph(this.state.messageList, (response) => {
//         console.log('response', response);
//         const { answer, graph, result } = response;
//         this._sendMessage(answer);
//         this.props.setGraphData(graph);
//         // console.log('this.props', this.props)
//         this.setState({ loading: false })
//       });
//     });
//   };
//   handleClick = () => {
//     if (this.state.isOpen)
//       this.setState({ messageList: [], isOpen: false });
//     else
//       this.setState({ isOpen: true })
//   };

//   render() {
//     const { messageList, isOpen} = this.state;
//     console.log('messageList', messageList)
//     return (
//     <div>
//       <Launcher
//         agentProfile={{
//           teamName: "建筑知识问答",
//           imageUrl: robotAvatar
//         }}
//         onMessageWasSent={this._onMessageWasSent}
//         messageList={messageList}
//         isOpen={isOpen}
//         handleClick={this.handleClick}
//         showEmoji={false} 
//         style={{height:500}}
//       />
//     </div >)
//   }
// }

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
          {/* <JwChat/> */}
          {/* <InputArea/> */}
        </Col>
      </Row>
    )
  }
}




