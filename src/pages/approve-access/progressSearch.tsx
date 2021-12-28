import React, { useEffect, useState } from "react";
import {
  Form,
  Card,
  Input,
  Button,
  Select,
  Progress,
  Table,
  Divider,
} from "antd";
import { useHistory } from "react-router-dom";
import {
  forwardManageSearch,
  forwardManageProgress,
  forwardDetailDeviceList,
} from "@/services/v1";
import {
  forwardServiceMonitorSearch
} from "@/services/v2";
import styles from "./management.less";
import { formatDate, filterCategory } from "@/utils/utils";

const { Option } = Select;

type AddFormProps = {};

const ProgressSearch: React.FC<AddFormProps> = (props) => {
  const [form] = Form.useForm();
  const history = useHistory();
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const [headData, setHeadData]: any = useState({});
  const [deviceList, setDeviceList]: any = useState([]);
  const [checkPoint, setCheckPoint]: any = useState({});
  const [data, setData]: any = useState([]);
  const [avg, setAvg]: any = useState(0);

  const types = filterCategory("摄像机功能类型") || [];
  const sources = filterCategory("接入来源") || [];
  useEffect(() => {
    forwardManageProgress(id).then((res) => {
      if (res) {
        setHeadData(res);
      }
    });
    forwardServiceMonitorSearch({
      type: 'latency',
      category: 'forward',
      service_id: id
    }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setData(arr.length > 0 ? arr[arr.length - 1] : {});
      setAvg(res && res.data && res.data.threshold || 0);
    })
    getTableData({});

  }, [id]);

  const getTableData = (params) => {
    forwardDetailDeviceList(params, id).then((res) => {
      if (res && res.items) {
        setDeviceList(res.items.devices);
        setCheckPoint(res.items.device_map);
      }
    });
  };

  const handleSearch = (val) => {
    getTableData(val);
  };
  const handleReset = () => {
    form.resetFields();
    getTableData({});
  };
  const getStatus = (val) => {
    if (val === "0") {
      return "异常";
    } else if (val === "1") {
      return "正常";
    } else if (val === "-1") {
      return "删除";
    } else {
      return "正常";
    }
  };

  const columns: any = [
    {
      title: "国标ID",
      align: "center",
      dataIndex: "device_id",
    },
    {
      title: "设备名称",
      align: "center",
      dataIndex: "alias",
    },
    {
      title: "类型",
      align: "center",
      dataIndex: "function_type",
    },
    {
      title: "标签",
      align: "center",
      dataIndex: "tag_name",
    },
    {
      title: "来源",
      align: "center",
      dataIndex: "source",
    },
    {
      title: "检测状态",
      align: "center",
      dataIndex: "status",
      render: (val) => <span>{getStatus(val)}</span>,
    },
    // {
    //   title: "转发状态",
    //   align: "center",
    //   dataIndex: "status2",
    // },
  ];
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const getPercent = (start: number, end: number, now: number) => {
    if (now > end) {
      return 100
    } else {
      // let a = Number(((now - start)/(end-start)).toFixed(4))*100
      let a = parseFloat((((now - start) / (end - start)) * 100).toFixed(2));
      return a
    }
  }

  const getTime = (begin, end) => {
    //计算出相差天数
    let date3 = end - begin;
    let days = Math.floor(date3 / (24 * 3600))

    //计算出小时数

    let leave1 = date3 % (24 * 3600)    //计算天数后剩余的毫秒数
    let hours = Math.floor(leave1 / (3600))
    //计算相差分钟数
    let leave2 = leave1 % (3600)        //计算小时数后剩余的毫秒数
    let minutes = Math.floor(leave2 / (60))
    // //计算相差秒数
    // var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
    // var seconds=Math.round(leave3/1000)
    return `${days}天 ${hours}小时 ${minutes} 分钟`
  }

  const getRunTime = (begin, end, now) => {
    if (now > end) {
      return getTime(begin, end);
    } else {
      return getTime(begin, now)
    }
  }

  return (
    <Card bordered={false}>
      <div>
        <div className={styles.dot}>
          <div className={styles.dot_row}>
            <span className={styles.circle}></span>
            <span style={{ marginLeft: 10 }}>{headData.title}</span>
            <span className={styles.serviceName}>{headData.service_name}</span>
          </div>
        </div>
        <div className={styles.rundate}>
          {getRunTime(headData.begin, headData.end, headData.now)}
          {/* {headData.now> headData.end } */}
        </div>
        <div className={styles.progress_row}>
          <div className={styles.part1}>
            <Progress
              percent={getPercent(headData.begin, headData.end, headData.now)}
              // percent={headData.now> headData.end ? 100 : ((headData.now-headData.begin)/(headData.end-headData.begin))*100}
              strokeColor="#1A88EF"
              trailColor="rgba(255, 255, 255, 0.3)"
              strokeWidth={16}
              style={{ width: "100%" }}
              strokeLinecap="square"
              className={styles.progress}
              showInfo={false}
            />
          </div>
          <div className={styles.part2}>
            预计完成时间：
            {formatDate(
              headData && headData.end,
              "YYYY-MM-DD HH:MM:SS"
            )}
          </div>
          <div className={styles.part2}>
            响应时间：
            {data && data[1] ? `${Number(data[1]).toFixed(2)}ms` : '-'}
          </div>
          <div className={styles.part2}>
            时效性：
            {data && data[1] ? (Number(data[1]) >= avg ? '延迟' : '及时') : '-'}
          </div>
        </div>
        <div className={styles.num_row}>
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              应推送设备数<div>{headData.should_push_num}</div>
            </div>
          </div>
          <Divider type="vertical" style={{ height: 64 }} />
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              实际推送设备数<div>{headData.real_push_num}</div>
            </div>
          </div>
          {/* <Divider type="vertical" style={{ height: 64 }} />
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              异常设备数
              <div className={styles.unnomal}>{headData.abnormal_num}</div>
            </div>
          </div> */}
          <Divider type="vertical" style={{ height: 64 }} />
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              今日无数据设备数<div>{headData.no_data_num}</div>
            </div>
          </div>
          {/* <Divider type="vertical" style={{ height: 64 }} />
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              今日推送次数<div>{headData.today_push_num}</div>
            </div>
          </div> */}
          <Divider type="vertical" style={{ height: 64 }} />
          <div className={styles.num_center}>
            <div className={styles.num_width}>
              今日推送图片量<div>{headData.today_push_picture}</div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={styles.title}>最后上传详情</div>
            <div className={styles.dates}>
              <div>
                最后上传时间：
                {formatDate(
                  headData && headData.last_upload_time,
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </div>
              <div className={styles.date2}>
                最后抓拍时间：
                {formatDate(
                  headData && headData.last_capture_time,
                  "YYYY-MM-DD HH:mm:ss"
                )}
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div className={`${styles.title} ${styles.title1}`}>
              类型
              <span style={{ fontSize: "12px", color: "#ccc" }}> (异常设备数为设备编码、经纬度检测异常设备数)</span>
            </div>
            <div className={styles.items}>
              {Object.keys(headData.typeMap || {}).map((item, index) => (
                <div key={index} className={styles.gutter}>
                  {item} <span className={styles.label}>正常：</span>
                  <span className={styles.normal}>
                    {headData.typeMap[item] && headData.typeMap[item].normal}
                  </span>
                  {headData.typeMap[item].abnormal ? (
                    <span className={styles.label} style={{ color: "rgba(254, 116, 144, 1)" }}>异常：{headData.typeMap[item].abnormal}</span>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: 30 }}>
            <div className={`${styles.title} ${styles.title1}`}>
              来源
              <span style={{ fontSize: "12px", color: "#ccc" }}> (异常设备数为设备编码、经纬度检测异常设备数)</span>
            </div>
            <div className={styles.items}>
              {Object.keys(headData.sourceMap || {}).map((item, index) => (
                <div key={index} className={styles.gutter}>
                  {item} <span className={styles.label}>正常：</span>
                  <span className={styles.normal}>
                    {headData.sourceMap[item] &&
                      headData.sourceMap[item].normal}
                  </span>
                  {headData.sourceMap[item].abnormal ? (
                    <span className={styles.label} style={{ color: "rgba(254, 116, 144, 1)" }}>异常：{headData.sourceMap[item].abnormal}</span>
                  ) : (
                    ""
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <Divider />
        <Form
          {...layout}
          layout="inline"
          form={form}
          onFinish={handleSearch}
          style={{ marginLeft: 25, marginTop: 30 }}
        >
          <Form.Item label="国标ID" name="device_id">
            <Input></Input>
          </Form.Item>
          <Form.Item label="设备名称" name="alias">
            <Input></Input>
          </Form.Item>
          <Form.Item label="标签" name="tag_name">
            <Input></Input>
          </Form.Item>

          <Form.Item label="来源" name="source">
            <Select options={sources}></Select>
          </Form.Item>

          <Form.Item label="设备类型" name="function_type">
            <Select options={types}></Select>
          </Form.Item>
          <Form.Item label="检测状态" name="status">
            <Select>
              <Option value="1">正常</Option>
              <Option value="0">异常</Option>
            </Select>
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20, marginLeft: 24 }}
          >
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Form>
      </div>
      <div className={styles.tableContent}>
        <Table bordered columns={columns} dataSource={deviceList} rowKey='device_id'></Table>
        <div className={styles.deviceInfo}>
          {Object.keys(checkPoint || {}).map((m, index) => (
            <span key={index}>
              <span style={{ marginLeft: 20 }}>{m} : </span>
              <span>{checkPoint[m]}</span>
            </span>
          ))}
        </div>
      </div>

      <div style={{ background: "#2B3748", textAlign: "right", marginTop: 10 }}>
        <Button onClick={() => history.goBack()}>取消</Button>
      </div>
    </Card>
  );
};

export default ProgressSearch;
