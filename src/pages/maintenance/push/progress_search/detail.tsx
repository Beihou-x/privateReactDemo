import React, { Component, Suspense } from "react";
import moment from "moment";
import {
  Row,
  Col,
  Card,
  Table,
  Button,
  Radio,
  Spin,
  DatePicker,
  Tabs,
} from "antd";
import styles from "./SalesCard.less";
// import GroupLineChart from "./GroupLineChart";
// import LineChart from "./LineChart";
import { pushProgressSearch, pushProgressSearchDetail } from "@/services/v2";
import Line from "./line";
import testData from "./data.json";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

const tabsDatebaidu = [
  { name: "人脸上传量", idkey: "faceForward", idtype: "Forwardnone" },
];
const tabsDatekeda = [
  { name: "车辆上传量", idkey: "carForward", idtype: "Forwardnone" },
];
const tabsDateyisa = [
  { name: "人脸上传量", idkey: "faceForward", idtype: "Forwardnone" },
  { name: "车辆上传量", idkey: "carForward", idtype: "Forwardnone" },
];
const tabsDateForward = [
  { name: "人像推送转发量", idkey: "facePushForward" },
  { name: "车辆推送转发量", idkey: "carPushForward" },
];

const columns: any = [
  {
    title: "统计时间",
    dataIndex: "time",
    key: "time",
    width: 150,
    defaultSortOrder: "ascend",
    sorter: (a, b) => a.Time - b.Time,
    sortDirections: ["descend", "ascend"],
    render: (text) => text,
  },
  // {
  //   title: '数量',
  //   dataIndex: 'total',
  //   key: 'total',
  //   width:100,
  // },
  {
    title: "上传量",
    dataIndex: "total",
    key: "total",
    width: 100,
  },
  // {
  //   title: '转发抓拍量',
  //   dataIndex: 'total1',
  //   key: 'total1',
  //   width:100,
  // },
];

export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;
  now.setHours(23);
  now.setMinutes(59);
  now.setSeconds(59);

  if (type === 0) {
    return [moment(now.getTime() - (7 * oneDay - 1000)), moment(now)];
  }
  return [moment(now.getTime() - (1 * oneDay - 1000)), moment()];
}

class PushInfo extends Component {
  state: any = {
    byhourKey: 1, // 按小时统计
    type: 1, // 人像
    rangePickerValue: getTimeDistance(1), // 过去24小时
    rangePickerValueChange: false,
    tabsDate: [],
    pushList: [],
    infoLoading: true,
    tableList: {},
    pushListLineData: [],
    byhourKeyLineData: 1, // 按小时统计
    typeLineData: 1, // 人像
    rangePickerValueLineData: getTimeDistance(1), // 过去24小时
    rangePickerValueLineDataChange: false,
    infoLoadingLineData: true,
  };

  componentDidMount() {
    const {
      match: {
        params: { code, model },
      },
    }: any = this.props;
    if (code === "baidu") {
      this.setState({
        tabsDate: tabsDatebaidu,
      });
    } else if (code === "keda") {
      this.setState({
        tabsDate: tabsDatekeda,
        type: 2, // 车辆
      });
    } else {
      this.setState({
        tabsDate: tabsDateyisa,
      });
    }
    const { rangePickerValue, byhourKey, type } = this.state;
    this.searchData(rangePickerValue, byhourKey, code === "keda" ? 2 : type);

    const { rangePickerValueLineData, byhourKeyLineData, typeLineData } =
      this.state;
    this.searchDataLineData(
      rangePickerValueLineData,
      byhourKeyLineData,
      code === "keda" ? 2 : typeLineData
    );

    pushProgressSearch({
      from: 0,
      limit: 100,
    }).then((res) => {
      if (res) {
        this.setState({
          tableList:
            ((res && res.data) || []).find((n) => n.code === code) || {},
        });
      }
    });
  }

  searchData = (time: any = [], byhour: any = "", typeForward: any = "") => {
    const {
      match: {
        params: { code, model },
      },
    }: any = this.props;

    const { type } = this.state;
    this.setState({
      infoLoading: true,
    });
    pushProgressSearchDetail({
      start: parseInt(
        moment(time[0]).startOf("day").format("YYYYMMDDHHmmss"),
        10
      ),
      end: parseInt(moment(time[1]).endOf("day").format("YYYYMMDDHHmmss"), 10),
      type: parseInt(!typeForward ? type : typeForward, 10),
      by_hour: parseInt(byhour, 10),
      subscriber_id: code,
      device_id: null,
    }).then((res) => {
      if (res) {
        this.setState({
          pushList: !res.Message && res || [],
          // pushList: testData,
          infoLoading: false,
        });
        // if (one&&one==='one') {
        //   console.log('one', one);
        //   this.setState({
        //     pushListLineData: !res.Message && res || [],
        //     infoLoadingLineData:false,
        //   });
        // }
      }
    });
  };

