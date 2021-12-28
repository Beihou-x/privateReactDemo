import React, { useState, useRef, useEffect } from "react";
import StandardTable from "@components/Table";
import { Row, Col, Card, Button, Table } from "antd";
import { deviceSyncAccess } from "@/services/v2";
import DownLoadFile from "@components/DownLoadFile";
import { format,filterCategory,getCodeValue } from "@/utils/utils";
import { useHistory } from "react-router-dom";

const DeviceOverview = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const [tableData, setTableData]: any = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const categorys = filterCategory("接入申请类型") || [];
  const status = filterCategory("申请状态") || [];

  // useEffect(() => {
  //   setLoading(true);
  //   deviceSyncAccess(id,{})
  //     .then((res) => {
  //       setLoading(false);
  //       setTableData(Array.isArray(res)?res:[]);
  //     })
  //     .catch((e) => {
  //       console.error(e);
  //     });
  // }, []);

  const showDetail = (isShow, record, type) => {
    const obj = {
      place_code: record.place_code,
      type: type,
    };
  };

  const columns: any = [
    {
      title: "申请编号",
      dataIndex: ["id"],
      align: "center",
    },
    {
      title: "申请标题",
      dataIndex: ["title"],
      align: "center",
    },
    {
      title: "类型",
      dataIndex: ["category"],
      align: "center",
    },
    {
      title: "设备数",
      dataIndex: ["device_counter"],
      align: "center",
    },
    {
      title: "接入来源",
      dataIndex: "source",
      align: "center",
    },
    {
      title: "申请状态",
      dataIndex: ["status"],
      align: "center",
    },
  ];

  return (
    <>
      <Card bordered={false}>
        {/* <Table
          loading={loading}
          columns={columns}
          dataSource={tableData}
          bordered
          rowKey="id"
          pagination={false}
        ></Table> */}
        <StandardTable 
          columns={columns}
          rowSelection={false}
          services={(params: any) => {
            return deviceSyncAccess(id,{ ...params})
          }}
        
        />
        <div style={{ background: "#2B3748", textAlign: "right" }}>
          <Button style={{ marginTop: 20 }} onClick={() => history.goBack()}>
            取消
          </Button>
        </div>
      </Card>
    </>
  );
};

export default DeviceOverview;
