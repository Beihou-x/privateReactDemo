import React, { useState, useRef } from "react";
import { Card, DatePicker, Row, Col,Tooltip } from "antd";
import moment from 'moment';
import { overviewSearch } from "@/services/v1";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import Model from "../../car/children/Modal"; //与车共用一个组件
import { format } from "@/utils/utils";
import { QuestionCircleOutlined } from '@ant-design/icons';

const Home = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableParams, setTableParams]: any = useState({});
  const [searchParams, setSearchParams]: any = useState({});
  // 底部统计
  const [statistical, setStatistical]: any = useState([]);

  const tableRef: any = useRef();
  const handleModalVisible = (isShow) => {
    setModalVisible(isShow);
  }
  const showDetail = (isShow, record, type) => {
    const obj = {
      source: record.name,
      start: searchParams.time ? searchParams.time.startOf("day").format("X") : moment().startOf("day").format("X"),
      end: searchParams.time ? searchParams.time.endOf("day").format("X") : moment().endOf("day").format("X"),
      type: type,
      function_type: "人像卡口"
    }
    setTableParams(obj)
    handleModalVisible(isShow);
  }
  const onSearchChange = (params) => {
    setSearchParams(params);
  }

  const getTableData = (val) => {
    // total 人脸采集设备数 total1抓怕数据总量 total2无抓怕数据设备数
    let total = val.reduce((pre, currentVal) => {
      return pre + (currentVal.total || 0);
    }, 0);
    let total1 = val.reduce((pre, currentVal) => {
      return pre + (currentVal.total1 || 0);
    }, 0);
    let total2 = val.reduce((pre, currentVal) => {
      return pre + (currentVal.total2 || 0);
    }, 0);
    let un_complete_num = val.reduce((pre, currentVal) => {
      return pre + (currentVal.un_complete_num || 0);
    }, 0);
    const arr = [
      {
        name: "人脸采集设备数",
        value: total
      }, {
        name: "抓拍数据总量",
        value: total1
      }, {
        name: "无抓拍数据设备数",
        value: total2
      },
      {
        name: "数据不完整数",
        value: un_complete_num
      }
    ]
    setStatistical(arr)
  }
  const columns = [
    {
      dataIndex: "name",
      title: "组织区域",
      align: "center",
    },
    {
      dataIndex: "total",
      title: "设备数",
      align: "center",
    },
    {
      dataIndex: "total1",
      title: "人像抓拍总量",
      align: "center",
    },
    {
      dataIndex: "un_complete_num",
      title: <><Tooltip title="当日缺少人像或者车辆的报文数"><QuestionCircleOutlined /></Tooltip> 数据不完整数</>,
      align: "center",
      render: (val, record) => (
        <span style={{ color: Number(val) > 0 ? 'red' : '#1890ff', cursor: 'pointer' }} onClick={() => showDetail(true, record, "data_complete")}>{val || 0}</span>
      ),
    },
    {
      dataIndex: "image_url_abnormal",
      title: <><Tooltip title="当日大图URL不存在的数量"><QuestionCircleOutlined /></Tooltip> 大图URL异常数</>,
      align: "center",
      render: (val, record) => (
        <span style={{ color: Number(val) > 0 ? 'red' : '#c1c5ca' }}>{val || 0}</span>
      ),
    },
    {
      dataIndex: "pic_req_abnormal_rec",
      title: <><Tooltip title="当日大图访问无效数/当日大图总数"><QuestionCircleOutlined /></Tooltip> 大图不可用率</>,
      align: "center",
      render: (val, record) => (
        <a onClick={() => showDetail(true, record, "image_visit_abnormal")}>
          {format(val)}%
        </a>
      ),
    },
    {
      dataIndex: "little_vail_rec",
      title: <><Tooltip title="当日接收小图不合格数/当日接收小图总数"><QuestionCircleOutlined /></Tooltip> 小图不合格率</>,
      align: "center",
      render: (val, record) => (
        <a onClick={() => showDetail(true, record, "little_vail")}>
          {format(val)}%
        </a>
      ),
    },
    {
      dataIndex: "hang_down_rec",
      title: <><Tooltip title="当日登记的倒挂设备数(请求时间<抓拍时间)/登记设备数"><QuestionCircleOutlined /></Tooltip> 数据倒挂率</>,
      align: "center",
      render: (val, record) => (
        <a onClick={() => showDetail(true, record, "data_upside_down")}>
          {format(val)}%
        </a>
      ),
    },
    {
      dataIndex: "delay_rec",
      title: <><Tooltip title="当日登记的延迟设备数(请求时间-抓拍时间>30)/登记设备数"><QuestionCircleOutlined /></Tooltip> 数据延迟率</>,
      align: "center",
      render: (val, record) => (
        <a onClick={() => showDetail(true, record, "data_delay")}>
          {format(val)}%
        </a>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <Row gutter={[10, 10]}>
          {(statistical || []).map((item, index) => (
            <Col span={4} key={index}>
              <span>{item.name}</span>
              <span> : </span>
              <span>{item.value}</span>
            </Col>
          ))}
        </Row>
      </Card>
      <Card bordered={false}>
        <SearchForm formList={
          [
            {
              label: "时间",
              name: "time",
              renderFormItem: (props, keys) => (<DatePicker defaultValue={moment()} />)
            }
          ]
        } onChange={(params) => { onSearchChange(params) }} />
        <StandardTable
          ref={tableRef}
          columns={columns}
          getTableData={getTableData}
          services={(params: any) => {
            const { time } = params;
            if (time) {
              const start = time.startOf('day').format('X');
              const end = time.endOf('day').format('X');
              return overviewSearch({ ...params, start, end, time: undefined })
            }
            return overviewSearch({ ...params })
          }}
          rowSelection={false}
          tableProps={
            { pagination: false }
          }
        />

        {modalVisible ? (
          <Model
            modalVisible={modalVisible}
            handleModalVisible={handleModalVisible}
            tableParams={tableParams}
          />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Home;
