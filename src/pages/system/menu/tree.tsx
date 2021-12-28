import React, { useEffect, useState } from "react";
import { Tree, Popconfirm, message, Spin } from "antd";
import { MinusCircleOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "./index.less";

const TreePage = (props) => {
  const { data, onSelectTree, addForm, deleteMenus, loading } = props;

  const [menus, setMenus]: any = useState([]);

  useEffect(() => {
    if (data) {
      setMenus(data);
    }
  }, [data]);

  const [expandedKeys, setExpandedKeys] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedValues, setSelectedValues]: any = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = (expandedKeysValue) => {
    console.log("onExpand", expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue, info: any) => {
    // console.log("onCheck", info.checkedNodes);
    setCheckedKeys(checkedKeysValue);
    setSelectedValues(info.checkedNodes);
  };

  const onSelect = (selectedKeysValue, info: any) => {
    // console.log("onSelect", info);
    setSelectedKeys(selectedKeysValue);
    onSelectTree && onSelectTree(info.selectedNodes[0]);
  };

  // 新增菜单
  const addHandle = () => {
    addForm && addForm();
    setSelectedKeys([]);
  };

  // 删除菜单
  const deleteHandle = async () => {
    if (!selectedValues.length) {
      message.error("请先选择菜单");
      return;
    }
    await (deleteMenus && deleteMenus(selectedValues.map((m) => m.id)));
    setSelectedKeys([]);
    setSelectedValues([]);
    setCheckedKeys([]);
  };

  return (
    <>
      <div className={styles.action} style={{ marginBottom: 10, height: 20 }}>
        <PlusCircleOutlined
          style={{ fontSize: 18 }}
          className={styles.plus}
          onClick={addHandle}
        />
        <Popconfirm title="是否删除选择菜单" onConfirm={() => deleteHandle()}>
          <MinusCircleOutlined
            style={{ fontSize: 18, marginLeft: 15 }}
            className={styles.minus}
          />
        </Popconfirm>
      </div>
      <div style={{ height: "60vh", overflowY: "auto" }}>
        <Spin spinning={loading}>
          <Tree
            key={JSON.stringify(menus)}
            checkable
            onCheck={onCheck}
            onSelect={onSelect}
            defaultExpandAll
            treeData={menus}
            selectedKeys={selectedKeys}
          />
        </Spin>
      </div>
    </>
  );
};

export default TreePage;
