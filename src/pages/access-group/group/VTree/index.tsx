import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Tree, message, Button, Spin, Popconfirm } from "antd";
import {
  PlusCircleOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import styles from "./index.less";
import { deviceGroupSyncSearch } from "@/services/v1";

const VTree = (props, ref) => {
  const [treeData, setTreeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [defaultExpandedKeys, setDefaultExpandedKeys] = useState([]);

  const { onSelect: onSelectHandle, onAdd, onDelete } = props;

  useEffect(() => {
    handleSearch();
  }, []);

  useImperativeHandle<any, any>(ref, () => ({
    handleSearch,
  }));

  //获取treeData
  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await deviceGroupSyncSearch({});
      const treeData = getTreeData(data.items);
      setTreeData((treeData && treeData) || []);
      setDefaultExpandedKeys(
        ((treeData && treeData) || []).map(item => item.id)
      );
      setLoading(false);
    } catch (e) {
      message.error(`${e}`);
      setLoading(false);
    }
  };

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    onSelectHandle(selectedKeys[0]);
  };

  const addHandle = (e, id) => {
    e.stopPropagation();
    onAdd(true, id);
  };
  const editHandle = (e, id) => {
    e.stopPropagation();
    onAdd(true, id);
  };
  // const deleteHandle = (e, id) => {
  //   e.stopPropagation()
  //   onDelete(id)
  // }

  const getTreeData = data => {
    return data.map(m => {
      if (m.childs) {
        return {
          title: (
            <span>
              {m.name}
              <span className={styles.color}>({m.total || 0})</span>
            </span>
          ),
          key: m.id,
          children: getTreeData(m.childs),
          icon: (
            <div className={styles.position}>
              <PlusOutlined onClick={e => addHandle(e, m.id)} />
              <EditOutlined onClick={e => editHandle(e, m.id)} />
              <Popconfirm
                title="是否删除本条数据"
                onCancel={(e: any) => {
                  e.stopPropagation();
                }}
                onConfirm={(e: any) => {
                  e.stopPropagation();
                  onDelete(m.id);
                }}
              >
                <DeleteOutlined onClick={e => e.stopPropagation()} />
              </Popconfirm>
            </div>
          ),
        };
      } else {
        return {
          title: (
            <span>
              {m.name}
              <span className={styles.color}>({m.total || 0})</span>
            </span>
          ),
          key: m.id,
          icon: (
            <div className={styles.position}>
              <PlusOutlined onClick={e => addHandle(e, m.id)} />
              <EditOutlined onClick={e => editHandle(e, m.id)} />
              <Popconfirm
                title="是否删除本条数据"
                onCancel={(e: any) => {
                  e.stopPropagation();
                }}
                onConfirm={(e: any) => {
                  e.stopPropagation();
                  onDelete(m.id);
                }}
              >
                <DeleteOutlined onClick={e => e.stopPropagation()} />
              </Popconfirm>
            </div>
          ),
        };
      }
    });
  };

  return (
    <div className={styles.tree}>
      <Spin spinning={loading}>
        <Button
          style={{ marginBottom: 10 }}
          size="small"
          type="primary"
          onClick={() => onAdd(true)}
        >
          <PlusCircleOutlined />
        </Button>
        <span className={styles.color}>（一级分组数:{treeData.length}）</span>

        <Tree
          key={JSON.stringify(treeData)}
          defaultExpandAll
          showLine
          showIcon
          onSelect={onSelect}
          treeData={treeData}
        />
      </Spin>
    </div>
  );
};

export default forwardRef(VTree);
