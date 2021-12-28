import React from "react";
import { Card, Button } from "antd";
import StandardTable from "@components/Table";
import { operateRecordSearch } from "@/services/v2";
import { useHistory } from "react-router-dom";

import { formatDate } from "@/utils/utils";

const ApprovalRecord = (props) => {
  const history = useHistory();
  const { match: { params: { id } }, } = props;

  const columns = [
    {
      title: "操作时间",
      dataIndex: "created_at",
      align: 'center',
      render: val => val ? formatDate(val, 'YYYY-MM-DD HH:mm:ss') : '-'
    },
    
    {
      title: "操作人",
      dataIndex: "user_name",
      align: 'center',
    },
    {
      title: "操作内容",
      dataIndex: "objectname",
      align: 'center',
    },

  ];

  return (
    <Card>
      <StandardTable
        columns={columns}
        services={(params: any) => {
          const { created_ats } = params
          let arr = created_ats ? [created_ats[0].unix(), created_ats[1].unix()] : []
          if (created_ats) {
            return operateRecordSearch({ ...params, action: `/update/access_request/status/${id}`, created_ats: arr });
          } else {
            return operateRecordSearch({ ...params, action: `/update/access_request/status/${id}` });
          }
        }}
        rowSelection={false}
      />
      <div style={{ textAlign: "right", marginTop: 20 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default ApprovalRecord;