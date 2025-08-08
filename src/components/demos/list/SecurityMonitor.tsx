import { List, Tag } from "antd";
import attackingIcon from './images/attacking.png';
import successIcon from './images/success.png';
import failIcon from './images/fail.png';
import errorIcon from './images/error.png';
import waitingIcon from './images/waiting.png';

const data = [
  {
    name: '应用账号爆破',
    status: 0,
  },
  {
    name: '应用漏洞攻击',
    status: 1,
  },
  {
    name: '批量数据获取',
    status: 2,
  },
  {
    name: '其他攻击脚本1',
    status: 3,
  },
  {
    name: '其他攻击脚本111111',
    status: 4,
  },
];

const statusConfig: Record<number, any> = {
  0: {
    color: '#f7dbe5',
    text: '防护失败',
    icon: <img src={failIcon} width={12} />,
    style: {
      color: '#fc4059',
    }
  },
  1: {
    color: '#d7f1ef',
    text: '防护成功',
    icon: <img src={successIcon} width={12} />,
    style: {
      color: '#2ed89b'
    }
  },
  2: {
    color: '#d7e5fd',
    text: '攻击中...',
    icon: <img src={attackingIcon} width={12} />,
    style: {
      color: '#3a88fb'
    }
  },
  3: {
    color: '#f7dbe5',
    text: '服务异常',
    icon: <img src={errorIcon} width={12} />,
    style: {
      color: '#fc4059'
    }
  },
  4: {
    color: '#CDD2DF',
    text: '待演练',
    icon: <img src={waitingIcon} width={12} />,
    style: {
      color: '#38415c'
    }
  }
}

const App = () => {

  return (
    <List
      style={{
        background: '#f5f6fe',
        padding: 8
      }}
      size="small"
      split={false}
      dataSource={data}
      renderItem={item => {
        const status = statusConfig[item.status];
        const { text, icon, style, ...rest } = status;
        return (
          <List.Item>
            <div style={{ display: 'flex', alignItems: 'center', fontSize: 12 }}>
              <Tag {...rest} style={{ ...style, display: 'flex', alignItems: 'center', columnGap: 4, width: 80, borderRadius: 4 }}>
                {icon ? icon : null}
                {text}
              </Tag>
              <span>{item.name}</span>
            </div>
          </List.Item>
        )
      }}
    />
  )
}

export default App;