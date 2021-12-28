import React, { useEffect, useState, useRef } from "react";
import { Table, Card, Divider, Tooltip } from "antd";
import "./index.less";
import moment from "moment";
import {
  performanceBrokenLineSearch,
  perceptionDeviceRecordSearch,
  deviceCaptureSearch,
} from "@/services/v1";
import Line from "./charts/line";
import styles from "./index.less";
import { formatDate, formatStartData } from "@/utils/utils";
import { useHistory } from "react-router-dom";
import { LeftCircleOutlined, QuestionCircleOutlined } from "@ant-design/icons";

const Detail = (props) => {
  const {
    match: { params = {} },
  } = props;
  const { place_code, start_time, place } = params;

  const [loading, setLoading]: any = useState(false);
  const [loading1, setLoading1]: any = useState(false);
  const [dataTable, setDateTable]: any = useState([]);
  const [dataTable1, setDateTable1]: any = useState([]);
  const [dataTable2, setDateTable2]: any = useState([]);
  const [dataTable3, setDateTable3]: any = useState([]);
  const [dataTable4, setDateTable4]: any = useState([
    {
      v1: "设备经纬度信息错误",
      v2: "0",
    },
    {
      v1: "ip地址不符合规范",
      v2: "0",
    },
    {
      v1: "设备位置信息不符合规范",
      v2: "0",
    },
    {
      v1: "设备属性数据未更新",
      v2: "0",
    },
  ]);
  const [data, setData]: any = useState([]);
  const [dateX, setDate]: any = useState(null);
  const [labels, setLabels]: any = useState({});
  const [labels1, setLabels1]: any = useState({});
  const history = useHistory();

  useEffect(() => {
    searchHandel();
  }, []);

  const searchHandel = () => {
    setLoading(true);
    performanceBrokenLineSearch({
      start_time,
      place_code,
    }).then((res) => {
      setLoading(false);
      if (res) {
        setData(res);
      }
    });
  };

  // // 修改时间
  // const onChangeDate = () => {
  //   searchHandel();
  // };
  const getRank = (value) => {
    return value && value !== "-"
      ? `${Number((Number(value) * 100).toFixed(2))}%`
      : "-";
  };

  const columns: any = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "感知设备数",
      dataIndex: "c1",
      key: "c1",
      align: "center",
      render: (_, record) => (
        <span>
          {record.k1}({getRank(record.k2)})
        </span>
      ),
    },
    {
      title: "抓拍数据",
      dataIndex: "c2",
      key: "c2",
      align: "center",
      render: (_, record) => (
        <span>
          {record.k3}({getRank(record.k4)})
        </span>
      ),
    },
  ];
  const columns1: any = [
    {
      title: "",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "感知设备数",
      dataIndex: "c1",
      key: "c1",
      align: "center",
      render: (_, record) => (
        <span>
          {record.k1}({getRank(record.k2)})
        </span>
      ),
    },
    {
      title: "人卡设备",
      dataIndex: "c2",
      key: "c2",
      align: "center",
      render: (_, record) => (
        <span>
          {record.k3}({getRank(record.k4)})
        </span>
      ),
    },
  ];
  const getTitle = (title, tooltip) => {
    return (
      <span>
        {title}{" "}
        <Tooltip placement="topLeft" title={tooltip}>
          <QuestionCircleOutlined />
        </Tooltip>
      </span>
    );
  };
  const columns2: any = [
    {
      title: getTitle(
        labels["deviceNoseTotal"],
        <div>
          <div>
            匹配感知前端设备数/感知设备总数*30+本地上传有效设备数/区域最多上传有效设备数*20-设备质量不合格数量*1（最多扣20分）
          </div>
          <div>
            匹配感知前端设备数：省厅感知资源库与全省感知网资产运营服务平台编码、名称、经纬度匹配的人像、车辆感知前端设备
          </div>
          <div>感知设备总数：上传至省厅感知资源库的人像与车辆抓拍设备总数</div>
        </div>
      ),
      dataIndex: "deviceNoseTotal",
      key: "deviceNoseTotal",
      align: "center",
      render: (_, record) => (
        <span>
          {record["p2"]}/{record["p3"]}
        </span>
      ),
    },
    {
      title: labels["p4"],
      dataIndex: "p4",
      key: "p4",
      align: "center",
      width: 150,
    },
    {
      title: labels["p5"],
      dataIndex: "p5",
      key: "p5",
      align: "center",
      width: 150,
    },
  ];
  const columns3: any = [
    {
      title: getTitle(
        labels["localUploadDeviceTotal"],
        <div>
          <div>
            本地上传有效设备数：本地上传至省厅感知资源库的人像设备与车辆设备的当日在线数量
          </div>
          <div>
            区域最多上传有效设备数：各区域上传至省厅感知资源库的人像与车辆设备的当日在线最多的数量
          </div>
        </div>
      ),
      dataIndex: "localUploadDeviceTotal",
      key: "localUploadDeviceTotal",
      align: "center",
      render: (_, record) => (
        <span>
          {record["k1"]}/{record["k2"]}({record["k3"]})
        </span>
      ),
    },
    {
      title: labels["k4"],
      dataIndex: "k4",
      key: "k4",
      align: "center",
      width: 150,
    },
    {
      title: labels["k5"],
      dataIndex: "k5",
      key: "k5",
      align: "center",
      width: 150,
    },
  ];
  const d = {
    v1: "设备质量不合格数量（总数量：0)",
    v2: "设备数",
  };
  const columns4: any = [
    {
      title: getTitle(
        d["v1"],
        <div>
          <div>
            设备质量不合格数量：感知资源库中设备经纬度信息明显错误的、设备位置信息明显错误的。全省资产运营服务平台中IP地址不符合规范、设备属性数据没有及时更新的点位
          </div>
          <div>设备经纬度信息错误：经纬度信息为空、不在辖区的</div>
          <div>
            IP地址不符合规范：感知资源库中设备编号与资产运营服务平台中匹配且IP地址不在32.x.x.x段内
          </div>
          <div>设备位置信息不符合规范：经纬度精度不足小数点后六位的</div>
          <div>
            设备属性数据未及时更新：感知资源库中设备编号与资产运营服务平台中匹配且资产平台中设备属性没有补充完整的
          </div>
        </div>
      ),
      dataIndex: "v1",
      key: "v1",
      align: "center",
    },
    {
      title: d["v2"],
      dataIndex: "v2",
      key: "v2",
      align: "center",
    },
  ];

  const onSelectDate = (value) => {
    const date = formatStartData(value);
    setDate(date);
    setLoading(true);
    perceptionDeviceRecordSearch({
      place_code,
      start_time: date,
    }).then((res) => {
      setLoading(false);
      if (res) {
        const {
          displayMap = {},
          deviceNoseTotal = {},
          localUploadDeviceTotal = {},
        } = res;
        setLabels(displayMap);
        setDateTable2([deviceNoseTotal || {}]);
        setDateTable3([localUploadDeviceTotal || {}]);
      }
    });
    setLoading1(true);
    deviceCaptureSearch({ place_code, start_time: date }).then((res) => {
      setLoading1(false);
      if (res) {
        const {
          displayMap = {},
          carDeviceCaptureTotal = [],
          faceDeviceCaptureTotal = [],
        } = res;
        setLabels1(displayMap);
        setDateTable(carDeviceCaptureTotal);
        setDateTable1(faceDeviceCaptureTotal);
      }
    });
  };

  return (
    <div style={{ minWidth: 1000 }}>
      <Card
        className={styles.detail_assess}
        bordered={false}
        title={
          <div className={styles.header}>
            <LeftCircleOutlined
              onClick={() => history.goBack()}
              className={styles.back}
            />
            <span className={styles.date}>
              {formatDate(start_time, "YYYY/MM/DD")}
            </span>
            <span>考核明细-{place}</span>
          </div>
        }
      >
        <div className={styles.bar}>
          {data && data.length ? (
            <Line data={data} onSelectDate={onSelectDate} />
          ) : (
            ""
          )}
        </div>
      </Card>
      {dateX ? (
        <Card
          className={styles.detail_assess}
          bordered={false}
          title={
            <div className={styles.header}>
              <span className={styles.date}>
                {formatDate(dateX, "YYYY/MM/DD")}
              </span>
              <span>考核明细</span>
            </div>
          }
        >
          <div>
            <Divider orientation="left" plain>
              感知设备建档情况
            </Divider>
            <div className={styles.infoDetail}>
              <div className={styles.item}>
                <Table
                  rowKey={"k1"}
                  dataSource={dataTable2}
                  columns={columns2}
                  // scroll={{ y: 240 }}
                  bordered
                  size="small"
                  pagination={false}
                  loading={loading}
                  style={{ marginBottom: 37 }}
                />
                <Table
                  rowKey={"k3"}
                  dataSource={dataTable3}
                  columns={columns3}
                  // scroll={{ y: 240 }}
                  bordered
                  size="small"
                  pagination={false}
                  loading={loading}
                />
              </div>
              <div className={styles.item}>
                <Table
                  rowKey={"v1"}
                  dataSource={dataTable4}
                  columns={columns4}
                  // scroll={{ y: 240 }}
                  bordered
                  size="small"
                  pagination={false}
                  loading={loading}
                />
              </div>
            </div>
          </div>
          <div>
            <Divider orientation="left" plain>
              感知设备抓拍情况
            </Divider>
            <div className={styles.infoDetail}>
              <div className={styles.item}>
                <Table
                  rowKey={"name"}
                  dataSource={dataTable}
                  columns={columns}
                  // scroll={{ y: 240 }}
                  bordered
                  size="small"
                  pagination={false}
                  loading={loading1}
                />
              </div>
              <div className={styles.item}>
                <Table
                  rowKey={"name"}
                  dataSource={dataTable1}
                  columns={columns1}
                  // scroll={{ y: 240 }}
                  bordered
                  size="small"
                  pagination={false}
                  loading={loading1}
                />
              </div>
            </div>
          </div>
        </Card>
      ) : (
        ""
      )}
    </div>
  );
};

export default Detail;
