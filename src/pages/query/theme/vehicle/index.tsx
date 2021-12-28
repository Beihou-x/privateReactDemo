import React from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Card, Input, Select } from "antd";
import { MotorvehicleSearch } from "@/services/v1";
import { filterCategory } from "@/utils/utils";

const VehicleFiles = () => {
  const place = filterCategory("接入来源") || [];
  const columns = [
    {
      title: "请求ID",
      dataIndex: ["RequestID"],
    },
    {
      title: "图片ID",
      dataIndex: ["ImageUID"],
    },
    {
      title: "车牌号",
      dataIndex: ["PlateNo"],
    },
  ];
  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          // {
          //   label: "区域",
          //   name: "Place",
          //   renderFormItem: () => <Select allowClear options={place} />,
          // },
          {
            label: "请求ID",
            name: "RequestID",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "图片ID",
            name: "ImageUID",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "车牌号",
            name: "PlateNo",
            renderFormItem: () => <Input autoComplete="off" />,
          },
        ]}
        onChange={() => {}}
      />
      <StandardTable
        rowSelection={false}
        columns={columns}
        services={MotorvehicleSearch}
        
      />
    </Card>
  );
};

export default VehicleFiles;
