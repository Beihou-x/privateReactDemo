import React, { useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, DatePicker } from "antd";
import { blueToothSearch } from "@/services/v1";
import { formatDate, formatTimestamp } from "@/utils/utils";
import moment from "moment";

const { RangePicker } = DatePicker;

const BlueTooth = () => {
  const refTable = useRef(null);
  const columns = [
    {
      title: "采集站点编号",
      dataIndex: "station_no",
      align: "center",
    },
    {
      title: "采集设备编号",
      dataIndex: "device_no",
      align: "center",
    },
    {
      title: "终端蓝牙MAC地址",
      dataIndex: "usr_mac",
      align: "center",
    },
    {
      title: "蓝牙类型",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "蓝牙名称",
      dataIndex: "ble_ssid",
      align: "center",
    },
    {
      title: "蓝牙场强",
      dataIndex: "strength",
      align: "center",
    },
    {
      title: "采集时间",
      dataIndex: "capture_time",
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.capture_time, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
  ];

  const dateFormat = "YYYY-MM-DD HH:mm";

  return (
    <Card bordered={false}>
      <SearchForm
        initialValues={{
          capture_times: [
            moment().startOf("day"),
            moment(new Date(), dateFormat),
          ],
        }}
        formList={[
          {
            label: "采集站点编号",
            name: "station_no",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "采集设备编号",
            name: "device_no",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "蓝牙名称",
            name: "ble_ssid",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "采集时间",
            name: "capture_times",
            renderFormItem: () => <RangePicker format={dateFormat} showTime />,
          },
        ]}
        onChange={() => {}}
      />
      <StandardTable
        ref={refTable}
        columns={columns}
        services={async (params: any) => {
          const {
            capture_times = [
              moment(moment().startOf("day"), dateFormat),
              moment(new Date(), dateFormat),
            ],
          } = params;
          let date: any = null;
          if (capture_times && capture_times.length) {
            date = [
              formatTimestamp(capture_times[0]),
              formatTimestamp(capture_times[1]),
            ];
          }
          const response = await blueToothSearch({
            ...params,
            capture_times: date,
          });
          return response;
        }}
        rowSelection={false}
        
      />
    </Card>
  );
};

export default BlueTooth;
