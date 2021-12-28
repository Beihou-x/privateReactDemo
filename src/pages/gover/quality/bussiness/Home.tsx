import React, { useEffect, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Table } from "antd";
import { tagDeviceOverview } from "@/services/v2";

const Home = (props) => {
  const [dataSource, setDataSource] = useState([]);
  const [units, setUnits]:any = useState([]);

  useEffect(() => {
    tagDeviceOverview({tag_ids: ["11301","11302","11304","11303"]}).then(res => {
        getData(res);
    })
  }, []);

  const getData = (data) => {
    if (data && data.length) {
      const arr: any = data.map((k, index) => {
        const key: any = Object.keys(k)[0];
        const value: any = Object.values(k)[0];
        if (index === 0) {
          const obj: any = Object.values(k)[0];
          if (obj) {
            const keys: any = Object.keys(obj);

            for (var i = 0; i < keys.length; i++) {
              if (keys[i] === '总计') {
                keys.splice(i, 1);
                break;
              }
            }
            keys.push('总计');
            setUnits(keys);
          }
        }
        return { 组织区域: key, ...value };
      });

      setDataSource(arr);
    }
  };
  const _arr =
  units && units.length
    ? units.map((m) => {
        return {
          title: m,
          align: "center",
          dataIndex: m,
          render: (val, record) => {
            return (
              <>
                <span>
                  {val}
                </span>
              </>
            );
          },
        };
      })
    : [];
  const columns: any = [
    {
        title: (
          <div
            style={{
              position: "relative",
              minWidth: 170,
              // overflow: "hidden",
            }}
          >
            <div style={{ textAlign: "right" }}>业务标签</div>
            <div style={{ textAlign: "center" }}>设备数</div>
            <div style={{ textAlign: "left" }}>组织区域</div>
            <div
              style={{
                content: "",
                position: "absolute",
                width: "1px",
                height: "247px",
                top: "-73px",
                left: "71px",
                backgroundColor: "#1A3A50",
                display: "block",
                transform: "rotate(-75deg)",
              }}
            ></div>
            <div
              style={{
                content: "",
                position: "absolute",
                width: "1px",
                height: "126px",
                top: "-31px",
                left: "144px",
                backgroundColor: "#1A3A50",
                display: "block",
                transform: "rotate(-41deg)",
              }}
            ></div>
          </div>
        ),
        align: "center",
        dataIndex: "组织区域",
        width: 200,
      },
      ..._arr,
  ];

  return (
    <Card bordered={false}>
      <Table
          rowKey={(record: any) => JSON.stringify(record)}
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
        />
    </Card>
  );
};

export default Home;
