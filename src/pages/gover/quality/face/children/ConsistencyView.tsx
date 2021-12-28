import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, DatePicker, Row, Col } from "antd";
import { listSearch, TopDataSearch } from "@/services/v1";
import moment from "moment";
import { formatDate, filterCategory, formatEndData, formatStartData } from "@/utils/utils";
import CheckDate from "../../component/todayAndYesterday";

const ConsistencyView = (props) => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);
  const deviceType = filterCategory("摄像机功能类型") || [];
  const area = filterCategory("区域") || [];


  const getTotal = async (params: any = {}) => {
    TopDataSearch({
      ...params
    }).then((res) => {
      if (res) {
        const list = res.map((item) => {
          if (typeof item.value === "string") {
            return {
              name: item.name,
              value: Number(item.value * 100).toFixed() + "%",
            };
          } else {
            return item;
          }
        });
        setData(list);
      }
    });
  };

  const columns = [
    {
      dataIndex: "name",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "id",
      title: "国标ID",
      align: "center",
    },
    {
      dataIndex: "source",
      title: "区域",
      align: "center"
    },
    {
      dataIndex: "total",
      title: "抓拍量",
      align: "center",
    },
    {
      dataIndex: "status",
      title: "上传状态",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "request_at",
      title: "最近上传时间",
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.request_at, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
  ];

  // 设备状态
  const status = [
    {
      label: '已上传',
      value: '已上传',
    },
    {
      label: '未上传',
      value: '未上传',
    }
  ]

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(data || []).map((item, index) => (
            <Col span={4} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>{item.value}</span>
            </Col>
          ))}
        </Row>
      </Card>
      <Card bordered={false}>
        <SearchForm
          initialValues={{
            upload_at_date: moment()
          }}
          formList={[
            {
              label: "区域",
              name: "place_code",
              renderFormItem: () => <Select options={area}></Select>,
            },
            {
              label: "上传状态",
              name: "status",
              renderFormItem: () => (
                <Select options={status}>
                </Select>
              ),
            },
            {
              label: "设备类型",
              name: "function_type",
              renderFormItem: () => <Select options={deviceType.map(m => { return { label: m.name, value: m.name } })}></Select>,
            },
            {
              label: "最近上传时间",
              name: "upload_at_date",
              renderFormItem: () => <DatePicker allowClear={false} />,
            },
          ]}
          onChange={() => { }}
          subscribeName="faceConsistency"
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
          services={(params: any) => {
            const { upload_at_date = moment(), ...others } = params
            let upload_at: any = upload_at_date ? [upload_at_date.startOf("day").unix().toString(), upload_at_date.endOf("day").unix().toString()] : undefined;
            const obj = {
              ...others,
              type: "consistence",
              upload_at,
              from: moment().startOf("day").unix().toString(),
              to: moment().endOf("day").unix().toString(),
            }
            getTotal(obj)
            return listSearch(obj);
          }}
          rowSelection={false}
          subscribeName="faceConsistency"
        />
      </Card>
    </>
  );
};

export default ConsistencyView;
