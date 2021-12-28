import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, Button, Input, Popconfirm, message } from "antd";
import styles from "./index.less";
import VTree from "./VTree";
import {
  deviceSearchByGroup,
  deviceGroupSearch,
  deviceGroupDelete,
  deviceGroupsDelete,
  distributeDevice,
} from "@/services/v1";
import { Link } from "react-router-dom";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import Modal from "./Modal";
import { formatDate } from "@/utils/utils";
import Assign from "./assign";

interface DataType {}
const Group = () => {
  const { pushlist } = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const treeRef: any = useRef();
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [groupId, setGroupId] = useState("-1");
  const [modalVisible, setModalVisible] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalAssign, setModalAssign] = useState(false);

  const columns = [
    {
      title: "申请编号",
      dataIndex: ["access_id"],
      width: 100,
      ellipsis: true,
    },
    {
      title: "国标ID",
      dataIndex: "id",
      width: 200,
      ellipsis: true,
    },
    {
      title: "设备名称",
      dataIndex: "alias",
      width: 200,
      ellipsis: true,
    },
    {
      title: "经度",
      dataIndex: "longitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "地点",
      dataIndex: "place",
      width: 200,
      ellipsis: true,
    },
    {
      title: "设备IP",
      dataIndex: "ip_addr",
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备厂商",
      dataIndex: "manufactor",
      width: 100,
      ellipsis: true,
    },
    {
      title: "行政区划",
      dataIndex: "place_code",
      width: 200,
      ellipsis: true,
    },
    {
      title: "标签",
      dataIndex: "group_name",
      width: 100,
      ellipsis: true,
    },
    {
      title: "接入来源",
      dataIndex: "source_id",
      width: 100,
      ellipsis: true,
    },
    {
      title: "卡口类型",
      dataIndex: "function_type",
      width: 100,
      ellipsis: true,
    },
    {
      title: "是否注册一机一档",
      dataIndex: "is_register",
      width: 80,
      ellipsis: true,
    },
    {
      title: "是否注册人像引擎",
      dataIndex: "is_vendor_register",
      width: 80,
      ellipsis: true,
    },
    {
      width: 200,
      title: "最后抓拍时间",
      dataIndex: "update_at",
      ellipsis: true,
      render: (val, record) => (
        <span>{formatDate(record && record.update_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      width: 200,
      title: "最后上传时间",
      dataIndex: "upload_at",
      ellipsis: true,
      render: (val, record) => (
        <span>{formatDate(record && record.upload_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "分组",
      dataIndex: "group",
      width: 200,
      ellipsis: true,
    },
    {
      title: "图片统计",
      dataIndex: "total",
      width: 80,
      ellipsis: true,
    },
    {
      title: "操作",
      width: 100,
      ellipsis: true,
      fixed: "right",
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
      await deviceGroupsDelete({
        device_ids: ids,
        group_id: groupId,
      });
      const tableR = tableRef;
      tableR.current.handleSearch({ group_id: groupId });
    } catch (e) {
      message.error(`${e}`);
    }
  };

  // 删除分组
  const onDelete = async (id) => {
    try {
      await deviceGroupDelete({ id });
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

  const onSelect = async (id) => {
    await setGroupId(id);
    getTableData(id);
  };

  const getTableData = (id) => {
    const tableR = tableRef;
    tableR.current.handleSearch({ group_id: id });
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
    setLoading(true);
    distributeDevice({
      device_ids: keys,
      group_id: groupId,
    }).then((res) => {
      setLoading(false);
      if (res===undefined) {
        message.success("分配设备成功");
        handleCancel(false);
        getTableData(groupId);
        handleSearchGroup();
      }
    });
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
            services={async (params) => {
              const response = await deviceGroupSearch({
                ...params,
                parent_id: "0",
                orderBy: "sequence",
              });

              if (response && response.length) {
                setTreeData(response);
                return response;
              } else {
                return [];
              }
            }}
          />
        </Card>

        <Card
          bordered={false}
          style={{ width: "calc(100% - 370px)", marginLeft: 20 }}
        >
          <SearchForm
            formList={[
              {
                label: "国标ID",
                name: "id",
                renderFormItem: () => <Input autoComplete="off" />,
              },
              {
                label: "设备名称",
                name: "alias",
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
            // services={deviceSearchByGroup }
            services={async (params) => {
              const response = await deviceSearchByGroup({
                ...params,
                group_id: [groupId],
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
            tableProps={{
              tableLayout: "fixed",
              scroll: {
                x: "auto",
              },
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
