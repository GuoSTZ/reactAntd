import React from 'react';
import { Card, Tabs } from 'antd';
import SecurityMonitor from './SecurityMonitor';

const { TabPane } = Tabs;

const ListDemo: React.FC = () => {
  return (
    <div>
      <Card title="List 列表组件演示">
        <Tabs defaultActiveKey="security">
          <TabPane tab="安全监控" key="security">
            <SecurityMonitor />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default ListDemo;