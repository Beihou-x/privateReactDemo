import React, { useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, DatePicker, Select } from "antd";
import { EtcSearch } from "@/services/v1";
import { formatDate, formatTimestamp, filterCategory } from "@/utils/utils";
import moment from "moment";

const { RangePicker } = DatePicker;

const Etc = () => {
  const refTable = useRef(null);
  const sources = filterCategory("接入来源") || [];

  const columns = [
    {
      title: "采集站点编号",
      dataIndex: "station_no",
      width: 200,
      align: "center",
    },
    {
      title: "采集设备编号",
      dataIndex: "device_no",
      width: 200,
      align: "center",
    },
    {
      title: "ETC编号",
      dataIndex: "obu_id",
      width: 200,
      align: "center",
    },
    {
      title: "ETC厂商",
      dataIndex: "obu",
      width: 100,
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
      title: "车牌号",
      dataIndex: "license_plate",
      width: 200,
      align: "center",
    },
    {
      title: "车牌颜色",
      dataIndex: "color",
      width: 100,
      align: "center",
    },
    {
      title: "车牌类型",
      dataIndex: "plate_type",
      width: 100,
      align: "center",
    },
    {
      title: "用户类型",
      dataIndex: "usr_type",
      width: 100,
      align: "center",
    },
    {
      title: "ETC发行地",
      dataIndex: "operate",
      width: 150,
      align: "center",
    },
    {
      title: "采集频次",
      dataIndex: "times",
      width: 100,
      align: "center",
    },
    {
      title: "卡号",
      dataIndex: "card_no",
      width: 200,
      align: "center",
    },
    {
      title: "卡片类型",
      dataIndex: "card_type",
      width: 120,
      align: "center",
    },
    {
      title: "启用时间",
      dataIndex: "card_start",
      width: 200,
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.card_start, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "到期时间",
      dataIndex: "card_end",
      width: 200,
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.card_end, "YYYY-MM-DD HH:mm:ss")}
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
            label: "来源",
            name: "areacode",
            renderFormItem: () => <Select options={sources} />,
          },
          {
            label: "ETC编号",
            name: "obu_id",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "车牌号",
            name: "license_plate",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "采集时间",
            name: "capture_times",
            renderFormItem: () => <RangePicker format={dateFormat} showTime />,
          },
          {
            label: "采集设备编号",
            name: "device_no",
            renderFormItem: () => <Input autoComplete="off" />,
          },
        ]}
        onChange={() => {}}
      />
      <div style={{ marginTop: 18 }}></div>
      <StandardTable
        ref={refTable}
        columns={columns}
        rowSelection={false}
        
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
          const response = await EtcSearch({
            ...params,
            capture_times: date,
          });
          return response;
        }}
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

export default Etc;
