import React, { useState,useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Card,
  Input,
  Divider,
  Popconfirm,
  message,
  Select,
  Button,
  Row,
  Col,
} from "antd";
import DownLoadFile from "@components/DownLoadFile";
import { otherAppGather, exportService ,serviceDelete} from "@/services/v1";
import Detail from "../mentain/detail";
import ModalAdd from "../mentain/ModalAdd"; 
import moment from "moment";
import Edit from "../mentain/edit";

const { Option } = Select;
const Query = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailShow, setDetailShow] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});
  const refTable: any = useRef(null);

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

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
  // search
  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
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
      render: (val) => (
        <>
          <a onClick={() => edit(val,true)}>编辑</a>
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
          style={{ marginBottom: 18, marginRight: 20 }}
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          新增
        </Button>
        <DownLoadFile
          services={() => {
            return exportService({
              category: "APPLICATION"
            });
          }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={otherAppGather}
          rowSelection={false}
          
        />
      </Card>
      {detailShow ? (
        <Detail
          detailShow={detailShow}
          handleDetailShow={setDetailShow}
          detailData={detailData}
        />
      ) : (
        ""
      )}
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearchReset}
          category="APPLICATION"
        />
      ) : (
        ""
      )}
      {editShow ? (
        <Edit
          modalVisible={editShow}
          handleModalVisible={edit}
          handleSearch={handleSearchReset}
          category="APPLICATION"
          editData={editData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Query;
