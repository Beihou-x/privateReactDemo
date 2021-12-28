import React from "react";
import { Card, Button } from "antd";
import { useHistory } from "react-router-dom";
import StandardTable from "@components/Table";
import { accessLog } from "@/services/v2";

import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";

const SubmitList = (props) => {
  // const { page, id } = props;
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const status = filterCategory("申请状态") || [];
  const history = useHistory();
  
  const userInfo = JSON.parse(localStorage.getItem("userInfo")||'');
  const columns = [
    {
      title: "操作时间",
      dataIndex: "created_at",
      align:'center',
      render: val => val ? formatDate(val, 'YYYY-MM-DD HH:mm:ss') : '-'
    },
    
    {
      title: "操作人",
      dataIndex: "user_name",
      align:'center',
    },
    {
      title: "操作内容",
      dataIndex: "action",
      align:'center',
    },
  
  ];

  return (
    <Card bordered={false}>
      <StandardTable
        columns={columns}
        services={(params:any) => {
          return accessLog(userInfo&&userInfo.user_id,id,params)
        }}
        rowSelection={false}
      />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default SubmitList;
