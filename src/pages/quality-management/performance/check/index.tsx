import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import LineChart from "./lineChart";
import response from "./data.json";
import { getDates } from "@/utils/utils";
import moment from "moment";

const check = () => {
   const renderContent = (value, row, index) => {
    const obj: any = {
      children: value,
      props: {},
    };
    if (index === 21) {
      obj.props.colSpan = 0;
    }
    return obj;
  };

  const renderContentNumber = (value, row, index) => {
    let classN: any = "";
    if (index === 21) {
      classN = "total";
    } else {
      if (value < row.check) {
        classN = "orange";
      } else {
        classN = "green";
      }
    }
    const obj: any = {
      children: (
        <div className={classN} onClick={() => onClickTd(row)}>
          {value}
        </div>
      ),
      props: {},
    };

    return obj;
  };

  const onclickTitle = (title) => {
    console.log("title==", title);
  };
  const onClickTd = (row) => {
    console.log("row==", row);
  };

  const columns = [
    {
      title: "考核指标",
      colSpan: 2,
      dataIndex: "title",
      render: (value, row, index) => {
        const obj: any = {
          children:
            index === 21 ? (
              <div style={{ textAlign: "center" }}>{value}</div>
            ) : (
              value
            ),
          props: {},
        };
        const arr = [
          1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 19,
        ];
        if (arr.includes(index)) {
          obj.props.rowSpan = 0;
        }

        if (index === 0) {
          obj.props.rowSpan = 5;
        }

        if (index === 5) {
          obj.props.rowSpan = 8;
        }
        if (index === 13) {
          obj.props.rowSpan = 4;
        }
        if (index === 17) {
          obj.props.rowSpan = 3;
        }
        if (index === 21) {
          obj.props.colSpan = 2;
        }

        return obj;
      },
    },
    {
      title: "project",
      colSpan: 0,
      dataIndex: "project",
      render: renderContent,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("市局")}>
          市局
        </div>
      ),
      dataIndex: "sj",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("工业园区")}>
          工业园区
        </div>
      ),
      dataIndex: "gyy",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("姑苏区")}>
          姑苏区
        </div>
      ),
      dataIndex: "gs",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("吴中区")}>
          吴中区
        </div>
      ),
      dataIndex: "wz",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("吴江区")}>
          吴江区
        </div>
      ),
      dataIndex: "wj",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("高新区")}>
          高新区
        </div>
      ),
      dataIndex: "gx",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("相城区")}>
          相城区
        </div>
      ),
      dataIndex: "xc",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("太仓市")}>
          太仓市
        </div>
      ),
      dataIndex: "tc",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("张家港市")}>
          张家港市
        </div>
      ),
      dataIndex: "zjg",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("昆山市")}>
          昆山市
        </div>
      ),
      dataIndex: "ks",
      render: renderContentNumber,
    },
    {
      title: (
        <div className="colunms-title" onClick={() => onclickTitle("常熟市")}>
          常熟市
        </div>
      ),
      dataIndex: "cs",
      render: renderContentNumber,
    },
  ];

  const dates = getDates(30);
  const checks = [
    98, 100, 100, 99, 98, 99, 100, 100, 99, 100, 100, 95, 93, 99, 96, 98, 95,
    95, 97, 99, 99, 100, 98, 94, 96, 96, 97, 97, 99, 100,
  ];
  const dateNow = moment(new Date()).format("M月DD号");

  return (
    <Card bordered={false}>
      <div className="performance-check">
        <div className="check-title">{dateNow}考核</div>
        <Table
          columns={columns}
          dataSource={response.data}
          bordered
          pagination={false}
        />
        <LineChart dates={dates} checks={checks} />
      </div>
    </Card>
  );
};

export default check;
