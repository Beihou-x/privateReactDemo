import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, Button, Input, Popconfirm, message } from "antd";
import styles from "./index.less";
import VTree from "./VTree";
import {
  deviceSearchByGroupSync,
  deviceGroupSyncDelete,
  deviceGroupsSyncDelete,
  devicetagAssign,
  deviceGroupSyncSearch,
} from "@/services/v1";
import { deviceGroupTempDownload,deviceGroupUpload } from "@/services/v2";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import Modal from "./Modal";
import Assign from "./assign";
import ImportModal from "@components/Modal";
import Upload from "@components/Upload";
import DownloadTemplate from "@components/DownloadTemplate";
import { formatDate } from "@/utils/utils";

interface DataType {}
const Group = () => {
  const { pushlist }:any = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const treeRef: any = useRef();
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [groupId, setGroupId] = useState("-1");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAssign, setModalAssign] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [data, setData]: any = useState({});
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "申请编号",
      dataIndex: ["access_id"],
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备编码",
      dataIndex: "device_id",
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
      dataIndex: "ipv4",
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
      title: "自定义标签/业务标签",
      dataIndex: "business_label",
      width: 100,
      ellipsis: true,
      render: (_, record) => (
        <>
          {record.custom_label || "-"}/{record.business_label || "-"}
        </>
      ),
    },
    {
      title: "接入来源",
      dataIndex: "source",
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
      title: "是否同步一机一档",
      dataIndex: "is_sync",
      width: 80,
      ellipsis: true,
    },
    // {
    //   title: "是否注册人像引擎",
    //   dataIndex: "is_vendor_register",
    //   width: 80,
    //   ellipsis: true,
    // },
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
      dataIndex: "sync_updated_at",
      ellipsis: true,
      render: (val, record) => (
        <span>
          {formatDate(record && record.sync_updated_at, "YYYY-MM-DD")}
        </span>
      ),
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
          onConfirm={() => handleDelete([record.device_id])}
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
      treeRef.current.handleSearch();
      setSelectedKeys([])
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
    },
    selectedRowKeys: selectedKeys
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

  const onEdit = (visible, data) => {
    setModalVisible(visible);
    setData(data);
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
    devicetagAssign({
      device_ids: keys,
      tag_id: groupId,
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

  const importEmit = (val, res) => {
    if (val === 'error') {
      message.error('导入失败')
    } else if (val === 'submit') {
      if (res) {
        message.success(`一共读取${res.read_row}条数据, 成功插入${res.insert_row}条, 失败${res.failed_row}条`, 6);
      }
      pushlist('importModel', false);
    }
  }

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
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
            services={async (params) => {
              const response = await deviceGroupSyncSearch({
                ...params,
                parent_id: "1",
                orderBy: "sequence",
              });

              if (response && response.items) {
                setTreeData(response.items);
                return response.items;
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
                label: "设备编码",
                name: "device_id",
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
            <Button
              type="primary"
              style={{ marginRight: 20, marginBottom: 18 }}
              disabled={!groupId || groupId === "-1"}
              onClick={() => pushlist('importModel',true)}
              >
                导入设备
            </Button>
            
          </div>

          <StandardTable
            rowKey={"device_id"}
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
            title={data && data.id ? "编辑标签" : "新增标签"}
          />
        ) : (
          ""
        )}
        {modalAssign ? <Assign {...assignProps} /> : ""}
      </Row>
      <ImportModal subscribeName="importModel" title="导入设备">
        <DownloadTemplate
            services={() => {
              return deviceGroupTempDownload();
            }}
            type="link"
          >
            下载模板
          </DownloadTemplate>
          <Upload
            services={({ formData }) => {
              return deviceGroupUpload(groupId,{
                formData,
              });
            }}
            onEmit={importEmit}
          />
      </ImportModal>
    </div>
  );
};

export default Group;
