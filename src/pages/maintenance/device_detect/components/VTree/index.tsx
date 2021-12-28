import React, {
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
  forwardRef,
} from "react";
import { Tree, Spin, message } from "antd";
import { DownOutlined } from "@ant-design/icons";
import styles from "./index.less";

const VTree = (props, ref) => {
  const [loading, setLoading]: any = useState(false);
  const [treeData, setTreeData]: any = useState([]);

  const { onSelect: onSelectHandle, services } = props;

  useEffect(() => {
    handleSearch();
  }, []);

  useImperativeHandle(ref, () => {
    handleSearch;
  });

  const onSelect = (selectedKeys: React.Key[], info: any) => {
    onSelectHandle(selectedKeys[0]);
  };

  //获取treeData
  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await services();
      const treeData = getTreeData(data || []);

      setTreeData((treeData && treeData) || []);
      // setDefaultExpandedKeys(
      //   ((treeData && treeData) || []).map(item => item.id)
      // );
      setLoading(false);
    } catch (e) {
      message.error(`${e}`);
      setLoading(false);
    }
  };

  const getTreeData = data => {
    return data.map((m, index) => {
      if (m.childs) {
        return {
          title: (
            <span key={index}>
              {m.name}
              <span className={styles.color}>({m.total || 0})</span>
            </span>
          ),
          key: m.id,
          children: getTreeData(m.childs),
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
        };
      }
    });
  };

  return (
    <div className={styles.tree}>
      <Spin spinning={loading}>
        <Tree
          key={JSON.stringify(treeData)}
          showLine
          switcherIcon={<DownOutlined />}
          defaultExpandAll
          showIcon
          onSelect={onSelect}
          treeData={treeData}
        />
      </Spin>
    </div>
  );
};

export default forwardRef(VTree);