  searchDataLineData = (
    time: any = [],
    byhour: any = "",
    typeForward: any = ""
  ) => {
    const {
      match: {
        params: { code, model },
      },
    }: any = this.props;

    const { typeLineData } = this.state;
    this.setState({
      infoLoadingLineData: true,
    });
    pushProgressSearchDetail({
      start: parseInt(
        moment(time[0]).startOf("day").format("YYYYMMDDHHmmss"),
        10
      ),
      end: parseInt(moment(time[1]).endOf("day").format("YYYYMMDDHHmmss"), 10),
      type: parseInt(!typeForward ? typeLineData : typeForward, 10),
      by_hour: parseInt(byhour, 10),
      subscriber_id: code,
      device_id: null,
    }).then((res) => {
      if (res) {
        this.setState({
          pushListLineData: !res.Message && res || [],
          // pushListLineData: testData,
          infoLoadingLineData: false,
        });
      }
    });
  };

  selectByHour = (type) => {
    const { rangePickerValue, rangePickerValueChange } = this.state;
    if (!rangePickerValueChange) {
      this.setState({
        rangePickerValue: getTimeDistance(parseInt(type, 10)),
      });
    }
    this.setState({
      byhourKey: parseInt(type, 10),
    });
    this.searchData(
      !rangePickerValueChange
        ? getTimeDistance(parseInt(type, 10))
        : rangePickerValue,
      parseInt(type, 10)
    );
  };

  selectByHourLineData = (type) => {
    const { rangePickerValueLineData, rangePickerValueLineDataChange } =
      this.state;
    if (!rangePickerValueLineDataChange) {
      this.setState({
        rangePickerValueLineData: getTimeDistance(parseInt(type, 10)),
      });
    }
    this.setState({
      byhourKeyLineData: parseInt(type, 10),
    });
    this.searchDataLineData(
      !rangePickerValueLineDataChange
        ? getTimeDistance(parseInt(type, 10))
        : rangePickerValueLineData,
      parseInt(type, 10)
    );
  };

  handleRangePickerChange = (date) => {
    this.setState({
      rangePickerValue: date,
      rangePickerValueChange: true,
    });
    const { byhourKey } = this.state;
    this.searchData(date, byhourKey);
  };

  handleRangePickerChangeLineData = (date) => {
    this.setState({
      rangePickerValueLineData: date,
      rangePickerValueLineDataChange: true,
    });
    const { byhourKeyLineData } = this.state;
    this.searchDataLineData(date, byhourKeyLineData);
  };

  isActive = (type) => {
    const { byhourKey } = this.state;
    if (parseInt(type, 10) === byhourKey) {
      return styles.currentDate;
    }
    return "";
  };

  isActiveLineData = (type) => {
    const { byhourKeyLineData } = this.state;
    if (parseInt(type, 10) === byhourKeyLineData) {
      return styles.currentDate;
    }
    return "";
  };

  selectTabs = (activeKey) => {
    this.setState({
      type: activeKey === "faceForward" ? 1 : 2,
    });
    const { rangePickerValue, byhourKey } = this.state;
    this.searchData(
      rangePickerValue,
      byhourKey,
      activeKey === "faceForward" ? 1 : 2
    );
  };

  selectTabsLineData = (activeKey) => {
    this.setState({
      typeLineData: activeKey === "facePushForward" ? 1 : 2,
    });
    const { rangePickerValueLineData, byhourKeyLineData } = this.state;
    this.searchDataLineData(
      rangePickerValueLineData,
      byhourKeyLineData,
      activeKey === "facePushForward" ? 1 : 2
    );
  };

