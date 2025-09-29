import { Tree, message } from 'antd';
import type { DataNode, TreeProps } from 'antd/es/tree';
import React, { useState, useMemo } from 'react';

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

// 节点信息接口
interface NodeInfo {
  node: DataNode;
  parent: React.Key | null;
  children: Set<React.Key>;
  ancestors: Set<React.Key>;
  descendants: Set<React.Key>;
  isLeaf: boolean;
  level: number;
}

const App: React.FC = () => {
  const [gData, setGData] = useState(defaultData);

  // 使用 useMemo 缓存节点信息映射表
  const nodeInfoMap = useMemo(() => {
    const map = new Map<React.Key, NodeInfo>();
    
    // 一次遍历构建完整的节点关系映射
    const buildNodeMap = (nodes: DataNode[], parent: React.Key | null = null, level: number = 0, ancestors: Set<React.Key> = new Set()) => {
      nodes.forEach(node => {
        const children = new Set<React.Key>();
        const descendants = new Set<React.Key>();
        
        // 收集直接子节点
        if (node.children) {
          node.children.forEach(child => {
            children.add(child.key);
          });
        }
        
        // 创建节点信息
        const nodeInfo: NodeInfo = {
          node,
          parent,
          children,
          ancestors: new Set(ancestors),
          descendants,
          isLeaf: !node.children || node.children.length === 0,
          level
        };
        
        map.set(node.key, nodeInfo);
        
        // 递归处理子节点
        if (node.children) {
          const newAncestors = new Set(ancestors);
          newAncestors.add(node.key);
          
          buildNodeMap(node.children, node.key, level + 1, newAncestors);
          
          // 收集所有后代节点
          node.children.forEach(child => {
            descendants.add(child.key);
            const childInfo = map.get(child.key);
            if (childInfo) {
              childInfo.descendants.forEach(desc => descendants.add(desc));
            }
          });
        }
      });
    };
    
    buildNodeMap(gData);
    return map;
  }, [gData]);

  // 优化后的检查方法 - 直接通过 Map 查询
  const getNodeInfo = (key: React.Key): NodeInfo | undefined => {
    return nodeInfoMap.get(key);
  };

  const isAncestor = (ancestorKey: React.Key, descendantKey: React.Key): boolean => {
    const ancestorInfo = getNodeInfo(ancestorKey);
    return ancestorInfo ? ancestorInfo.descendants.has(descendantKey) : false;
  };

  const isSameParent = (key1: React.Key, key2: React.Key): boolean => {
    const info1 = getNodeInfo(key1);
    const info2 = getNodeInfo(key2);
    return !!info1 && !!info2 && info1.parent === info2.parent;
  };

  const hasChildren = (key: React.Key): boolean => {
    const info = getNodeInfo(key);
    return info ? !info.isLeaf : false;
  };

  const getParent = (key: React.Key): React.Key | null => {
    const info = getNodeInfo(key);
    return info ? info.parent : null;
  };

  const onDragEnter: TreeProps['onDragEnter'] = info => {
    console.log(info);
    // expandedKeys 需要受控时设置
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop: TreeProps['onDrop'] = info => {
    console.log('Drop info:', info);
    console.log('dropPosition:', info.dropPosition);
    console.log('dropToGap:', info.dropToGap);
    
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    console.log('Calculated dropPosition:', dropPosition);

    // 使用优化后的方法进行拖拽限制检查
    // 1. 如果拖拽的是父级节点（有子节点），不能拖拽到任何子级节点下
    if (hasChildren(dragKey)) {
      if (isAncestor(dragKey, dropKey)) {
        message.warning('父级节点不能拖拽到其子级节点下');
        return;
      }
    }

    // 2. 子级节点只能在同一父级下拖拽
    const dragParent = getParent(dragKey);
    const dropParent = getParent(dropKey);
    
    if (dragParent && dropParent) {
      if (!isSameParent(dragKey, dropKey)) {
        message.warning('子级节点只能在同一父级下进行拖拽');
        return;
      }
    }

    // 3. 特殊处理：如果拖拽节点有父级，但要拖拽到不同父级的节点位置
    if (dragParent && dropParent && dragParent !== dropParent) {
      message.warning('子级节点不能脱离当前父级');
      return;
    }

    // 4. 如果是拖拽到节点内部（不是gap），需要额外检查
    if (!info.dropToGap) {
      // 如果拖拽节点有父级，但目标节点不是其父级，则不允许
      if (dragParent && dragParent !== dropKey) {
        message.warning('子级节点不能脱离当前父级');
        return;
      }
      // 如果拖拽的是父级节点，不能拖拽到子级内部
      if (hasChildren(dragKey)) {
        message.warning('父级节点不能拖拽到其他节点内部');
        return;
      }
    }

    // 5. 新增：处理第一个子节点的特殊情况
    if (info.dropToGap && dragParent && dropParent) {
      // 检查是否试图拖拽到不同父级下
      if (dragParent !== dropParent) {
        message.warning('子级节点只能在同一父级下进行拖拽');
        return;
      }
      
      // 如果是拖拽到第一个子节点上方，且dropPosition计算异常
      const dropNodeInfo = getNodeInfo(dropKey);
      const dragNodeInfo = getNodeInfo(dragKey);
      
      if (dropNodeInfo && dragNodeInfo && 
          dropNodeInfo.parent && dragNodeInfo.parent &&
          dropNodeInfo.parent !== dragNodeInfo.parent) {
        message.warning('子级节点不能脱离当前父级');
        return;
      }
    }

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