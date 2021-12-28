import React, { useRef, useState, useEffect } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Select, Button, Divider, Popconfirm,Table } from "antd";
import { useHistory } from "react-router-dom";

import SearchForm from "@components/SearchForm";
import { userInUserGroup,userGroupUserDelete } from "@/services/v2";
// import AddMumber from "./addMumber";

const ViewMember = (props) => {
  const id = props.match.params.id;
  const refTable: any = useRef(null);
  const history = useHistory();

  const [tableData, setTableData]:any = useState([]);
  useEffect(() => {
    getTableData()
  },[])

  const getTableData = () => {
    userInUserGroup(id).then(res => {
      setTableData(Array.isArray(res) ? res : [])
    })
  }

  const removeMember = (id) => {
    userGroupUserDelete({ids: [id]}).then(res => {
      if(res) {
        getTableData();
      }
    });
    // refTable.current.handleSearch()
  };

  const columns:any = [
    {
      dataIndex: ["name"],
      title: "用户名称",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <div>
          <Popconfirm
            title="是否移除该用户"
            onConfirm={() => removeMember(val.user_group_id)}
          >
            <a>移除</a>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        {/* <SearchForm
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
        /> */}
        {/* <StandardTable
          ref={refTable}
          columns={columns}
          services={(params) => userInUserGroup(id)}
          rowSelection={false}
          tableProps={{}}
        /> */}
        <Table 
          bordered={true}
          columns={columns}
          dataSource={tableData}
          />
        <div style={{ background: "#2B3748", textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>返回</Button>
        </div>
      </Card>
    </>
  );
};

export default ViewMember;
