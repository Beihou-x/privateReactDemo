import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col,DatePicker } from "antd";
import moment from "moment"
import {
  checkpointCarUnusualHead,
  checkpointCarUnusualList,
} from "@/services/v2";
import { format, formatStartData, formatEndData,getIsEndWith,filterCategory } from "@/utils/utils";
import CheckDate from "../../component/todayAndYesterday";

const { Option } = Select;

const DataView = props => {
  const refTable: any = useRef(null);
  const [total, setTotal]: any = useState([]);
  const area = filterCategory("版块") || [];
  const deviceType = filterCategory("摄像机功能类型")||[];

  useEffect(() => {
    getTotal();
  }, []);

  const getTotal = (params: any = {}) => {
    checkpointCarUnusualHead({
      ...params,
      type: "data",
    }).then(res => {
      setTotal(Array.isArray(res) ? res : []);
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
      title: "过车量",
      align: "center",
    },
    // {
    //   dataIndex: "through_7total",
    //   title: "周同比过车量",
    //   align: "center",
    // },
    {
      dataIndex: "total1",
      title: "持续无数据天数",
      align: "center",
    },
    {
      dataIndex: "result",
      title: "监测结果",
      align: "center",
    },
    {
      dataIndex: "error_type",
      title: "异常类型",
      align: "center",
    },
  ];

  const handleChange = params => {
    if(params.time) {
      let start = params.time.startOf('day').format('X');
      let end = params.time.endOf('day').format('X');
      getTotal({ start, end })
    }
  }


  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(total || []).map((item, index) => (
            <Col span={4} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>{getIsEndWith(item.name,'占比') ? format(item.value) +'%':item.value}</span>
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
              renderFormItem: () => (
                <Select options={area}>
                </Select>
              ),
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
              label: "监测结果",
              name: "status",
              renderFormItem: () => (
                <Select>
                  <Option value="0">正常</Option>
                  <Option value="1">异常</Option>
                </Select>
              ),
            },
            {
              label: "设备类型",
              name: "function_type",
              renderFormItem: () => (
                <Select options={deviceType}>
                </Select>
              ),
            },
            {
              label: "时间",
              name: "time",
              renderFormItem:(props,keys) => (<DatePicker defaultValue={moment()} />)
              } 
          ]}
          onChange={(params) => handleChange(params)}
          subscribeName="carData"
        />
        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params:any) =>
            {
              const {time} = params
              if(time) {
                const start = time.startOf('day').format('X');
                const end = time.endOf('day').format('X');
                return checkpointCarUnusualList({ type: "data", ...params, start, end, time: undefined })
              }
              return checkpointCarUnusualList({ type: "data", ...params })
            }
          }
          rowSelection={false}
          subscribeName="carData"
        />
      </Card>
    </>
  );
};

export default DataView;
