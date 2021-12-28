import React from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Card, Input, Select } from "antd";
import { personnelFilesSearch } from "@/services/v1";
import { filterCategory } from "@/utils/utils";

const PersonnelFiles = () => {
  const place = filterCategory("接入来源") || [];
  const columns = [
    {
      title: "请求ID",
      dataIndex: "RequestID",
    },
    {
      title: "图片ID",
      dataIndex: "ImageUID",
    },
    {
      title: "证件种类",
      dataIndex: "IDType",
    },
    {
      title: "证件号码",
      dataIndex: "PersonNumber",
    },
  ];
  return (
    <Card bordered={false}>
      <SearchForm
        formList={[
          // {
          //   label: "区域",
          //   name: "PlaceCode",
          //   renderFormItem: () => <Select allowClear options={place} />,
          // },
          {
            label: "证件号码",
            name: "PersonNumber",
            renderFormItem: () => <Input autoComplete="off" />,
          },
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
        ]}
        onChange={() => {}}
      />
      <StandardTable
        rowSelection={false}
        columns={columns}
        services={personnelFilesSearch}
        
      />
    </Card>
  );
};

export default PersonnelFiles;
