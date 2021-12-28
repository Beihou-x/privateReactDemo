import React, { useRef, useState, useEffect } from "react";
import { Modal, message, Table, Button } from "antd";
import StandardTable from "@components/Table";
import { deviceMonitor } from "@/services/v2";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { formatDate, format } from "@/utils/utils"

const VModal = (props) => {
  const { modalVisible, handleModalVisible, tableParams } = props;

  const [loading, setLoading] = useState(false);
  const [tableData, setTableData]: any = useState([]);
  const [deviceIds, setDeviceIds] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  useEffect(() => {
    getData({});
  }, [pagination.current, pagination.pageSize]);

  const getData = async (params) => {
    setLoading(true);
    deviceMonitor(tableParams.type,{
      ...params,
      place: tableParams.place,
      offset:
        (pagination.current &&
          pagination.pageSize &&
          (pagination.current - 1) * pagination.pageSize) ||
        0,
      limit: pagination.pageSize || 10,
    }).then((res) => {
      if (res) {
        setTableData(res.monitorResult||[]);
        setPagination({
          ...pagination,
          total: (res && res.total) || 0,
          current: pagination.current
        })
        getTableData(res.monitorResult);
      }
      setLoading(false);
    });
  };


  const handleCancel = () => {
    handleModalVisible && handleModalVisible(false);
  };


  const getTableData = res => {
    setDeviceIds((Array.isArray(res) ? res : []).map(item => item.device_id).toString());
  }

  //表格查询
  const handleTableChange = (tablePagination) => {
    setPagination({
      ...pagination,
      ...tablePagination,
    });
  };

  const c1 = tableParams==="operation_device_Id" ? [
    {
      dataIndex: "alias",
      title: "点位名称",
      align: "center",
    },
    {
      dataIndex: "unit",
      title: "所在组织",
      align: "center",
    },
  ]: []

  const c2 = tableParams==="operation_device_LoLa" ? [
    {
      dataIndex: "unit",
      title: "所在组织",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
  ]: []
  const c3 = tableParams==="operation_device_time" ? [
    {
      dataIndex: "time_difference",
      title: "时间差(毫秒)",
      align: "center",
    },
    {
      dataIndex: "error_type",
      title: "延迟/倒挂",
      align: "center",
    },
    {
      dataIndex: "alive_capture_at",
      title: "监测时间",
      align: "center",
      render: (val) => <span>{formatDate(val, "YYYY-MM-DD h:mm:ss")}</span>,
    },
  ]:[]
  const columns:any = [
    {
      dataIndex: "alias",
      title: "采集设备名称",
      align: "center",
    },
    {
      dataIndex: "device_id",
      title: "采集设备编码",
      align: "center",
    },
   ...c1,
   ...c2,
   ...c3,
    {
      dataIndex: "status",
      title: "监测结果",
      align: "center",
      render: (val) => {
        let a = "";
        if (val === "1") {
          a = "正常";
        } else {
          a = "异常";
        }
        return <span>{a}</span>;
      },
    },
    {
      dataIndex: "message",
      title: "异常类型",
      align: "center",
    },
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
      <CopyToClipboard text={deviceIds}
        onCopy={() => message.success('复制成功', 10)}>
        <Button disabled={!deviceIds} type='primary' style={{ marginBottom: 20 }}>复制当前页异常设备ID</Button>
      </CopyToClipboard>

      <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={tableData}
          pagination={{ ...pagination, showTotal: (total) => `共 ${total} 条` }}
          onChange={handleTableChange}
        ></Table>
    </Modal>
  );
};

export default VModal;
