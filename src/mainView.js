import './mainView.css';
import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { RetrView } from "./retrView";
import { ChatRobot } from "./chatRobot";
import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
const { Header, Content, Footer } = Layout;

const TopMenu = withRouter(({ history }) => {
    return (
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['/']}
            selectedKeys={[history.location.pathname]}
            style={{ lineHeight: '64px' }}
        >
                <Menu.Item key="/">
                    <Link to='/'></Link>
                    信息检索
                </Menu.Item>
                <Menu.Item key="/QA">
                    <Link to="/QA"/>
                    推理问答
                </Menu.Item>
        </Menu>

    );
})

export class MainView extends Component {
  render() {
    return (
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <TopMenu />
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <div style={{ background: '#fff', padding: "24px 70px", minHeight: 600 }}>
            <Route path='/' exact component={RetrView}></Route>
            <Route path='/QA' exact component={ChatRobot}></Route>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
      </Layout>
    )

    }
}

export default withRouter(MainView)