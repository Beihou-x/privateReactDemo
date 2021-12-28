import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col, Form, InputNumber,DatePicker} from "antd";
import moment from 'moment'
import {
  checkpointCarUnusualHead,
  checkpointCarUnusualList,
} from "@/services/v2";
import {
  format,
  formatStartData,
  formatEndData,
  getIsEndWith,
  filterCategory,
  toSmallNumStr,
} from "@/utils/utils";
import CheckDate from "../../component/todayAndYesterday";

const { Option } = Select;

const PicView = (props) => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);
  const area = filterCategory("版块") || [];
  const deviceType = filterCategory("摄像机功能类型") || [];
  useEffect(() => {
    getData();
  }, []);

  const getData = async (params: any = {}) => {
    checkpointCarUnusualHead({
      ...params,
      type: "pic_req",
    }).then((res) => {
      if (res) {
        setData(res);
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
      title: "设备编码",
      align: "center",
    },
    {
      dataIndex: "total",
      title: "过车数据量",
      align: "center",
    },
    {
      dataIndex: "total1",
      title: "抽检数据量",
      align: "center",
    },
    {
      dataIndex: "rec",
      title: "图片访问异常占比",
      align: "center",
      render: (val) => <span>{format(val)}%</span>,
    },
    {
      dataIndex: "total3",
      title: "抽大图异常量",
      align: "center",
    },
    {
      dataIndex: "rec1",
      title: "抽大图异常率",
      align: "center",
      render: (val) => <span>{format(val)}%</span>,
    },
    {
      dataIndex: "total4",
      title: "抽小图异常量",
      align: "center",
    },
    {
      dataIndex: "rec2",
      title: "抽小图异常率",
      align: "center",
      render: (val) => <span>{format(val)}%</span>,
    },
  ];

  const handleSearch = params => {
    if(params.time) {
      let start = params.time.startOf('day').format('X');
      let end = params.time.endOf('day').format('X');
      getData({ start, end })
    }
  }

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(data || []).map((item, index) => (
            <Col span={4} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>
                {getIsEndWith(item.name, "占比")
                  ? format(item.value) + "%"
                  : item.value}
              </span>
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
              label: "设备名称",
              name: "alias",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "设备编码",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "图片访问异常率",
              // name: "pic_req_abnormal_rate",
              renderFormItem: () => (
                <div className="inputRange">
                  <Input.Group>
                    <Form.Item name={["pic_req_abnormal_rate", "min"]}>
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
                    <Form.Item name={["pic_req_abnormal_rate", "max"]}>
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
              renderFormItem:(props,keys) => (<DatePicker defaultValue={moment()} />)
              } 
          ]}
          onChange={(params) => handleSearch(params)}
          subscribeName="carPic"
        />
        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params: any) => {
            const {
              pic_req_abnormal_rate,
              simple_big_rate,
              simple_small_rate,
              time
            } = params;
            let pic: any =
              pic_req_abnormal_rate && pic_req_abnormal_rate.max
                ? [
                    toSmallNumStr(pic_req_abnormal_rate.min),
                    toSmallNumStr(pic_req_abnormal_rate.max),
                  ]
                : undefined;
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

                if(time) {
                  const start = time.startOf('day').format('X');
                  const end = time.endOf('day').format('X');
                  return checkpointCarUnusualList({
                    ...params,
                    pic_req_abnormal_rate: pic,
                    simple_big_rate: big,
                    simple_small_rate: small,
                    type: "pic_req",
                    start,end, time: undefined
                  });
                }
            return checkpointCarUnusualList({
              ...params,
              pic_req_abnormal_rate: pic,
              simple_big_rate: big,
              simple_small_rate: small,
              type: "pic_req",
            });
          }}
          rowSelection={false}
          subscribeName="carPic"
        />
      </Card>
    </>
  );
};

export default PicView;
