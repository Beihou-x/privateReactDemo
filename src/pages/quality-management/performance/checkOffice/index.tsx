import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import "./index.less";
import moment from "moment";
import { checkTargetSearch } from "@/services/v1";

const CheckOffice = () => {
  const [dataSource, setDataSource] = useState([]);
  const dateNow = moment(new Date()).format("M月DD号");

  useEffect(() => {
    checkTargetSearch({}).then((res) => {
      getData(res);
    });
  }, []);

  const getData = (data) => {
    if (data && data.length) {
      const arr: any = data.map((k) => {
        const key: any = Object.keys(k)[0];
        const value: any = Object.values(k)[0];
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

  const titles = [
    "小图识别率",
    "大图可访问率",
    "抓拍小图上传延迟",
    "人像小图识别率",
    "人车同拍人像小图识别率",
    "图片识别准确率",
  ];

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
          <div style={{ textAlign: "center" }}>目标/实际比例</div>
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
    {
      title: "市局",
      align: "center",
      dataIndex: "市局",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "工业园区",
      align: "center",
      dataIndex: "园区",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "姑苏区",
      align: "center",
      dataIndex: "姑苏",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "吴中区",
      align: "center",
      dataIndex: "吴中",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "吴江区",
      align: "center",
      dataIndex: "吴江",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "高新区",
      align: "center",
      dataIndex: "高新",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "相城区",
      align: "center",
      dataIndex: "相城",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "太仓市",
      align: "center",
      dataIndex: "太仓",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "张家港市",
      align: "center",
      dataIndex: "张家港",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "昆山市",
      align: "center",
      dataIndex: "昆山",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
    {
      title: "常熟市",
      align: "center",
      dataIndex: "常熟",
      render: (val, record) => {
        if (titles.includes(record.考核指标)) {
          return (
            <>
              {(val.exist * 100).toFixed(2) + "%" + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </>
          );
        } else {
          return (
            <div title={"实际数量：" + `${val.actual}`} className="hover">
              {val.exist + "/"}
              <span className={getColor(val.rate * 100)}>
                {(val.rate * 100).toFixed(2)}%
              </span>
            </div>
          );
        }
      },
    },
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
