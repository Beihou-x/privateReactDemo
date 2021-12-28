import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col,DatePicker } from "antd";
import { listSearch, TopDataSearch } from "@/services/v1";
import moment from "moment";
import { formatDate,filterCategory,formatStartData,formatEndData } from "@/utils/utils";
import CheckDate from "../../component/todayAndYesterday";

const { Option } = Select;
const deviceType = filterCategory("摄像机功能类型") || [];
const area = filterCategory("版块") || [];
const DataView = () => {
  const refTable: any = useRef(null);
  const [total, setTotal]: any = useState([]);

  useEffect(() => {
    getTotal();
  }, []);


  const getTotal = (params:any = {}) => {
    TopDataSearch({
      type: "data",
      from: moment().startOf("day").unix().toString(),
      to: moment().endOf("day").unix().toString(),
      ...params
    }).then(res => {
      if (res) {
        const list = res.map(item => {
          if (typeof item.value === "string") {
            return {
              name: item.name,
              value: Number(item.value * 100).toFixed() + "%",
            };
          } else {
            return item;
          }
        });
        setTotal(list);
      }else {
        setTotal([])
      }
    });
  };
  
  const handleSearch = params => {
    if(params.time) {
      let from = params.time.startOf("day").unix().toString()
      let to = params.time.endOf("day").unix().toString()
      getTotal({ from, to });
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
      title: "抓拍量",
      align: "center",
    },
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

  return (
    <>
      
      <Card bordered={false} style={{ marginBottom: 10 }}>
        {/* <CheckDate radioChange={radioChange} /> */}
        <Row gutter={[10, 10]}>
          {(total || []).map((item, index) => (
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
              label: "国标ID",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "监测结果",
              name: "status",
              renderFormItem: () => (
                <Select>
                  <Option value="1">异常</Option>
                  <Option value="0">正常</Option>
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
          onChange={(params) => handleSearch(params)}
          subscribeName="faceData"
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
          services={(params:any) =>
            {
              const {time} = params;
              if(time) {
                const start = time.startOf('day').format('X');
                const end = time.endOf('day').format('X');
                return listSearch({
                  from: moment().startOf("day").unix().toString(),
                  to: moment().endOf("day").unix().toString(),
                  type: "data",
                  ...params,
                  start, end, time: undefined
                })
              }
              return listSearch({
                from: moment().startOf("day").unix().toString(),
                to: moment().endOf("day").unix().toString(),
                type: "data",
                ...params,
              })
            }
            
          }
          // services={async params => {
          //   const response = await listSearch({
          //     ...params,
          //     type: "data",
          //     from: moment().startOf("day").unix().toString(),
          //     to: moment().endOf("day").unix().toString(),
          //   });
          //   console.log("response----", response);
          //   return response;
          // }}
          rowSelection={false}
          subscribeName="faceData"
        />
      </Card>
    </>
  );
};

export default DataView;
