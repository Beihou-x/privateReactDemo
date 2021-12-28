import React, { useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, DatePicker } from "antd";
import { statusSearch } from "@/services/v1";
import { formatDate, formatTimestamp } from "@/utils/utils";
import moment from "moment";

const { RangePicker } = DatePicker;

const Status = () => {
  const refTable = useRef(null);
  const columns = [
    {
      title: "采集站点编号",
      dataIndex: "station_no",
      width: 200,
      align: "center",
    },
    {
      title: "采集设备编号",
      dataIndex: "dev_no",
      width: 200,
      align: "center",
    },
    {
      title: "采集时间",
      dataIndex: "capture_time",
      width: 200,
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.capture_time, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "经度",
      dataIndex: "longitude",
      width: 200,
      align: "center",
    },
    {
      title: "纬度",
      dataIndex: "latitude",
      width: 200,
      align: "center",
    },
    {
      title: "网络流量",
      dataIndex: "netflow",
      width: 200,
      align: "center",
    },
    {
      title: "CPU负荷",
      dataIndex: "cpuload",
      width: 200,
      align: "center",
    },
    {
      title: "系统运行时间(分钟)",
      dataIndex: "runtime",
      width: 200,
      align: "center",
    },
    {
      title: "功率",
      dataIndex: "power",
      width: 200,
      align: "center",
    },
    {
      title: "工作信道",
      dataIndex: "chl",
      width: 200,
      align: "center",
    },
    {
      title: "车道数",
      dataIndex: "track",
      width: 200,
      align: "center",
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
            name: "dev_no",
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
          const response = await statusSearch({
            ...params,
            capture_times: date,
          });
          return response;
        }}
        rowSelection={false}
        
        tableProps={{
          tableLayout: "fixed",
          scroll: {
            x: "auto",
          },
        }}
      />
    </Card>
  );
};

export default Status;
