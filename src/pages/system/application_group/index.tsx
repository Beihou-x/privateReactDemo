import React, { useState, useRef, useContext } from "react";
import { Row, Col, Card, Button, Input, Popconfirm, message,Select,Tag } from "antd";
import styles from "./index.less";
import VTree from "./VTree";
import { deviceGroupsSyncDelete, } from "@/services/v1";
import {
  applicationGroupSearch,
  applicationGroupDelete,
  applicationGroupAppSearch,
  applicationGroupassignApp,
  applicationGroupDeleteApp,
  deviceGroupTempDownload,
  deviceGroupUpload,
} from "@/services/v2";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import Modal from "./Modal";
import Assign from "./assign";
import ImportModal from "@components/Modal";
import Upload from "@components/Upload";
import DownloadTemplate from "@components/DownloadTemplate";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";


interface DataType {}
const Group = () => {
  const { pushlist }: any = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const treeRef: any = useRef();
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [groupId, setGroupId] = useState("-1");
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAssign, setModalAssign] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [data, setData]: any = useState({});
  const [loading, setLoading] = useState(false);

  const categorys = filterCategory("应用类型") || [];
  const secretLevel = filterCategory("密级") || [];
  const industry = filterCategory("行业属性") || [];
  const administrative = filterCategory("行政属性") || [];

  const columns = [
    {
      dataIndex: "name",
      title: "应用名称",
      align: "center",
    },
    {
      dataIndex: "category",
      title: "类型",
      align: "center",
      render: (val) => <span>{getCodeValue(categorys, val)}</span>,
    },
    {
      dataIndex: "expired_at",
      title: "授权有效期",
      align: "center",
      render: (val, record) => (
        <span>{formatDate(record && record.expired_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      dataIndex: "maintenance",
      title: "运维单位",
      align: "center",
    },
    {
      dataIndex: "management",
      title: "管理单位",
      align: "center",
    },
    {
      dataIndex: "secret_level",
      title: "密级",
      align: "center",
      render: (val) => <span>{getCodeValue(secretLevel, val)}</span>,
    },
    {
      dataIndex: "industry",
      title: "行业属性",
      align: "center",
      render: (val) => <span>{getCodeValue(industry, val)}</span>,
    },
    {
      dataIndex: "administrative",
      title: "行政属性",
      align: "center",
      render: (val) => <span>{getCodeValue(administrative, val)}</span>,
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
      render: val => (
        <>
          {val==="DEFAULT"? "正常": "删除"}
        </>
      )
    },
    {
      dataIndex: "tag_name",
      title: "标签",
      align: "center",
      render: val => (
        val ? <Tag color="#108ee9">{val&&val[0]}</Tag>
        : ''
      )
    },
    // {
    //   dataIndex: "version",
    //   title: "版本",
    //   align: "center",
    // },
    // {
    //   dataIndex: "creator",
    //   title: "创建人/创建时间",
    //   align: "center",
    //   render: (val, record) => (
    //     <span>
    //       {(record && record.creator) || "-"}/
    //       {formatDate(record && record.created_at, "YYYY-MM-DD")}
    //     </span>
    //   ),
    // },
  ];

  // 移除设备
  const handleDelete = async (ids) => {
    try {
      await applicationGroupDeleteApp({
        application_ids: ids,
        tag_id: groupId,
      });
      const tableR = tableRef;
      tableR.current.handleSearch({ tag_id: groupId });
      setSelectedKeys([]);
    } catch (e) {
      message.error(`${e}`);
    }
  };

  // 删除分组
  const onDelete = async (id) => {
    try {
      await applicationGroupDelete({ id });
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
    applicationGroupassignApp({
      application_ids: keys,
      tag_id: groupId,
    }).then((res) => {
      console.log("res==>>", res);
      setLoading(false);
      if (res ===undefined) {
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
    if (val === "error") {
      message.error("导入失败");
    } else if (val === "submit") {
      if (res) {
        message.success(
          `一共读取${res.read_row}条数据, 成功插入${res.insert_row}条, 失败${res.failed_row}条`,
          6
        );
      }
      pushlist("importModel", false);
    }
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
            onEdit={onEdit}
            onDelete={onDelete}
            onSelect={onSelect}
            services={async (params) => {
              const response = await applicationGroupSearch({
                ...params,
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
                label: "应用名称",
                name: "name",
                renderFormItem: () => <Input autoComplete="off" />,
              },
              {
                label: "类型",
                name: "category",
                renderFormItem: () => <Select options={filterCategory("应用类型")} />,
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
              分配应用
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
              onClick={() => pushlist("importModel", true)}
            >
              导入应用
            </Button>
          </div>

          <StandardTable
            rowKey={"id"}
            ref={tableRef}
            columns={columns}
            services={async (params) => {
              const response = await applicationGroupAppSearch({
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
            return deviceGroupUpload(groupId, {
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
