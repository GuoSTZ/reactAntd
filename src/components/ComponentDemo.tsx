import React from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Divider } from 'antd';
import ButtonDemo from './demos/button/base';
import FormDemo from './demos/form/base';
import ListDemo from './demos/list/SecurityMonitor';
// import TableDemo from './demos/TableDemo';
// import CardDemo from './demos/CardDemo';
// import AlertDemo from './demos/AlertDemo';
// import ModalDemo from './demos/ModalDemo';
// import InputDemo from './demos/InputDemo';
// import SelectDemo from './demos/SelectDemo';
// import DatePickerDemo from './demos/DatePickerDemo';
// import MessageDemo from './demos/MessageDemo';
// import NotificationDemo from './demos/NotificationDemo';
// import SpinDemo from './demos/SpinDemo';
// import ListDemo from './demos/ListDemo';
// import GridDemo from './demos/GridDemo';
// import LayoutDemo from './demos/LayoutDemo';
// import MenuDemo from './demos/MenuDemo';
// import BreadcrumbDemo from './demos/BreadcrumbDemo';
// import IconDemo from './demos/IconDemo';

const { Title } = Typography;

const ComponentDemo: React.FC = () => {
  const { componentName } = useParams<{ componentName: string }>();

  const componentMap: { [key: string]: { title: string; component: React.ReactNode } } = {
    button: { title: 'Button 按钮', component: <ButtonDemo /> },
    form: { title: 'Form 表单', component: <FormDemo /> },
    list: { title: 'List 列表', component: <ListDemo /> },
    // table: { title: 'Table 表格', component: <TableDemo /> },
    // card: { title: 'Card 卡片', component: <CardDemo /> },
    // alert: { title: 'Alert 警告提示', component: <AlertDemo /> },
    // modal: { title: 'Modal 对话框', component: <ModalDemo /> },
    // input: { title: 'Input 输入框', component: <InputDemo /> },
    // select: { title: 'Select 选择器', component: <SelectDemo /> },
    // datepicker: { title: 'DatePicker 日期选择框', component: <DatePickerDemo /> },
    // message: { title: 'Message 全局提示', component: <MessageDemo /> },
    // notification: { title: 'Notification 通知提醒框', component: <NotificationDemo /> },
    // spin: { title: 'Spin 加载中', component: <SpinDemo /> },
    // list: { title: 'List 列表', component: <ListDemo /> },
    // grid: { title: 'Grid 栅格', component: <GridDemo /> },
    // layout: { title: 'Layout 布局', component: <LayoutDemo /> },
    // menu: { title: 'Menu 导航菜单', component: <MenuDemo /> },
    // breadcrumb: { title: 'Breadcrumb 面包屑', component: <BreadcrumbDemo /> },
    // icon: { title: 'Icon 图标', component: <IconDemo /> },
  };

  const currentComponent = componentName ? componentMap[componentName] : null;

  if (!currentComponent) {
    return (
      <div>
        <Title level={2}>组件未找到</Title>
        <p>请从左侧菜单选择一个组件进行查看。</p>
      </div>
    );
  }

  return (
    <div>
      <Title level={2}>{currentComponent.title}</Title>
      <Divider />
      {currentComponent.component}
    </div>
  );
};

export default ComponentDemo;