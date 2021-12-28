import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, message, Button, Tooltip, Row, Col } from "antd";
import { deviceSyncAbnormalSearch, deviceSyncAbnormalDetail } from "@/services/v1";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QuestionCircleOutlined } from '@ant-design/icons';
const AnomalyDetection = (props) => {
  const refTable: any = useRef(null);
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [type, setType] = useState('')
  const [place_code, setPlaceCode] = useState('')
  const [deviceIds, setDeviceIds] = useState("");
  const [statistical, setStatistical]: any = useState([]);

  // 详情
  const handleExpand = async (place_code, type) => {

    const index = expandedRowKeys.findIndex((q) => q === place_code);

    if (index > -1) {
      setRowKeys([]);
      setPlaceCode('')
      setType('')
      setDeviceIds('')
    } else {
      setRowKeys([place_code]);
      setPlaceCode(place_code)
      setType(type)
    }
  };

  const getTableData = (val) => {
    // total卡口总数 total1抓拍数据总量total2无抓拍 detect_down抓拍量突降
    let total = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.device_sync_num) || 0);
    }, 0);
    let total1 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.real_access_num) || 0);
    }, 0);
    let total2 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.register_not_access) || 0);
    }, 0);
    let total3 = val.reduce((pre, currentVal) => {
      return pre + (Number(currentVal.access_not_register) || 0);
    }, 0);

    const arr = [
      {
        name: "一机一档同步总量",
        value: total,
      },
      {
        name: "实际接入总量",
        value: total1,
      },
      {
        name: "注册未接入总量",
        value: total2,
      },
      {
        name: "接入未注册总量",
        value: total3,
      },
    ];
    setStatistical(arr);
  };

  const columnsTable: any = [
    {
      dataIndex: "device_id",
      title: "id",
      align: "center",
    },
    {
      dataIndex: "alias",
      title: "名称",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "类型",
      align: "center",
    },

    {
      dataIndex: "status",
      title: "状态",
      align: "center",
    },
  ]

  const expandedRow = () => {
    return <div style={{ padding: 20 }}>
      <CopyToClipboard text={deviceIds}
        onCopy={() => message.success('复制成功', 10)}>
        <Button disabled={!deviceIds} type='primary' style={{ marginBottom: 20 }}>复制设备ID</Button>
      </CopyToClipboard>
      <StandardTable
        columns={columnsTable}
        services={async (params) => {
          const response = await deviceSyncAbnormalDetail({ ...params, place_code, type });
          const ids = (Array.isArray(response && response.items) ? response && response.items : []).map(item => item.device_id).toString();
          setDeviceIds(ids);
          console.log('ids', ids)

          return response
        }}
        rowSelection={false}
        rowKey='place_code'
        size='small'
      />
    </div>
  }

  const columns = [
    {
      dataIndex: "place",
      title: "区域",
      align: "center",
    },
    {
      dataIndex: "device_sync_num",
      title: <><Tooltip title="一机一档同步过来的设备量（01-车辆卡口，02-人员卡口，03-微卡口/泛卡口，06-电子警察，11-枪球联动，13-卡口兼电警，14-超级卡口，15-无人机，16-布控球，18-4G警车，19-4G执法记录仪，20-移动闸机，21-人证核验）"><QuestionCircleOutlined /></Tooltip> 一机一档同步量</>,
      align: "center",
      render: (val, row) => (
        <>
          {
            Number(val) === 0 ?
              <span>{val}</span>
              :
              <a onClick={() => handleExpand(row.place_code, 'device_sync')}>{val}</a>
          }
        </>
      )
    },
    {
      dataIndex: "real_access_num",
      title: "实际接入量",
      align: "center",
      render: (val, row) => (
        <>
          {
            Number(val) === 0 ?
              <span>{val}</span>
              :
              <a onClick={() => handleExpand(row.place_code, 'real_access_device')}>{val}</a>
          }
        </>
      )
    },
    {
      dataIndex: "register_not_access",
      title: <><Tooltip title="一机一档同步过来的但是未在本系统登记的设备范围内的设备"><QuestionCircleOutlined /></Tooltip> 注册未接入</>,
      align: "center",
      render: (val, row) => (
        <>
          {
            Number(val) === 0 ?
              <span>{val}</span>
              :
              <a onClick={() => handleExpand(row.place_code, 'register_not_access')}>{val}</a>
          }
        </>
      )
    },
    {
      dataIndex: "access_not_register",
      title: <><Tooltip title="在本系统登记的但是未在同步过来的一机一档设备范围内的设备"><QuestionCircleOutlined /></Tooltip> 接入未注册</>,
      align: "center",
      render: (val, row) => (
        <>
          {
            Number(val) === 0 ?
              <span>{val}</span>
              :
              <a onClick={() => handleExpand(row.place_code, 'access_not_register')}>{val}</a>
          }
        </>
      )
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
        <StandardTable
        getTableData={getTableData}
          ref={refTable}
          columns={columns}
          services={async () => {
            const res = await deviceSyncAbnormalSearch({});
            return { items: res || [] }

          }}
          rowSelection={false}
          rowKey='place_code'
          tableProps={{
            pagination: false,
            expandable: {
              expandedRowRender: expandedRowKeys.length ? expandedRow : '',
              expandIcon: () => { },
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
    </>
  );
};

export default AnomalyDetection;
