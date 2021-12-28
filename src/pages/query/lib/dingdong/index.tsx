import React, { useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Card } from "antd";
import { networkFenceSearch } from "@/services/v1";

const DingDong = props => {
  const refTable: any = useRef(null);

  const columns = [
    {
      dataIndex: "network_id",
      title: "记录编号",
      align: "center",
    },
    {
      dataIndex: "name",
      title: "会员名称",
      align: "center",
    },
    {
      dataIndex: "request_id",
      title: "手机号",
      align: "center",
    },
    {
      align: "center",
      dataIndex: "collect_time",
      title: "金额",
    },
    {
      align: "center",
      dataIndex: "field_intensity",
      title: "下单时间",
    },
    {
      dataIndex: "mac_address",
      title: "下单地址",
      align: "center",
    },
  ];

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "手机号",
              name: "device_id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "会员名称",
              name: "mac_address",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "下单时间",
              name: "ssid",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "金额",
              name: "ap_mac_address",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => {}}
        />
        {/* <DownLoadFile
          services={() => {
            return accessExports({
              name: 'access_request'
            })
          }}
        >
          导出
        </DownLoadFile> */}
        <StandardTable
          ref={refTable}
          columns={columns}
          //   services={networkFenceSearch}
          rowSelection={false}
          
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default DingDong;
