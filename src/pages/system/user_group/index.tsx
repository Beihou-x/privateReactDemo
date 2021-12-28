import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Button, Divider, Popconfirm, message } from "antd";
import {  userGroupSearch,userGroupDelete, UserGroupAddUser } from "@/services/v2";
import {formatDate} from "@/utils/utils";
import { Link } from "react-router-dom";
import ModalAdd from "./Modal";
import AddUser from "./addUser";
import Assign from "./assignPermission";

const UserGroup = () => {
  const refTable: any = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [editData, setEditData] = useState({});

  const [addUserShow, setAddUserShow] = useState(false);
  const [assignShow, setAssignShow] = useState(false);

  const handleModalVisible = (isShow,val) => {
    setModalVisible(isShow);
    setEditData(val)
  };

  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  }

  const deleteUserGroup = async id => {
    try {
      await userGroupDelete(id);
      message.success("用户组删除成功");
    } catch (error) {
      message.error("删除失败!");
    }
    handleSearchReset();
  }
  const addUser =(isShow, val) => {
    setAddUserShow(isShow)
    setEditData(val);
  }

  const handleAssignVisible = (isShow,val) => {
    setAssignShow(isShow);
    setEditData(val);
  }

  const columns = [
    {
      dataIndex: "name",
      title: "用户组名称",
      align: "center",
    },
    {
      dataIndex: "description",
      title: "用户组描述",
      align: "center",
    },
    {
      dataIndex: "teamNames",
      title: '角色',
      align: "center",
      render: (val) =>(
        <span>{val.toString()}</span>
      )
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
      title: '操作',
      align: "center",
      render: (val) => (
        <>
          <a onClick={() => handleModalVisible(true,val)}>编辑</a>
          <Divider type="vertical"></Divider>
          <a onClick={() => handleAssignVisible(true,val)}>分配权限</a>

          <Divider type="vertical"></Divider>
          <Popconfirm
            title="是否删除该用户组"
            onConfirm={() => {
              deleteUserGroup(val.id);
            }}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical"></Divider>
          <a onClick={() => addUser(true,val)}>添加用户</a>
          <Divider type="vertical"></Divider>
          <Link to={`/system/user_group/view_member/${val.id}`}>查看用户</Link>
        </>
      )
    }

  ];
  return (
    <>
      <Card bordered={false}>
        <Button
          type="primary"
          style={{ marginBottom: 18, marginRight: 20 }}
          onClick={() => {
            handleModalVisible(true,{});
          }}
        >
          新增
        </Button>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={userGroupSearch}
          rowSelection={false}
        />
      </Card>
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearchReset}
          editData={editData}
        />
      ) : (
        ""
      )}
      {
        addUserShow ? (
          <AddUser
            modalVisible={addUserShow}
            handleModalVisible={addUser}
            handleSearch={handleSearchReset}
            editData={editData}
          />
        ) : ""
      }
      {
        assignShow? (
          <Assign
            modalVisible={assignShow}
            handleModalVisible={handleAssignVisible}
            handleSearch={handleSearchReset}
            editData={editData}
          />
        ): ""
      }

    </>
  );
};

export default UserGroup;
