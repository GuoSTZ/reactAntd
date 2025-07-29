import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { AntDesignOutlined, ThunderboltOutlined, RocketOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const Home: React.FC = () => {
  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <Title level={1}>
          <AntDesignOutlined style={{ color: '#1890ff', marginRight: '16px' }} />
          Ant Design 组件演示
        </Title>
        <Paragraph style={{ fontSize: '18px', color: '#666' }}>
          基于 React 18 + Ant Design 4 + Vite 构建的组件演示平台
        </Paragraph>
      </div>

      <Divider />

      <Row gutter={[24, 24]}>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '200px' }}
            bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
          >
            <AntDesignOutlined style={{ fontSize: '48px', color: '#1890ff', marginBottom: '16px' }} />
            <Title level={4}>企业级设计语言</Title>
            <Paragraph>提供完整的设计规范和最佳实践</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '200px' }}
            bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
          >
            <ThunderboltOutlined style={{ fontSize: '48px', color: '#52c41a', marginBottom: '16px' }} />
            <Title level={4}>开箱即用</Title>
            <Paragraph>丰富的组件库，快速构建应用</Paragraph>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8}>
          <Card
            hoverable
            style={{ textAlign: 'center', height: '200px' }}
            bodyStyle={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}
          >
            <RocketOutlined style={{ fontSize: '48px', color: '#fa541c', marginBottom: '16px' }} />
            <Title level={4}>高性能</Title>
            <Paragraph>基于 Vite 构建，极速开发体验</Paragraph>
          </Card>
        </Col>
      </Row>

      <Divider />

      <div style={{ textAlign: 'center' }}>
        <Title level={3}>开始探索</Title>
        <Paragraph>
          点击左侧菜单，查看各个组件的演示效果和使用方法
        </Paragraph>
      </div>
    </div>
  );
};

export default Home;