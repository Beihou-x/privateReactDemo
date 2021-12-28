import React, { useRef, useState, useEffect } from "react";
import { Modal, message, Table, Button } from "antd";
import StandardTable from "@components/Table";
import { deviceQualityUnusual, sampleDetail } from "@/services/v2";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { formatDate,getDeviceStatus } from "@/utils/utils"

const VModal = (props) => {
  const { modalVisible, handleModalVisible, tableParams, columnType } = props;
  const [loading1, setLoading1] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tableData, setTableData]: any = useState([]);
  const [sampleData, setSampleData]: any = useState([]);
  const [deviceIds, setDeviceIds] = useState("");
  const [oneDeviceIds, setOneDeviceIds] = useState("");


  const handleCancel = () => {
    handleModalVisible && handleModalVisible(false);
  };
  const handleCancel1 = () => {
    setVisible(false);
    setSampleData([])
  };

  // 异常原因详情
  const simpleDetail = (device_id) => {
    setVisible(true)
    setLoading1(true)
    sampleDetail({ device_id }).then((res) => {
      setLoading1(false)
      setSampleData(res || [])
    })
  }

  const getTableData = res => {
    setDeviceIds((Array.isArray(res) ? res : []).map(item => item.device_id).toString());
    setOneDeviceIds((Array.isArray(res) ? res : []).map(item => item.id).toString());
  }

  const c = tableParams.type === 'sync_device' || tableParams.type === 'access_device' ||tableParams.type === 'no_data' ? [{
    dataIndex: "capture_at",
    title: "最后抓拍时间",
    align: "center",
    render: val => (
      <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    dataIndex: "request_at",
    title: "最后请求时间",
    align: "center",
    render: val => (
      <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
    )
  }] : []
  const c1 = tableParams.type === 'check_abnormal' ? [{
    dataIndex: "check_status",
    title: "检测状态",
    align: "center",
  }] : []
  const c2 = tableParams.type === 'no_data' ? [{
    dataIndex: "continue_no_data",
    title: "持续无数据天数",
    align: "center",
  }] : []
  const c3 = tableParams.type === 'un_timely_device' ? [{
    dataIndex: "request_at",
    title: "采样时间",
    align: "center",
    render: val => (
      <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    dataIndex: "a3",
    title: "最大延迟时间",
    align: "center",
    render: (val,record) => (
      <span>{record.request_at && record.capture_at ? Number(record.request_at) - Number(record.capture_at) : ''}</span>
    )
  }] : []
  const c4 = tableParams.type === 'upside_down' ? [{
    dataIndex: "request_at",
    title: "采样时间",
    align: "center",
    render: val => (
      <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
    )
  },
  {
    dataIndex: "a3",
    title: "最大倒挂时间",
    align: "center",
    render: (val,record) => (
      <span>{record.capture_at && record.request_at ? Number(record.capture_at) - Number(record.request_at) : ''}</span>
    )
  }] : []
  const c5 = tableParams.type === 'un_complete' ? [{
    dataIndex: "un_complete_num",
    title: "不完整数据量",
    align: "center",
    render: (val, record) => <a onClick={() => simpleDetail(record.device_id)}>{val}</a>,
  }] : []
  const c6 = tableParams.type === 'detect_download' ? [{
    dataIndex: "before_capture",
    title: "昨日抓拍总量",
    align: "center",
  },
  {
    dataIndex: "yesterday_capture",
    title: "今日抓拍总量",
    align: "center",
  }] : []
  const columns: any = [
    {
      dataIndex: "device_id",
      title: "设备编码",
      align: "center",
    },
    {
      dataIndex: "alias",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "source",
      title: "来源",
      align: "center",
    },
    {
      dataIndex: "sync_status",
      title: "设备状态",
      align: "center",
      render: val => (
        <span>{getDeviceStatus(val)}</span>
      )
    },
    ...c1,
    ...c2,
    ...c3,
    ...c4,
    ...c5,
    ...c6,
    ...c
  ];

  const columnsOne: any = [
    {
      dataIndex: "id",
      title: "设备编码",
      align: "center",
    },
    {
      dataIndex: "sync_name",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "status",
      title: "设备状态",
      align: "center",
      render: val => (
        <span>{getDeviceStatus(val)}</span>
      )
    },
    {
      dataIndex: "capture_at",
      title: "最后抓拍时间",
      align: "center",
      render: val => (
        <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
    {
      dataIndex: "manufactor_code",
      title: "设备厂商",
      align: "center",
    }
  ]

  const sampleColumns: any = [
    {
      dataIndex: "request_at",
      title: "抽检时间",
      align: "center",
      render: val => (
        <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
      )
    },
    {
      dataIndex: "message",
      title: "异常原因",
      align: "center",
    }
  ]

  return (
    <Modal
      maskClosable={false}
      title={"异常设备"}
      width={1400}
      visible={modalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <CopyToClipboard text={columnType === "one" ? oneDeviceIds : deviceIds}
        onCopy={() => message.success('复制成功', 10)}>
        <Button disabled={!deviceIds || !oneDeviceIds} type='primary' style={{ marginBottom: 20 }}>复制当前页异常设备ID</Button>
      </CopyToClipboard>
      <StandardTable 
        columns={columnType === "one" ? columnsOne : columns} 
        services={(params:any) => {
          return deviceQualityUnusual({
            ...params,
            ...tableParams
          })
        }}
        getTableData={getTableData}
        />

      <Modal
        maskClosable={false}
        title={"不完整数据信息"}
        width={800}
        visible={visible}
        footer={[
          <Button key="back" onClick={handleCancel1}>
            取消
          </Button>,
        ]}
      >
        <Table loading={loading1} bordered dataSource={sampleData} rowKey="id" columns={sampleColumns} />
      </Modal>
    </Modal>
  );
};

export default VModal;
