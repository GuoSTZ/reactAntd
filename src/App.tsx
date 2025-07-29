import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';
import Sidebar from './components/Sidebar';
import ComponentDemo from './components/ComponentDemo';
import Home from './components/Home';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <Header style={{ 
          background: '#001529', 
          color: 'white', 
          fontSize: '20px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center'
        }}>
          Ant Design 组件演示
        </Header>
        <Layout>
          <Sider width={250} style={{ background: '#fff' }}>
            <Sidebar />
          </Sider>
          <Layout style={{ height: 'calc( 100vh - 64px )', padding: 16 }}>
            <Content style={{ 
              background: '#fff', 
              padding: 16,
              borderRadius: 8,
              overflowY: 'auto'
            }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/component/:componentName" element={<ComponentDemo />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
