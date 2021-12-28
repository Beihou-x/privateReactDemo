import React, { useRef, useState, useEffect } from "react";
import StandardTable from "@components/Table";
import { operateRecordSearch } from "@/services/v2";
import { formatDate } from "@/utils/utils";
import { Input, DatePicker, Card } from "antd";
import SearchForm from "@components/SearchForm";
const { RangePicker } = DatePicker;
const LoginRecord = () => {
  const columns = [
    {
      title: "用户名称",
      dataIndex: "user_name",
      align: "center",
    },
    // {
    //   title: "操作内容",
    //   dataIndex: "action",
    //   align: "center",
    // },
    {
      title: "登录时间",
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
              label: "发生时间",
              name: "created_ats",
              renderFormItem: () => <RangePicker showTime></RangePicker>,
            },
          ]}
          onChange={() => {}}
        />
        <StandardTable
          columns={columns}
          services={(params:any) => {
            const {created_ats} = params
            let arr = created_ats ? [created_ats[0].unix(),created_ats[1].unix()] : []
            if(created_ats) {
              return operateRecordSearch({ ...params,action: 'login',created_ats: arr});
            }else {
              return operateRecordSearch({...params,action: 'login'});
            }
          }}
          rowSelection={false}
        />
      </Card>
    </>
  );
};

export default LoginRecord;
