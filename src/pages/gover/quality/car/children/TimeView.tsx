import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col,Form,InputNumber,DatePicker } from "antd";
import moment from 'moment';
import {
  checkpointCarUnusualHead,
  checkpointCarUnusualList,
} from "@/services/v2";
import { format, formatStartData, formatEndData,getIsEndWith ,filterCategory,toSmallNumStr} from "@/utils/utils";
const { Option } = Select;

const PicView = props => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState([]);
  const area = filterCategory("版块")||[];
  const deviceType = filterCategory("摄像机功能类型")||[];

  useEffect(() => {
    getData();
  }, []);

  const getData = async (params: any = {}) => {
    checkpointCarUnusualHead({
      ...params,
      type: "timeliness",
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
      dataIndex: "total2",
      title: "是否延迟",
      align: "center",
    },
    // {
    //   dataIndex: "rec",
    //   title: "延迟率",
    //   align: "center",
    //   render: val => <span>{format(val)}%</span>,
    // },
    {
      dataIndex: "total3",
      title: "是否倒挂",
      align: "center",
    },
    // {
    //   dataIndex: "rec1",
    //   title: "倒挂率",
    //   align: "center",
    //   render: val => <span>{format(val)}%</span>,
    // },
  ];

  return (
    <>
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
          onChange={() =>{}}
          subscribeName="carTime"
        />

        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params: any) => {
            // const { delay_rate, drop_away_rate } = params;
            // let delay:any = delay_rate && delay_rate.max ? [toSmallNumStr(delay_rate.min),toSmallNumStr(delay_rate.max)] : undefined;
            // let drop:any = drop_away_rate && drop_away_rate.max ? [toSmallNumStr(drop_away_rate.min),toSmallNumStr(drop_away_rate.max)] : undefined;
            const {time} = params;
            if(time) {
              const start = time.startOf('day').format('X');
                const end = time.endOf('day').format('X');
                return checkpointCarUnusualList({ ...params, type: "timeliness",start,end,time: undefined });
            }
            return checkpointCarUnusualList({ ...params, type: "timeliness" });
          }}
          rowSelection={false}
          subscribeName="carTime"
        />
      </Card>
    </>
  );
};

export default PicView;
