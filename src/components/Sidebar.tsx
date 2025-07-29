import React from 'react';
import { Menu } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  SmileOutlined,
  FormOutlined,
  TableOutlined,
  CalendarOutlined,
  BellOutlined,
  LoadingOutlined,
  ExclamationCircleOutlined,
  HomeOutlined
} from '@ant-design/icons';

const { SubMenu } = Menu;

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const componentGroups = [
    {
      title: '通用',
      key: 'general',
      icon: <SmileOutlined />,
      children: [
        { key: 'button', title: 'Button 按钮', icon: <SmileOutlined /> },
        { key: 'icon', title: 'Icon 图标', icon: <HomeOutlined /> },
      ]
    },
    {
      title: '布局',
      key: 'layout',
      icon: <TableOutlined />,
      children: [
        { key: 'grid', title: 'Grid 栅格', icon: <TableOutlined /> },
        { key: 'layout', title: 'Layout 布局', icon: <TableOutlined /> },
      ]
    },
    {
      title: '导航',
      key: 'navigation',
      icon: <CalendarOutlined />,
      children: [
        { key: 'menu', title: 'Menu 导航菜单', icon: <CalendarOutlined /> },
        { key: 'breadcrumb', title: 'Breadcrumb 面包屑', icon: <CalendarOutlined /> },
      ]
    },
    {
      title: '数据录入',
      key: 'data-entry',
      icon: <FormOutlined />,
      children: [
        { key: 'form', title: 'Form 表单', icon: <FormOutlined /> },
        { key: 'input', title: 'Input 输入框', icon: <FormOutlined /> },
        { key: 'select', title: 'Select 选择器', icon: <FormOutlined /> },
        { key: 'datepicker', title: 'DatePicker 日期选择框', icon: <CalendarOutlined /> },
      ]
    },
    {
      title: '数据展示',
      key: 'data-display',
      icon: <TableOutlined />,
      children: [
        { key: 'table', title: 'Table 表格', icon: <TableOutlined /> },
        { key: 'card', title: 'Card 卡片', icon: <TableOutlined /> },
        { key: 'list', title: 'List 列表', icon: <TableOutlined /> },
      ]
    },
    {
      title: '反馈',
      key: 'feedback',
      icon: <BellOutlined />,
      children: [
        { key: 'alert', title: 'Alert 警告提示', icon: <ExclamationCircleOutlined /> },
        { key: 'message', title: 'Message 全局提示', icon: <BellOutlined /> },
        { key: 'notification', title: 'Notification 通知提醒框', icon: <BellOutlined /> },
        { key: 'modal', title: 'Modal 对话框', icon: <ExclamationCircleOutlined /> },
        { key: 'spin', title: 'Spin 加载中', icon: <LoadingOutlined /> },
      ]
    }
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'home') {
      navigate('/');
    } else {
      navigate(`/component/${key}`);
    }
  };

  const getSelectedKey = () => {
    if (location.pathname === '/') return ['home'];
    const match = location.pathname.match(/\/component\/(.+)/);
    return match ? [match[1]] : [];
  };

  return (
    <Menu
      mode="inline"
      selectedKeys={getSelectedKey()}
      style={{ height: '100%', borderRight: 0, overflowX: 'hidden' }}
      onClick={handleMenuClick}
    >
      <Menu.Item key="home" icon={<HomeOutlined />}>
        首页
      </Menu.Item>
      {componentGroups.map(group => (
        <SubMenu key={group.key} icon={group.icon} title={group.title}>
          {group.children.map(item => (
            <Menu.Item key={item.key} icon={item.icon}>
              {item.title}
            </Menu.Item>
          ))}
        </SubMenu>
      ))}
    </Menu>
  );
};

export default Sidebar;