import React from 'react';
import { Button, Space } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>React 18 + Ant Design 4 + Vite</h1>
        <Space>
          <Button type="primary">Primary Button</Button>
          <Button>Default Button</Button>
          <Button type="dashed">Dashed Button</Button>
        </Space>
      </header>
    </div>
  );
}

export default App;