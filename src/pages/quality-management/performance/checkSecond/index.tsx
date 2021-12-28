import React, { useEffect, useState } from "react";
import { Table, Card } from "antd";
import { assessmentCheckSearch } from "@/services/v1";
import "./index.less";

const check = () => {
  const [dataSource, setDataSource] = useState([]);
  const [units, setUnits] = useState([]);

  useEffect(() => {
    assessmentCheckSearch().then((res) => {
      getData(res);
    });
  }, []);

  const getData = (data) => {
    if (data && data.length) {
      const arr: any = data.map((k, index) => {
        const { values = [], ...others } = k;
        if (index === 0) {
          const keys: any = Object.keys(values);
          setUnits(keys);
        }
        return { ...others, key: index, ...k.values };
      });

      setDataSource(arr);
    }
  };

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

  const onclickTitle = (title) => {
    console.log("title==", title);
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
            title: (
              <div className="colunms-title" onClick={() => onclickTitle(m)}>
                {m}
              </div>
            ),
            align: "center",
            dataIndex: m,
            render: (val, record) => {
              return (
                <>
                  <span className={getColor(Number(val) * 100)}>
                    {Number((Number(val) * 100).toFixed(2))}%
                  </span>
                </>
              );
            },
          };
        })
      : [];

  const columns: any = [
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
        const arr = [1, 2, 3, 4, 5];
        if (arr.includes(index)) {
          obj.props.rowSpan = 0;
        }

        if (index === 0) {
          obj.props.rowSpan = 6;
        }

        // if (index === 5) {
        //   obj.props.rowSpan = 8;
        // }
        // if (index === 13) {
        //   obj.props.rowSpan = 4;
        // }
        // if (index === 17) {
        //   obj.props.rowSpan = 3;
        // }
        // if (index === 21) {
        //   obj.props.colSpan = 2;
        // }

        return obj;
      },
    },
    {
      title: "project",
      colSpan: 0,
      dataIndex: "project",
      render: renderContent,
    },
    ..._arr,
  ];

  const date = "4月29日";
  return (
    <Card bordered={false}>
      <div className="performance-check">
        <div className="check-title">{date}考核</div>
        <Table
          columns={columns}
          dataSource={dataSource}
          bordered
          pagination={false}
        />
      </div>
    </Card>
  );
};

export default check;
