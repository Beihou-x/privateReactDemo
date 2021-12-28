import React, { useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, DatePicker, Select } from "antd";
import { ownerSearch } from "@/services/v1";
import { formatDate, formatTimestamp } from "@/utils/utils";
import moment from "moment";

const { RangePicker } = DatePicker;

const Owner = () => {
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
      title: "ETC编号",
      dataIndex: "obu_id",
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
    {
      title: "车牌号",
      dataIndex: "license_plate",
      align: "center",
    },
    {
      title: "持卡人姓名",
      dataIndex: "usr_name",
      align: "center",
    },
    {
      title: "持卡人证件号码",
      dataIndex: "usr_cardno",
      align: "center",
    },
    {
      title: "证件类型",
      dataIndex: "card_type",
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
            name: "device_no",
            renderFormItem: () => <Input autoComplete="off" />,
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
            label: "持卡人姓名",
            name: "usr_name",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "持卡人证件号码",
            name: "usr_cardno",
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
        // services={params =>
        //   ownerSearch({
        //     ...params,
        //     capture_times: [
        //       formatTimestamp(capture_times[0]),
        //       formatTimestamp(capture_times[1]),
        //     ],
        //   })
        // }
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
          const response = await ownerSearch({
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

export default Owner;
