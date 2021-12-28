import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Input,
  Select,
  Card,
  Row,
  Col,
  Form,
  InputNumber,
  DatePicker,
} from "antd";
import { listSearch, TopDataSearch } from "@/services/v1";
import {
  filterCategory,
  toSmallNumStr,
  formatStartData,
  formatEndData,
} from "@/utils/utils";
import moment from "moment";
import CheckDate from "../../component/todayAndYesterday";

const PicView = () => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);

  const deviceType = filterCategory("摄像机功能类型") || [];
  const area = filterCategory("版块") || [];
  useEffect(() => {
    getData();
  }, []);

  const getData = (params: any = {}) => {
    TopDataSearch({
      type: "pic_req",
      from: moment().startOf("day").unix().toString(),
      to: moment().endOf("day").unix().toString(),
      ...params,
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
      dataIndex: "total1",
      title: "抽检数据量",
      align: "center",
    },
    {
      dataIndex: "rec",
      title: "抽检数据异常量(异常占比)",
      align: "center",
      render: (record, val) => (
        <span>{Number(val && val.rec * 100).toFixed()}%</span>
      ),
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
              label: "小图异常率",
              // name: "simple_small_rate",
              renderFormItem: () => (
                <div className="inputRange">
                  <Input.Group>
                    <Form.Item name={["simple_small_rate", "min"]}>
                      <InputNumber
                        style={{ width: 80, textAlign: "center" }}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value: any) => value.replace("%", "")}
                      />
                    </Form.Item>
                    <Input
                      className="site-input-split"
                      style={{
                        width: 30,
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: "none",
                      }}
                      placeholder="~"
                      disabled
                    />
                    <Form.Item name={["simple_small_rate", "max"]}>
                      <InputNumber
                        className="site-input-right"
                        style={{
                          width: 80,
                          textAlign: "center",
                        }}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value: any) => value.replace("%", "")}
                      />
                    </Form.Item>
                  </Input.Group>
                </div>
              ),
            },
            {
              label: "大图异常率",
              // name: "simple_big_rate",
              renderFormItem: () => (
                <div className="inputRange">
                  <Input.Group>
                    <Form.Item name={["simple_big_rate", "min"]}>
                      <InputNumber
                        style={{ width: 80, textAlign: "center" }}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value: any) => value.replace("%", "")}
                      />
                    </Form.Item>
                    <Input
                      className="site-input-split"
                      style={{
                        width: 30,
                        borderLeft: 0,
                        borderRight: 0,
                        pointerEvents: "none",
                      }}
                      placeholder="~"
                      disabled
                    />
                    <Form.Item name={["simple_big_rate", "max"]}>
                      <InputNumber
                        className="site-input-right"
                        style={{
                          width: 80,
                          textAlign: "center",
                        }}
                        min={0}
                        max={100}
                        formatter={(value) => `${value}%`}
                        parser={(value: any) => value.replace("%", "")}
                      />
                    </Form.Item>
                  </Input.Group>
                </div>
              ),
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
          subscribeName="facePicView"
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
            const { simple_small_rate, simple_big_rate, time } = params;
            let big: any =
              simple_big_rate && simple_big_rate.max
                ? [
                    toSmallNumStr(simple_big_rate.min),
                    toSmallNumStr(simple_big_rate.max),
                  ]
                : undefined;
            let small: any =
              simple_small_rate && simple_small_rate.max
                ? [
                    toSmallNumStr(simple_small_rate.min),
                    toSmallNumStr(simple_small_rate.max),
                  ]
                : undefined;

            if (time) {
              const start = time.startOf("day").format("X");
              const end = time.endOf("day").format("X");
              return listSearch({
                ...params,
                type: "pic_req",
                simple_small_rate: big,
                simple_big_rate: small,
                from: moment().startOf("day").unix().toString(),
                to: moment().endOf("day").unix().toString(),
                start,end,time:undefined
              });
            }
            return listSearch({
              ...params,
              type: "pic_req",
              simple_small_rate: big,
              simple_big_rate: small,
              from: moment().startOf("day").unix().toString(),
              to: moment().endOf("day").unix().toString(),
            });
          }}
          rowSelection={false}
          subscribeName="facePicView"
        />
      </Card>
    </>
  );
};

export default PicView;
