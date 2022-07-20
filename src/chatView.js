import React, { Component } from 'react';
import { ForceGraph } from "./forceGraph";
import { Row, Col } from 'antd';
import ChatWindow from "./chatWindow"


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
        </Col>
      </Row>
    )
  }
}




