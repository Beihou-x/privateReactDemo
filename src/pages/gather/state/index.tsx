import React, { Component } from "react";
import { Card, Table, Space } from "antd";
import { Link } from "react-router-dom";
import up from "@/assets/dashboard/up.png";
import down from "@/assets/dashboard/down.png";
import styles from "./original/index.less";
import { bigNumberTransform } from "@/utils/utils";

const State = () => {
  const renderContent = (value, row, index) => {
    // console.log("value--", value);

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

  const onclickTitle = title => {
    console.log("title==", title);
  };
  const onClickTd = row => {
    console.log("row==", row);
  };

  const columns: any = [
    {
      title: "",
      colSpan: 2,
      dataIndex: "title",
      align: "center",
      render: (value, row, index) => {
        let clickValue: any = "";
        if (value === "原始库") {
          clickValue = "original";
        } else if (value === "主题库") {
          clickValue = "theme";
        }
        const obj: any = {
          children: (
            <>
              {clickValue ? (
                <Link
                  to={{
                    pathname: "/gather/assetquality/original",
                    state: clickValue,
                  }}
                >
                  <a>{value}</a>
                </Link>
              ) : (
                <span>{value}</span>
              )}
            </>
          ),
          props: {},
        };
        const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];
        if (arr.includes(index)) {
          obj.props.rowSpan = 0;
        }
        if (index === 0) {
          obj.props.rowSpan = 4;
        }
        if (index === 4) {
          obj.props.rowSpan = 3;
        }
        if (index === 7) {
          obj.props.rowSpan = 3;
        }
        if (index === 10) {
          obj.props.rowSpan = 6;
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
      title: "总量",
      dataIndex: "gyy",
      // render: (text, row) => {
      //   // <span>{bigNumberTransform(text)}</span>;
      //   <span>{text}</span>;
      // },
      render: (text, row) => <span>{text}万+</span>,
    },
    {
      title: "存储容量",
      dataIndex: "gs",
      render: (text, row) => <span>{text}T</span>,
    },
    {
      title: "今日新增",
      dataIndex: "wz",
      render: (text, row) => (
        <Space size="small">
          <span>{text}</span>
          <img style={{ height: 16, width: 9 }} src={row === "1" ? down : up} />
          <span className={styles.percent}>{row.wj}%</span>
        </Space>
      ),
    },
    {
      title: "同比",
      dataIndex: "wj",
      render: (text, row) => (
        <Space size="small">
          <img style={{ height: 16, width: 9 }} src={row === "1" ? down : up} />
          <span>{text}%</span>
        </Space>
      ),
    },
    {
      title: "环比",
      dataIndex: "gx",
      render: (text, row) => (
        <Space size="small">
          <img style={{ height: 16, width: 9 }} src={row === "1" ? down : up} />
          <span>{text}%</span>
        </Space>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      title: "原始库",
      project: "人脸",
      sj: 7,
      gyy: 8,
      gs: 8,
      wz: 8,
      wj: 8,
      gx: 6,
    },
    {
      key: "2",
      title: "原始库",
      project: "人体",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "3",
      title: "原始库",
      project: "车辆",
      sj: 30,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "4",
      title: "原始库",
      project: "码",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "5",
      title: "资源库",
      project: "人车关联",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "6",
      title: "资源库",
      project: "人人关联",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 5,
    },
    {
      key: "7",
      title: "资源库",
      project: "人码关联",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 5,
    },
    {
      key: "8",
      title: "主题库",
      project: "人员档案",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "9",
      title: "主题库",
      project: "匿名档案",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "10",
      title: "主题库",
      project: "车辆档案",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "11",
      title: "业务库",
      project: "感知前端设备",
      sj: 2,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "12",
      title: "业务库",
      project: "静态人像特征值",
      sj: 3,
      gyy: 3,
      gs: 3,
      wz: 3,
      wj: 3,
      gx: 3,
    },
    {
      key: "13",
      title: "业务库",
      project: "常住人口照片特征值",
      sj: 9,
      gyy: 9,
      gs: 9,
      wz: 9,
      wj: 9,
      gx: 9,
    },
    {
      key: "14",
      title: "业务库",
      project: "暂住人口照片特征值",
      sj: 4,
      gyy: 5,
      gs: 5,
      wz: 4,
      wj: 5,
      gx: 5,
    },
    {
      key: "15",
      title: "业务库",
      project: "旅馆人证核验照片",
      sj: 5,
      gyy: 5,
      gs: 5,
      wz: 5,
      wj: 5,
      gx: 5,
    },
    {
      key: "16",
      title: "业务库",
      project: "网吧人证核验照片",
      sj: 5,
      gyy: 5,
      gs: 5,
      wz: 5,
      wj: 5,
      gx: 5,
    },
  ];
  return (
    <Card bordered={false}>
      <Table columns={columns} dataSource={data} bordered pagination={false} />
    </Card>
  );
};
export default State;
