import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Button, Divider, Popconfirm, message } from "antd";
import {
  userSearch,
  resetPassword,
  exportUser,
  userDelete,
} from "@/services/v1";
import SearchForm from "@components/SearchForm";
import moment from "moment";
import ModalAdd from "./Modal";
import Edit from "./edit";
import DownLoadFile from "@components/DownLoadFile";
import {formatDate} from "@/utils/utils";
import { assign } from "lodash";

const User = () => {
  const refTable: any = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});
  // 判断是编辑还是分配权限
  const [type, setType] = useState("");
  const [expandedRowKeys, setRowKeys]: any = useState([]);

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  const reset = async (name) => {
    let res = await resetPassword(name);
    if (res === undefined) {
      message.success("密码重置成功!");
    }
  };
  const deleteUser = async (val) => {
    try {
      await userDelete(val.id);
      message.success("用户删除成功");
    } catch (error) {
      message.error("删除失败!");
    }
    handleSearchReset();
  };

  const editUser = (val, isShow,type) => {
    setEditShow(isShow);
    setEditData(val);
    setType(type)
  };

  const columns = [
    {
      dataIndex: "display_name",
      title: "用户名称",
      align: "center",
    },
    {
      dataIndex: "name",
      title: "用户账号",
      align: "center",
    },

    {
      dataIndex: "description",
      title: "用户描述",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      render: (val, record) => (
        <span>{(record&&record.creator)||"-"}/{formatDate(record && record.created_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <a onClick={() => editUser(val, true,"edit")}>编辑</a>
          <Divider type="vertical"></Divider>
          <a onClick={() => editUser(val, true,"assign")}>分配权限</a>
          <Divider type="vertical"></Divider>
          <Popconfirm
            title="是否重置该用户密码"
            onConfirm={() => {
              reset(val.name);
            }}
          >
            <a>密码重置</a>
          </Popconfirm>
          <Divider type="vertical"></Divider>
          <Popconfirm
            title="是否删除该用户"
            onConfirm={() => {
              deleteUser(val);
            }}
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
              label: "用户名称",
              name: "display_name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "用户账号",
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
        <DownLoadFile style={{ marginRight: 20 }} services={exportUser}>
          导出
        </DownLoadFile>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={userSearch}
          rowSelection={false}
          
        />
      </Card>
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
      {editShow ? (
        <Edit
          modalVisible={editShow}
          handleModalVisible={editUser}
          handleSearch={handleSearchReset}
          editData={editData}
          type={type}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default User;
