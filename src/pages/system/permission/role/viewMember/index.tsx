import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Select, Button, Divider, Popconfirm } from "antd";
import { useHistory } from "react-router-dom";

import SearchForm from "@components/SearchForm";
import { roleMemberSearch, removeRoleMember } from "@/services/v1";
// import AddMumber from "./addMumber";

const ViewMember = (props) => {
  const id = props.match.params.id;
  const refTable: any = useRef(null);
  const history = useHistory();


  const removeMember = (id) => {
    removeRoleMember(id);
    refTable.current.handleSearch()
  };

  const columns = [
    {
      dataIndex: ["user","display_name"],
      title: "用户名称",
      align: "center",
    },
    {
      dataIndex: ["user","name"],
      title: "用户账号",
      align: "center",
    },
    {
      dataIndex: "user_info",
      title: "用户身份信息",
      align: "center",
    },
    {
      dataIndex: ["team","name"],
      title: "角色",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <div>
          <Popconfirm
            title="是否移除该用户"
            onConfirm={() => removeMember(val.id)}
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
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params) => roleMemberSearch({...params, team_id: id })}
          rowSelection={false}
          tableProps={{}}
        />
        <div style={{ background: "#2B3748", textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>取消</Button>
        </div>
      </Card>
    </>
  );
};

export default ViewMember;
