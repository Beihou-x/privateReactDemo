import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import moment from "moment"
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, DatePicker, Row, Col } from "antd";
import {
  checkpointCarUnusualHead,
  checkpointCarUnusualList,
} from "@/services/v2";
import { formatDate, formatStartData, formatEndData,filterCategory } from "@/utils/utils";
const { Option } = Select;

const ConsistencyView = props => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);
  const deviceType = filterCategory("摄像机功能类型") || [];
  const area = filterCategory("版块") || [];
  useEffect(() => {
    getData();
  }, []);

  const getData = async (params: any = {}) => {
    checkpointCarUnusualHead({
      ...params,
      type: "consistence",
    }).then(res => {
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
      title: "设备ID",
      align: "center",
    },
    {
      dataIndex: "total",
      title: "过车数据量",
      align: "center",
    },
    {
      dataIndex: "status",
      title: "设备状态",
      align: "center",
    },
    {
      dataIndex: "request_at",
      title: "最近上传时间",
      align: "center",
      render: val => <span>{formatDate(val, "YYYY-MM-DD")}</span>,
    }
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
              renderFormItem: () => (
                <Select options={area}></Select>
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
              label: "设备状态",
              name: "status",
              renderFormItem: () => (
                <Select>
                  <Option value="未上传">未上传</Option>
                  <Option value="已上传">已上传</Option>
                </Select>
              ),
            },
            {
              label: "数据最近上传时间",
              name: "upload_at",
              renderFormItem: () => <DatePicker />
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
          onChange={(params) => handleSearch(params)}
          subscribeName="carConsistency"
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
          services={(params:any) =>{
            const {time} = params;
            let upload_at:any = params.upload_at ? [params.upload_at.startOf("day").unix().toString(),params.upload_at.endOf("day").unix().toString()]: undefined;
            if(time) {
              const start = time.startOf('day').format('X');
              const end = time.endOf('day').format('X');
              return checkpointCarUnusualList({ ...params,upload_at:upload_at, type: "consistence", start, end, time:undefined })
            }
            return checkpointCarUnusualList({ ...params,upload_at:upload_at, type: "consistence" })
          }
          }
          rowSelection={false}
          subscribeName="carConsistency"
        />
      </Card>
    </>
  );
};

export default ConsistencyView;