  render() {
    const {
      match: {
        params: { code, model },
      },
      history
    }: any = this.props;

    const {
      rangePickerValue,
      byhourKey,
      tabsDate,
      pushList,
      infoLoading,
      tableList,
    } = this.state;
    const {
      rangePickerValueLineData,
      byhourKeyLineData,
      pushListLineData,
      infoLoadingLineData,
    } = this.state;
    const lineData: any = [];
    pushListLineData
      .sort((a: any, b: any) => a.time - b.time)
      .forEach((n: any) => {
        const Time =
          byhourKeyLineData === 0
            ? moment(n.time * 1000).format("YYYY-MM-DD")
            : moment(n.time * 1000).format("YYYY-MM-DD HH:mm:ss");

        lineData.push({
          time: Time,
          Time: n.time,
          x: Time,
          y: n.forward,
        });
      });

    const salesData: any = [];
    const dataSource: any = [];
    const chartDataOne = { name: "上传量" };
    const chartDataTwo = { name: "转发抓拍量" };
    pushList
      .sort((a: any, b: any) => a.time - b.time)
      .forEach((n: any) => {
        const Time =
          byhourKey === 0
            ? moment(n.time * 1000).format("YYYY-MM-DD")
            : moment(n.time * 1000).format("YYYY-MM-DD HH:mm:ss");

        salesData.push({
          time: Time,
          上传量: n.upload,
          转发抓拍量: n.forward_captured,
          x: Time,
          y: n.forward_captured,
        });

        dataSource.push({
          time: Time,
          Time: n.time,
          total: n.upload,
          total1: n.forward_captured,
        });

        chartDataOne[Time] = n.forward_captured;
        chartDataTwo[Time] = n.forward_captured;
      });
    return (
      <Card bordered={false}>
        <p style={{ fontSize: "24px", fontWeight: "bolder" }}>
          {tableList.name ? tableList.name : code}
        </p>
        {model && parseInt(model, 10) !== 1 ? (
          <Card
            bordered={false}
            bodyStyle={{ padding: 0 }}
            style={{ marginBottom: 24 }}
          >
            <Spin spinning={infoLoadingLineData}>
              <div className={styles.salesCard}>
                <Tabs
                  onChange={this.selectTabsLineData}
                  tabBarExtraContent={
                    <div className={styles.salesExtraWrap}>
                      <div className={styles.salesExtra}>
                        <a
                          className={this.isActiveLineData(1)}
                          onClick={() => this.selectByHourLineData(1)}
                        >
                          按小时统计
                        </a>
                        <a
                          className={this.isActiveLineData(0)}
                          onClick={() => this.selectByHourLineData(0)}
                        >
                          按天统计
                        </a>
                      </div>
                      <RangePicker
                        value={rangePickerValueLineData}
                        style={{ width: 256 }}
                        onChange={this.handleRangePickerChangeLineData}
                      // disabled
                      />
                    </div>
                  }
                  size="large"
                  tabBarStyle={{ marginBottom: 24 }}
                >
                  {tabsDateForward.map((item) => (
                    <TabPane tab={item.name} key={item.idkey}>
                      <div className={styles.salesBar}>
                        <Line
                          data={lineData}
                          color={
                            item.name === "人像推送转发量"
                              ? "#ff7f0e"
                              : "#f6d341"
                          }
                          byhourKey={byhourKeyLineData}
                          height={295}
                        />
                        {/* <LineChart
                          data={lineData}
                          color={item.name==='人像推送转发量'?'#ff7f0e':'#f6d341'}
                          byhourKey={byhourKeyLineData}
                          height={295}
                        /> */}
                        {/* <LineChart
                          height={295}
                          title={null}
                          data={lineData}
                          byhourKey={byhourKeyLineData}
                          color={item.name==='人像推送转发量'?'#ff7f0e':'#f6d341'}
                        /> */}
                      </div>
                    </TabPane>
                  ))}
                </Tabs>
              </div>
            </Spin>
          </Card>
        ) : null}
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Spin spinning={infoLoading}>
            <div className={styles.salesCard}>
              <Tabs
                onChange={this.selectTabs}
                tabBarExtraContent={
                  <div className={styles.salesExtraWrap}>
                    <div className={styles.salesExtra}>
                      <a
                        className={this.isActive(1)}
                        onClick={() => this.selectByHour(1)}
                      >
                        按小时统计
                      </a>
                      <a
                        className={this.isActive(0)}
                        onClick={() => this.selectByHour(0)}
                      >
                        按天统计
                      </a>
                    </div>
                    <RangePicker
                      value={rangePickerValue}
                      style={{ width: 256 }}
                      onChange={this.handleRangePickerChange}
                    // disabled
                    />
                  </div>
                }
                size="large"
                tabBarStyle={{ marginBottom: 24 }}
              >
                {tabsDate.map((item: any) => (
                  <TabPane tab={item.name} key={item.idkey}>
                    <div className={styles.salesBar}>
                      <Line
                        height={295}
                        title={null}
                        data={salesData}
                        byhourKey={byhourKey}
                        color={item.name === '人脸上传量' ? '#4093fe' : '#53c15c'}
                      />
                      {/* <GroupLineChart
                        height={295}
                        title={null}
                        data={salesData}
                        byhourKey={byhourKey}
                        color={item.name==='人脸上传量'?'#4093fe':'#53c15c'}
                      /> */}
                      {/* <LineChart
                        height={295}
                        title={null}
                        data={salesData}
                        byhourKey={byhourKey}
                      /> */}
                    </div>
                    <div className={styles.dataTable}>
                      <Table
                        // rowKey={record => record.index}
                        rowKey={(record) =>
                          `${record.index}${record.Time}${byhourKey}${item.name}${item.idkey}`
                        }
                        size="middle"
                        bordered
                        columns={
                          // item.idtype==='Forward'?
                          // [...columns, {title: '推送目的地', dataIndex: 'Forward',key: 'Forward',width:100,}]
                          // :columns
                          columns
                        }
                        dataSource={[...dataSource]}
                        scroll={{ y: 300 }}
                        pagination={false}
                      />
                    </div>
                  </TabPane>
                ))}
              </Tabs>
            </div>
          </Spin>
        </Card>
        <div style={{ background: '#2B3748', textAlign: 'right' }}>
          <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        </div>
      </Card>
    );
  }
}

export default PushInfo;
