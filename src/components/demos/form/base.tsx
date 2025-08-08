import { Button, Form, Input } from 'antd';
import React from 'react';

const Base = () => {
  const [form] = Form.useForm();

  const onSubmit = async (values: any) => {
    console.log(values, '=====11');
  };

  const handleSubmit = async () => {
    form.validateFields().then((values) => {
      // onSubmit(values);\
      console.log(values, '======values22')
    });
  };

  return (
    <Form form={form} onFinish={onSubmit} labelCol={{ span: 4 }}>
      <Form.Item label="用户名" name="username">
        <Input />
      </Form.Item>
      <Form.Item label="密码" name="password">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 4 }}>
        <Button type="primary" onClick={handleSubmit}>
          提交
        </Button>
      </Form.Item>

    </Form>
  )
};

export default Base;