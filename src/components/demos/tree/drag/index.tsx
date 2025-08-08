import { Tree } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useState } from 'react';

const defaultData = [
  {
    title: '权限概览',
    key: 'permissionInfo',
    children: [
      {
        title: '权限管控',
        key: 'permissionControl',
        children: [
          {
            title: '管控数据库',
            key: 'databaseManagement',
          },
          {
            title: '账号授权用户总数',
            key: 'userAuthorizationTotal',
          },
          {
            title: '登录权限身份总数',
            key: 'loginPermissionIdentityTotal',
          },
          {
            title: '数据操作身份总数',
            key: 'dataOperationIdentityTotal',
          },
          {
            title: '数据库操作身份总数',
            key: 'databaseOperationIdentityTotal',
          },
          {
            title: '快速授权身份总数',
            key: 'quickAuthorizationIdentityTotal',
          },
          {
            title: 'SQL授权身份总数',
            key: 'sqlAuthorizationIdentityTotal',
          },
          {
            title: '访问身份总数',
            key: 'accessIdentityTotal',
          },
        ]
      },
      {
        title: '业务防护',
        key: 'businessProtection',
        children: [
          {
            title: '登录控制',
            key: 'loginControl',
          },
          {
            title: '访问控制',
            key: 'accessControl',
          },
          {
            title: '登录授权总数',
            key: 'loginAuthorizationTotal',
          },
          {
            title: '访问授权总数',
            key: 'accessAuthorizationTotal',
          },
          {
            title: '信任身份总数',
            key: 'trustIdentityTotal',
          },
        ]
      },
      {
        title: '数据加密',
        key: 'dataEncryption',
        children: [
          {
            title: '整库加密',
            key: 'fullDatabaseEncryption',
          },
          {
            title: 'Schema加密',
            key: 'schemaEncryption',
          },
          {
            title: '表加密',
            key: 'tableEncryption',
          },
          {
            title: '列加密',
            key: 'columnEncryption',
          },
          {
            title: '授权总人数',
            key: 'authorizationTotal',
          },
        ]
      }
    ]
  },
  {
    title: '权限分析',
    key: 'permissionAnalysis',
    children: [
      {
        title: '权限模板使用分析',
        key: 'permissionTemplateUseAnalysis',
      },
      {
        title: '行为分析',
        key: 'behaviorAnalysis',
      },
      {
        title: '访问目标TOP5',
        key: 'accessTargetTop5',
      },
      {
        title: '权限变更',
        key: 'permissionChange',
      },
    ]
  },
  {
    title: '权限分布',
    key: 'permissionDistribution',
  }
]

const App: React.FC = () => {
  const [gData, setGData] = useState(defaultData);

  const onDragEnter: TreeProps['onDragEnter'] = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = info => {
    console.log(info);
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (
      data: DataNode[],
      key: React.Key,
      callback: (node: DataNode, i: number, data: DataNode[]) => void,
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children!, key, callback);
        }
      }
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: DataNode;
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
      });
    } else if (
      ((info.node as any).props.children || []).length > 0 && // Has children
      (info.node as any).props.expanded && // Is expanded
      dropPosition === 1 // On the bottom gap
    ) {
      loop(data, dropKey, item => {
        item.children = item.children || [];
        // where to insert 示例添加到头部，可以是随意位置
        item.children.unshift(dragObj);
        // in previous version, we use item.children.push(dragObj) to insert the
        // item to the tail of the children
      });
    } else {
      let ar: DataNode[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i!, 0, dragObj!);
      } else {
        ar.splice(i! + 1, 0, dragObj!);
      }
    }
    setGData(data);
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandAll
      draggable
      blockNode
      checkable
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};

export default App;