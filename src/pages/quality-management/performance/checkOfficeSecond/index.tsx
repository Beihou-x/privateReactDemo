import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import "./index.less";
import moment from "moment";
import { assessmentSearch } from "@/services/v1";

const CheckOffice = () => {
  const [dataSource, setDataSource] = useState([]);
  const dateNow = moment(new Date()).format("M月DD号");
  const [units, setUnits] = useState([]);

  useEffect(() => {
    assessmentSearch().then((res) => {
      getData(res);
    });
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
            setUnits(keys);
          }
        }
        return { 考核指标: key, ...value };
      });

      setDataSource(arr);
    }
  };

  const getColor = (value) => {
    let color = "";
    if (value >= 90) {
      color = "green";
    } else if (value >= 60 && value < 90) {
      color = "yellow";
    } else if (value < 60) {
      color = "red";
    } else {
      color = "";
    }
    return color;
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
                  <span className={getColor(Number(val.rate) * 100)}>
                    {Number((Number(val.rate) * 100).toFixed(2))}%
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
          <div style={{ textAlign: "right" }}>区域</div>
          <div style={{ textAlign: "center" }}>实际比例</div>
          <div style={{ textAlign: "left" }}>考核指标</div>
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
      dataIndex: "考核指标",
      width: 200,
    },
    ..._arr,
  ];
  return (
    <Card bordered={false}>
      <div className="checkOffice">
        <div className="checkOffice-title">{dateNow}考核</div>
        <Table
          rowKey={(record: any) => JSON.stringify(record)}
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
        />
      </div>
    </Card>
  );
};

export default CheckOffice;
