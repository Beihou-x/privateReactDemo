import React, { useRef, useState, useEffect } from "react";
import moment from "moment";
import StandardTable from "@components/Table";
import { operateRecordSearch } from "@/services/v2";
import { formatDate } from "@/utils/utils";
import { Input, DatePicker, Card,Button } from "antd";
import SearchForm from "@components/SearchForm";
import { useHistory } from 'react-router-dom';
const { RangePicker } = DatePicker;
const LoginRecord = (props) => {

  const {match:{params:{id}}} = props;

  const history = useHistory();

  const columns = [
    {
      title: "用户名称",
      dataIndex: "user_name",
      align: "center",
    },
    {
      title: "操作内容",
      dataIndex: "action",
      align: "center",
    },
    {
      title: "操作时间",
      dataIndex: "created_at",
      align: "center",
      render: (val) => formatDate(val, "YYYY-MM-DD HH:mm:ss"),
    },
  ];


  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "操作时间",
              name: "created_ats",
              renderFormItem: () => <RangePicker defaultValue={[moment(new Date().getTime() - 24*3600*1000),moment(new Date(), "YYYY-MM-DD")]} showTime></RangePicker>,
            },
          ]}
          onChange={() => {}}
        />
        <StandardTable
          columns={columns}
          services={(params:any) => {
            const {created_ats} = params
            let arr = created_ats ? [created_ats[0].unix(),created_ats[1].unix()] : [moment().startOf("day").unix(),moment().endOf("day").unix()]
            
            return operateRecordSearch({ ...params,action: `access_device/${id}`,created_ats: arr});
          }}
          rowSelection={false}
        />
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()} type="primary">
            返回
          </Button>
        </div>
      </Card>
    </>
  );
};

export default LoginRecord;
