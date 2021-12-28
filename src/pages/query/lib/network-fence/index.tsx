import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, DatePicker, Tooltip } from "antd";
import { networkFenceSearch } from "@/services/v1";
import { formatTimestamp, formatDate } from "@/utils/utils";
import moment from "moment";

const { RangePicker } = DatePicker;

const NetworkFence = props => {
  const refTable: any = useRef(null);
  const [dates, setDates]: any = useState([]);
  const [hackValue, setHackValue]: any = useState([]);
  const [value, setValue]: any = useState([]);

  //日期选择不超过30天
  const disabledDate = current => {
    if (!dates || dates.length === 0) {
      return false;
    }
    const tooLate = dates[0] && current.diff(dates[0], "days") > 30;
    const tooEarly = dates[1] && dates[1].diff(current, "days") > 30;
    return tooEarly || tooLate;
  };

  const onOpenChange = open => {
    if (open) {
      setHackValue([]);
      setDates([]);
    } else {
      setHackValue(undefined);
    }
  };

  //搜索条件-采集时间范围校验
  const handleTime = (rules, value, callback) => {
    const days = value[1].diff(value[0], "day");
    // console.log("days--", days);
    if (days > 29) {
      return Promise.reject("时间选择范围不超过一个月");
    } else {
      return Promise.resolve();
    }
  };

  const columns = [
    {
      dataIndex: "network_id",
      title: "记录编号",
      align: "center",
    },
    {
      dataIndex: "device_id",
      title: "设备编号",
      align: "center",
    },
    {
      dataIndex: "request_id",
      title: "请求ID",
      align: "center",
    },
    {
      align: "center",
      dataIndex: "collect_time",
      title: "采集时间",
      render: (val, record) => (
        <span>
          {formatDate(record && record.collect_time, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      align: "center",
      dataIndex: "field_intensity",
      title: "场强",
    },
    {
      dataIndex: "mac_address",
      title: "终端MAC地址",
      align: "center",
    },
    {
      align: "center",
      dataIndex: "terminal_brand",
      title: "终端品牌",
    },
    {
      align: "center",
      dataIndex: "ssid",
      title: "接入热点SSID",
    },
    {
      align: "center",
      dataIndex: "ap_mac_address",
      title: "接入热点MAC地址",
    },
    {
      align: "center",
      dataIndex: "longitude",
      title: "经度",
    },
    {
      align: "center",
      dataIndex: "latitude",
      title: "纬度",
    },
  ];

  const dateFormat = "YYYY-MM-DD HH:mm";

  return (
    <Card bordered={false}>
      <SearchForm
        initialValues={{
          updated: [moment().startOf("day"), moment(new Date(), dateFormat)],
        }}
        formList={[
          {
            label: "设备编号",
            name: "device_id",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "采集时间",
            name: "updated",
            renderFormItem: () => (
              <RangePicker format={dateFormat} showTime allowClear={false} />
            ),
            formItemProps: {
              rules: [
                { required: true, message: "请输入采集时间" },
                { validator: handleTime },
              ],
            },
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
        services={async (params: any) => {
          const {
            updated = [
              moment(moment().startOf("day"), dateFormat),
              moment(new Date(), dateFormat),
            ],
          } = params;
          let date: any = null;
          if (updated && updated.length) {
            date = [formatTimestamp(updated[0]), formatTimestamp(updated[1])];
          }
          const response = await networkFenceSearch({
            ...params,
            updated: date,
          });
          return response;
        }}
        rowSelection={false}
        
      />
    </Card>
  );
};

export default NetworkFence;
