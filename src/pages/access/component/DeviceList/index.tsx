import React from "react";
import { Select, Button, Input } from "antd";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { accessDeviceSearch } from "@/services/v1";
import { accessApplyDownloadDeviceInfo } from "@/services/v2";
import { formatDate, filterCategory } from "@/utils/utils";
import DownloadTemplate from "@/components/DownloadTemplate";

const DeviceList = (props) => {
  const { page, id } = props;
  const sources = filterCategory("接入来源") || [];
  const types = filterCategory("摄像机功能类型") || [];
  const c1 =
    page === "check"
      ? [
          {
            title: "检查结果",
            dataIndex: "source",
            width: 100,
            ellipsis: true,
          },
        ]
      : [];
  const columns = [
    {
      title: "接入来源",
      dataIndex: "source",
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备类型",
      dataIndex: "function_type",
      width: 100,
      ellipsis: true,
    },
    {
      title: "所属辖区公安机关",
      dataIndex: "jurisdiction",
      width: 100,
      ellipsis: true,
    },
    {
      title: "点位俗称",
      dataIndex: "alias",
      width: 200,
      ellipsis: true,
    },
    {
      title: "设备编号",
      dataIndex: ["device_id"],
      width: 100,
      ellipsis: true,
    },
    {
      title: "经度",
      dataIndex: "longitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      width: 80,
      ellipsis: true,
    },
    {
      title: "安装地点行政区划代码",
      dataIndex: "place_code",
      width: 200,
      ellipsis: true,
    },
    {
      title: "IPV4",
      dataIndex: "ipv4",
      width: 100,
      ellipsis: true,
    },
    {
      title: "IPV6",
      dataIndex: "ipv6",
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备端口",
      dataIndex: ["port"],
      width: 100,
      ellipsis: true,
    },
    {
      title: "制造商名称",
      dataIndex: "manufactor",
      width: 100,
      ellipsis: true,
    },
    {
      title: "设备型号",
      dataIndex: "model",
      width: 100,
      ellipsis: true,
    },
    {
      title: "是否收到数据",
      dataIndex: "get_data",
      width: 150,
      ellipsis: true,
    },
    ...c1,
  ];

  return (
    <>
      <SearchForm
        formList={[
          {
            label: "设备编码",
            name: "device_id",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          // {
          //   label: "接入来源",
          //   name: "source",
          //   renderFormItem: () => <Select allowClear options={sources} />,
          // },
          {
            label: "设备类型",
            name: "function_type",
            renderFormItem: () => <Select allowClear options={types} />,
          },
        ]}
        onChange={() => {}}
      />
      <DownloadTemplate type="link" services={() => accessApplyDownloadDeviceInfo({access_id: id})}>
        下载设备信息
      </DownloadTemplate>
      <StandardTable
        size="small"
        columns={columns}
        services={async (params) => {
          const response = await accessDeviceSearch({
            ...params,
            access_id: id,
          });
          if (response) {
            return response;
          } else {
            return {};
          }
        }}
        rowSelection={false}
        tableProps={{
          tableLayout: "fixed",
          scroll: {
            x: "auto",
          },
        }}
      />
    </>
  );
};

export default DeviceList;
