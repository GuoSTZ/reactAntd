import React from 'react';
import { Button, Space, Divider, Typography } from 'antd';
import { DownloadOutlined, PoweroffOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const ButtonDemo: React.FC = () => {
  return (
    <div>
      <Title level={3}>基本用法</Title>
      <Paragraph>按钮有五种类型：主按钮、次按钮、虚线按钮、文本按钮和链接按钮。</Paragraph>
      <Space wrap>
        <Button type="primary">Primary Button</Button>
        <Button>Default Button</Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="text">Text Button</Button>
        <Button type="link">Link Button</Button>
      </Space>

      <Divider />

      <Title level={3}>图标按钮</Title>
      <Paragraph>当需要在 Button 内嵌入 Icon 时，可以设置 icon 属性。</Paragraph>
      <Space wrap>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button icon={<DownloadOutlined />}>Download</Button>
        <Button type="primary" icon={<PoweroffOutlined />} loading>
          Loading
        </Button>
      </Space>

      <Divider />

      <Title level={3}>按钮尺寸</Title>
      <Paragraph>按钮有大、中、小三种尺寸。</Paragraph>
      <Space wrap>
        <Button type="primary" size="large">
          Large
        </Button>
        <Button type="primary">
          Default
        </Button>
        <Button type="primary" size="small">
          Small
        </Button>
      </Space>

      <Divider />

      <Title level={3}>不可用状态</Title>
      <Paragraph>添加 disabled 属性即可让按钮处于不可用状态。</Paragraph>
      <Space wrap>
        <Button type="primary" disabled>
          Primary(disabled)
        </Button>
        <Button disabled>Default(disabled)</Button>
        <Button type="dashed" disabled>
          Dashed(disabled)
        </Button>
      </Space>
    </div>
  );
};

export default ButtonDemo;