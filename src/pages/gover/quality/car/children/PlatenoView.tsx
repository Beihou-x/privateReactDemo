import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col } from "antd";
import { QualitySearch, TotalSearch } from "@/services/v1";

const { Option } = Select;

const PlatenoView = props => {
  const refTable: any = useRef(null);

  const columns = [
    {
      dataIndex: "alias",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "id",
      title: "设备ID",
      align: "center",
    },
    {
      dataIndex: "through_total",
      title: "过车数据量",
      align: "center",
    },
    {
      dataIndex: "day_rate",
      title: "白天识别率",
      align: "center",
    },
    {
      dataIndex: "night_total",
      title: "夜间过车总量",
      align: "center",
    },
    {
      dataIndex: "night_rate",
      title: "夜间识别率",
      align: "center",
    },
    {
      dataIndex: "avg_rate",
      title: "平均识别率",
      align: "center",
    },
    {
      dataIndex: "sudden_drop_rate",
      title: "昼夜识别率突降量",
      align: "center",
    },
    {
      dataIndex: "message",
      title: "异常类型",
      align: "center",
    },
  ];

  return (
    <>
      {/* <Card bordered={false} style={{ marginBottom: 10 }}>
      </Card> */}
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "组织区域",
              name: "place_code",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "卡口名称",
              name: "alias",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "卡口编码",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "平均识别率",
              name: "avg_rate",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "识别率突变量",
              name: "sudden_drop_rate",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "监测结果",
              name: "status",
              renderFormItem: () => (
                <Select>
                  <Option value="0">异常</Option>
                  <Option value="1">正常</Option>
                </Select>
              ),
            },
            {
              label: "设备类型",
              name: "function_type",
              renderFormItem: () => (
                <Select>
                  <Option value="01">车辆卡口</Option>
                  <Option value="02">人像卡口</Option>
                  <Option value="25">超级卡口</Option>
                </Select>
              ),
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
        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={() =>
            QualitySearch({ name: "motorvehicle", type: "plateno_view" })
          }
          rowSelection={false}
          
        />
      </Card>
    </>
  );
};

export default PlatenoView;
