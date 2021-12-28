import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col, Form, InputNumber } from "antd";
import { listSearch, TopDataSearch } from "@/services/v1";
import { filterCategory, toSmallNumStr,formatStartData,formatEndData } from "@/utils/utils";
import moment from "moment";
import CheckDate from "../../component/todayAndYesterday";


const { Option } = Select;

const PicQualityView = () => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);

  const deviceType = filterCategory("摄像机功能类型") || [];
  const area = filterCategory("版块") || [];
  useEffect(() => {
    getData();
  }, []);

  const getData = (params:any ={}) => {
    TopDataSearch({
      type: "pic_quality",
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
      title: "建模失败数据量",
      align: "center",
    },
    {
      dataIndex: "rec",
      title: "建模失败率",
      align: "center",
      render: (record, val) => (
        <span>{Number(val && val.rec * 100).toFixed()}%</span>
      ),
    },
    // {
    //   dataIndex: "simple_big_total",
    //   title: "低评分数据量",
    //   align: "center",
    // },
    // {
    //   dataIndex: "low_score_rate",
    //   title: "低评分数据占比",
    //   align: "center",
    // },
    // {
    //   title: "操作",
    //   align: "center",
    //   render: (record, val) => <a>人脸查询</a>,
    // },
  ];

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
          formList={[
            {
              label: "组织区域",
              name: "place_code",
              renderFormItem: () => <Select options={area}></Select>,
            },
            {
              label: "建模失败率",
              // name: "modeling_failed_rate",
              renderFormItem: () => (
                <div className="inputRange">
                  <Input.Group>
                    <Form.Item name={["modeling_failed_rate", "min"]}>
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
                    <Form.Item name={["modeling_failed_rate", "max"]}>
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
              label: "低评分数据占比",
              // name: "low_score_rate",
              renderFormItem: () => (
                <div className="inputRange">
                  <Input.Group>
                    <Form.Item name={["low_score_rate", "min"]}>
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
                    <Form.Item name={["low_score_rate", "max"]}>
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
          ]}
          onChange={(params) => handleSearch(params)}
          subscribeName="facePicQuality"
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
            const { modeling_failed_rate, low_score_rate } = params;
            let model: any =
              modeling_failed_rate && modeling_failed_rate.max
                ? [
                    toSmallNumStr(modeling_failed_rate.min),
                    toSmallNumStr(modeling_failed_rate.max),
                  ]
                : undefined;
            let low: any =
              low_score_rate && low_score_rate.max
                ? [
                    toSmallNumStr(low_score_rate.min),
                    toSmallNumStr(low_score_rate.max),
                  ]
                : undefined;
            return listSearch({
              ...params,
              type: "pic_quality",
              modeling_failed_rate: model,
              low_score_rate: low,
              from: moment().startOf("day").unix().toString(),
              to: moment().endOf("day").unix().toString(),
            });
          }}
          rowSelection={false}
          subscribeName="facePicQuality"
        />
      </Card>
    </>
  );
};

export default PicQualityView;
