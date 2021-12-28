import React, { useEffect, useState, useRef } from "react";
import { Table, Card } from "antd";
import "./index.less";
import moment from "moment";
import { performanceAppraisalSearch } from "@/services/v1";
import VForm from "@components/VForm";
import Bar from "./charts/bar";
import styles from "./index.less";
import { formatStartData } from "@/utils/utils";
import { Link } from "react-router-dom";

const CheckOffice = () => {
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [dataTable, setDateTable] = useState([]);
  const [data, setData] = useState([]);
  const [dateValue, setDate]: any = useState("");
  const [labels, setLabels] = useState({});

  useEffect(() => {
    searchHandel();
  }, []);

  const searchHandel = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then(valid => {
        setLoading(true);
        const _date = valid.start_time
          ? formatStartData(valid.start_time)
          : null;
        setDate(_date);

        performanceAppraisalSearch({
          ...valid,
          start_time: _date,
        }).then(res => {
          setLoading(false);
          if (res) {
            const {
              deviceTotal = [],
              performanceAppraisal = [],
              displayMap = {},
            } = res;

            setData(deviceTotal || []);
            setDateTable(performanceAppraisal || []);
            setLabels(displayMap);
          }
        });
      })
      .catch(e => {});
  };

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  // 修改时间
  const onChangeDate = () => {
    searchHandel();
  };
  const columns = [
    {
      name: "start_time",
      label: "考核日期",
      type: "datePicker",
      onChange: onChangeDate,
    },
    // {
    //   name: "companyType",
    //   label: "",
    //   type: "radioGroup",
    //   list: [
    //     { label: "省厅", value: "1" },
    //     { label: "市局", value: "2" },
    //   ],
    //   span: 18,
    //   layout: { labelCol: { span: 0 }, wrapperCol: { span: 24 } },
    //   style: { display: "flex", justifyContent: "flex-end" },
    //   props: {
    //     optionType: "button",
    //     disabled: true,
    //     // size: "small",
    //   },
    // },
  ];

  const columnsTable: any = [
    {
      title: labels["k1"],
      dataIndex: "k1",
      key: "k1",
      render: (text, record) => (
        <Link
          to={
            "/gover/assessment/detail/" +
            `${record.k0}/${record.k1}/${dateValue}`
          }
        >
          {text}
        </Link>
      ),
      width: 150,
      align: "center",
    },
    {
      title: "感知设备建档情况",
      dataIndex: "info",
      key: "info",
      children: [
        {
          title: labels["k2"],
          dataIndex: "k2",
          key: "k2",
          // width: 100
        },
        {
          title: labels["k3"],
          dataIndex: "k3",
          key: "k3",
          // width: 100
        },
        {
          title: labels["k4"],
          dataIndex: "k4",
          key: "k4",
          // width: 100
        },
      ],
    },
    {
      title: "感知设备抓拍情况",
      dataIndex: "info1",
      key: "info1",
      children: [
        {
          title: labels["k11"],
          dataIndex: "k11",
          key: "k11",
          // width: 100
        },
        {
          title: labels["k21"],
          dataIndex: "k21",
          key: "k21",
          // width: 100
        },
        {
          title: labels["k31"],
          dataIndex: "k31",
          key: "k31",
          // width: 100
        },
        {
          title: labels["k42"],
          dataIndex: "k42",
          key: "k42",
          // width: 100
        },
        {
          title: labels["k51"],
          dataIndex: "k51",
          key: "k51",
          // width: 100
        },
        {
          title: "解析总数",
          dataIndex: "k41",
          key: "k41",
        },
      ],
    },
  ];

  return (
    <Card bordered={false}>
      <VForm
        columns={columns}
        ref={childRef}
        span={6}
        layoutCol={layoutCol}
        initialValues={{ start_time: moment(new Date()), companyType: "1" }}
      />
      <div className={styles.bar}>
        <Bar data={data} />
      </div>
      <div>
        <Table
          rowKey={"k1"}
          dataSource={dataTable}
          columns={columnsTable}
          // scroll={{ y: 240 }}
          bordered
          size="small"
          pagination={false}
          loading={loading}
        />
      </div>
    </Card>
  );
};

export default CheckOffice;
