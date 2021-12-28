import React, { useRef, useState, useEffect } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Link } from "react-router-dom";
import StandardTable from "@components/Table";
import { Card, Input, Select, Button, Divider, Popconfirm } from "antd";
import {
  roleManager,
  roleDelete,
} from "@/services/v1";
import SearchForm from "@components/SearchForm";
import moment from "moment";
import {formatDate} from '@/utils/utils';
import ModalAdd from "./Modal";
import Edit from './edit';

const Role = () => {
  const refTable: any = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({})

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };
  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };
  const deleteRole = async (val) => {
    await roleDelete(val.id);
    handleSearchReset();
  };

  const editRole =(val,isShow) => {
    setEditData(val)
    setEditShow(isShow)
  }

  const columns = [
    {
      dataIndex: "name",
      title: "角色名称",
      align: "center",
      width: 500
    },
    
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      width: 500,
      render: (val, record) => (
        <span>{(record&&record.creator)||"-"}/{formatDate(record && record.created_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      dataIndex: "quota",
      title: "日访问配额",
      align: "center",
      width: 500
    },
    {
      title: "操作",
      align: "center",
      width: 500,
      render: (val) => (
        <>
          <a onClick={() => editRole(val,true)}>编辑</a>
          <Divider type="vertical"></Divider>
          <Link to={`/system/permission/role/assign_permisson/${val.id}/${val.name}`}>分配权限</Link>
          <Divider type="vertical"></Divider>
          <Link to={`/system/permission/role/member_view/${val.id}`}>查看人员</Link>
          <Divider type="vertical"></Divider>
          <Popconfirm title="确认删除该角色?" onConfirm={() =>deleteRole(val)}>
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
              label: "角色名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          新增
        </Button>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={roleManager}
          rowSelection={false}
          
          tableProps={{}}
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
          handleModalVisible={editRole}
          handleSearch={handleSearchReset}
          editData={editData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Role;
