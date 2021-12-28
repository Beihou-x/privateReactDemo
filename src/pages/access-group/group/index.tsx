import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, Button, Input, Popconfirm, message } from "antd";
import styles from "./index.less";
import VTree from "./VTree";
import {
  deviceSearchByGroupSync,
  deviceGroupSyncSearch,
  deviceGroupSyncDelete,
  deviceGroupsSyncDelete,
  // distributeDeviceSync,
} from "@/services/v1";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import Modal from "./Modal";
import Assign from "./assign";
import { ListGroup } from "amis";
interface DataType {}
const Group = () => {
  const { pushlist } = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const treeRef: any = useRef();
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [groupId, setGroupId] = useState("-1");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAssign, setModalAssign] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "设备所属类型",
      dataIndex: ["source_type"],
    },
    {
      title: "设备编码",
      dataIndex: ["id"],
    },
    {
      title: "设备名称",
      dataIndex: ["name"],
    },
    {
      title: "设备厂商",
      dataIndex: ["manufactor"],
    },
    {
      title: "设备状态",
      dataIndex: ["status"],
    },
    {
      title: "行政区域",
      dataIndex: ["unit"],
    },
    {
      title: "安装地址",
      dataIndex: ["address"],
    },
    {
      title: "安装时间",
      dataIndex: ["inst_time"],
    },
    {
      title: "经度",
      dataIndex: ["longitude"],
    },
    {
      title: "纬度",
      dataIndex: ["latitude"],
    },
    {
      title: "操作",
      width: 100,
      render: (val, record) => (
        <Popconfirm
          title="是否移除本条数据"
          onConfirm={() => handleDelete([record.id])}
        >
          <a>移除</a>
        </Popconfirm>
      ),
    },
  ];

  // 移除设备
  const handleDelete = async (ids) => {
    
    try {
      await deviceGroupsSyncDelete({
        device_ids: ids,
        tag_id: groupId,
      });
      const tableR = tableRef;
      tableR.current.handleSearch({ tag_id: groupId });
    } catch (e) {
      message.error(`${e}`);
    }
  };

  // 删除分组
  const onDelete = async (id) => {
    try {
      await deviceGroupSyncDelete({ id });
      handleSearchGroup();
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedKeys(selectedRowKeys);
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      id: record["id"],
    }),
  };

  const onSelect = async (tag_id) => {
    await setGroupId(tag_id);
    getTableData(tag_id);
  };

  const getTableData = (id) => {
    const tableR = tableRef;
    tableR.current.handleSearch({ tag_id: id });
  };

  // 弹框
  const handleModalVisible = (visible, parentId) => {
    setModalVisible(visible);
    if (visible && parentId) {
      setGroupId(parentId);
      setData({ parent_id: parentId });
    } else {
      setGroupId("-1");
      setData({});
    }
  };

  // 查询分组

  const handleSearchGroup = () => {
    const treeR = treeRef;
    treeR.current.handleSearch();
  };

  const handleCancel = (flag) => {
    setModalAssign(flag);
  };

  // 保存分配设备
  const handleOk = (keys) => {
    // setLoading(true);
    // distributeDeviceSync({
    //   device_ids: keys,
    //   group_id: groupId,
    // }).then((res) => {
    //   console.log("res==>>", res);
    //   setLoading(false);
    //   if (res && !Object.keys(res).length) {
    //     message.success("分配设备成功");
    //     handleCancel(false);
    //     getTableData(groupId);
    //     handleSearchGroup();
    //   }
    // });
  };

  const assignProps = {
    handleCancel: () => handleCancel(false),
    handleOk,
    modalVisible: modalAssign,
    groupId,
    loading,
  };

  return (
    <div className={styles.containers}>
      <Row gutter={16}>
        <Card
          bordered={false}
          style={{ height: "70vh", overflowY: "auto", width: 350 }}
        >
          <VTree
            ref={treeRef}
            onAdd={handleModalVisible}
            onDelete={onDelete}
            onSelect={onSelect}
            // services={async (params) => {
            //   const response = await deviceGroupSyncSearch({
            //     ...params,
            //     // parent_id: "0",
            //     // // orderBy: "sequence",
            //   });
            //   console.log('response=============',response);
              
            //   if (response && response.length) {
            //     setTreeData(response);
            //     return response;
            //   } else {
            //     return [];
            //   }
            // }}
          />
        </Card>

        <Card
          bordered={false}
          style={{ width: "calc(100% - 370px)", marginLeft: 20 }}
        >
          <SearchForm
            formList={[
              {
                label: "设备编码",
                name: "tag_id",
                renderFormItem: () => <Input autoComplete="off" />,
              },
              {
                label: "设备名称",
                name: "name",
                renderFormItem: () => <Input autoComplete="off" />,
              },
            ]}
            onChange={() => {}}
          />
          <div>
            <Button
              type="primary"
              style={{ marginRight: 20, marginBottom: 18 }}
              disabled={!groupId || groupId === "-1"}
              onClick={() => {
                setModalAssign(true);
              }}
            >
              分配设备
            </Button>
            <Popconfirm
              disabled={selectedKeys.length === 0}
              title={`是否移除${selectedKeys.length}条数据`}
              onConfirm={(e: any) => {
                e.stopPropagation();
                handleDelete(selectedKeys);
              }}
            >
              <Button
                type="primary"
                style={{ marginRight: 20, marginBottom: 18 }}
                disabled={!selectedKeys.length}
              >
                批量移除
              </Button>
            </Popconfirm>
          </div>

          <StandardTable
            ref={tableRef}
            columns={columns}
            services={async (params) => {
              const response = await deviceSearchByGroupSync({
                ...params,
                tag_id: groupId,
              });
              if (response) {
                return response;
              } else {
                return {};
              }
            }}
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
          />
        </Card>
        {modalVisible ? (
          <Modal
            data={data}
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
            treeData={treeData}
            handleSearchGroup={handleSearchGroup}
          />
        ) : (
          ""
        )}
        {modalAssign ? <Assign {...assignProps} /> : ""}
      </Row>
    </div>
  );
};

export default Group;
