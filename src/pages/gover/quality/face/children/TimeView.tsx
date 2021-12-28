import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col, Form, DatePicker } from "antd";
import { listSearch, TopDataSearch } from "@/services/v1";
import { filterCategory,toSmallNumStr,formatStartData,formatEndData } from "@/utils/utils";
import CheckDate from "../../component/todayAndYesterday";

import styles from "./index.less";
import moment from "moment";

const { Option } = Select;

const PicView = (props) => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);
  const deviceType = filterCategory("摄像机功能类型") || [];
  const area = filterCategory("版块") || [];

  useEffect(() => {
    getData();
  }, []);

  const getData = async (params:any={}) => {
    TopDataSearch({
      type: "timeliness",
      from: moment().startOf("day").unix().toString(),
      to: moment().endOf("day").unix().toString(),
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
  const handleSearch = params => {
    if(params.time) {
      let from = params.time.startOf("day").unix().toString()
      let to = params.time.endOf("day").unix().toString()
      getData({ from, to });
    }
  }

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
      dataIndex: "total",
      title: "抓拍数据量",
      align: "center",
    },
    {
      dataIndex: "total2",
      title: "是否延迟",
      align: "center",
    },
    {
      dataIndex: "total3",
      title: "是否倒挂",
      align: "center",
    },
  ];

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        {/* <CheckDate radioChange={radioChange} /> */}
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
          formList={[
            {
              label: "组织区域",
              name: "place_code",
              renderFormItem: () => <Select options={area}></Select>,
            },
            {
              label: "设备类型",
              name: "function_type",
              renderFormItem: () => <Select options={deviceType}></Select>,
            },
            {
              label: "时间",
              name: "time",
              renderFormItem: (props, keys) => (
                <DatePicker defaultValue={moment()} />
              ),
            },
          ]}
          onChange={(params) => handleSearch(params)}
          subscribeName="faceTime"
        />
        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params: any) => {
            const {delay_rate,drop_away_rate,time} = params;
            let delay:any = delay_rate && delay_rate.max ? [toSmallNumStr(delay_rate.min),toSmallNumStr(delay_rate.max)] : undefined;
            let drop:any = drop_away_rate && drop_away_rate.max ? [toSmallNumStr(drop_away_rate.min),toSmallNumStr(drop_away_rate.max)] : undefined;
            if(time) {
              const start = time.startOf("day").format("X");
              const end = time.endOf("day").format("X");
              return listSearch({
                ...params,
                type: "timeliness",
                from: moment().startOf("day").unix().toString(),
                to: moment().endOf("day").unix().toString(),
                start,end, time: undefined
              });
            }
            return listSearch({
              ...params,
              type: "timeliness",
              from: moment().startOf("day").unix().toString(),
              to: moment().endOf("day").unix().toString(),
            });
          }}
          rowSelection={false}
          subscribeName="faceTime"
        />
      </Card>
    </>
  );
};

export default PicView;
