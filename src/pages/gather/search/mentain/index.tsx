import React, { useContext, useState, useRef, useEffect } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider, Modal, message,Popconfirm } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

import { gatherTask, exportService, ServiceStatus,serviceDelete } from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import moment from "moment";
import ModalAdd from "./ModalAdd";
import Edit from "./edit";
import { formatDate } from "@/utils/utils";
import Detail from "./detail";
const { Option } = Select;

type AccessProps = {};

const Access = (props) => {
  const [sources, setSources] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailShow, setDetailShow] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});

  const { pushlist } = useContext(DefaultPubSubContext);
  const refTable: any = useRef(null);

  const edit = (val, isShow) => {
    setEditData(val);
    setEditShow(isShow);
  };

  const detail = (val) => {
    setDetailShow(true);
    setDetailData(val);
  };

  const handleDelete = async (id) => {
    await serviceDelete({id});
    await handleSearchReset();
  };

  const handleRestartOrStop = (val, title, method) => {
    Modal.confirm({
      title: title,
      content: `是否确认${title}名称为:"${val.name}"的服务`,
      icon: <ExclamationCircleOutlined />,
      bodyStyle: { color: "#fff" },
      onOk() {
        restartOrStop(val.id, method, title);
      },
      onCancel() {},
    });
  };
  const restartOrStop = async (id, method, title) => {
    const res = await ServiceStatus(id, {
      name: method,
    });
    if (res.length === 0) {
      message.success(`${title}成功`);
    }
    handleSearchReset();
  };

  const columns = [
    {
      title: "服务名称",
      dataIndex: ["name"],
      align: "center",
    },
    {
      title: "服务类型",
      dataIndex: ["category"],
      align: "center",
    },
    {
      title: "服务IP信息",
      dataIndex: ["ip"],
      align: "center",
    },
    {
      title: "服务图标",
      dataIndex: ["icon_url"],
      align: "center",
    },
    {
      title: "服务协议",
      dataIndex: ["protocol"],
      align: "center",
    },
    {
      title: "服务当前状态",
      dataIndex: ["status"],
      align: "center",
    },
    {
      title: "创建人",
      dataIndex: ["creator"],
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: ["created_at"],
      align: "center",
      render: (text, record) => (
        <span>
          {record &&
            record.created_at &&
            moment(record.created_at * 1000).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val, record) => (
        <>
          <a onClick={() => handleRestartOrStop(val, "重启", "restart")}>
            重启
          </a>
          <Divider type="vertical" />
          <a onClick={() => handleRestartOrStop(val, "停用", "stop")}>停用</a>
          <Divider type="vertical" />
          <a onClick={() => edit(val, true)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => detail(val)}>详情</a>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val.id)}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

  // search
  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "区域",
              name: "area",
              renderFormItem: () => <Select></Select>,
            },
            {
              label: "服务名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18 }}
          onClick={() => handleModalVisible(true)}
        >
          新增
        </Button>
        <DownLoadFile
          services={() => {
            return exportService({
              category: "JOB",
            });
          }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={gatherTask}
          rowSelection={false}
          
        />
      </Card>

      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearchReset}
          category="JOB"
        />
      ) : (
        ""
      )}
      {detailShow ? (
        <Detail
          detailShow={detailShow}
          handleDetailShow={setDetailShow}
          detailData={detailData}
        />
      ) : (
        ""
      )}
      {editShow ? (
        <Edit
          modalVisible={editShow}
          handleModalVisible={edit}
          handleSearch={handleSearchReset}
          category="JOB"
          editData={editData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Access;
