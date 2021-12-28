import React, { useEffect, useState } from "react";
import { Row, Col, Card, Tag, Space, Divider, Button, Image, Steps, Spin } from "antd";
import { useHistory } from "react-router-dom";
import TotalCard from "./components/TotalCard";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import moment from "moment";
import StandardTable from "@components/Table";
import {
  accessSearchOnce,
  totalDaily,
  inspection,
  accessDetailTag,
  messageCheckhumanImg,
  totalDailyUseOne
} from "@/services/v1";
import { formatDate, getImgUrl, formatDatetime } from "@/utils/utils";
import TotalGraph from "./components/TotalGraph";
import sevenDay from "@/assets/access_management/seven_day.png";
import todayPic from "@/assets/access_management/today_pic.png";
import todayCar from "@/assets/access_management/today_car.png";
import styles from "./index.less";
import {
  messageTimeLine,
  cacheList,
  cacheDetail,
  subimageList,
} from "@/services/v2";

const { Step } = Steps;

const Info = (props) => {
  const [basicInfo, setBasicInfo]: any = useState({});
  // 头部七天和当天数据
  const [dailyTotal, setDailyTotal]: any = useState({});
  // 使用一期接口查询的七天和当天数据
  const [todayTotal, setTodayTotal]:any = useState({});
  const [sevenTotal, setSevenTotal]:any = useState({});

  const [imgInfo, setImageInfo]: any = useState([]);
  const [cacheInfo, setCacheInfo]: any = useState({});
  // 快照时间信息
  const [timeInfo, setTimeInfo]: any = useState({});
  const [typeImg, setTypeImg] = useState("");
  const [tags, setTags]: any = useState([]);

  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const history = useHistory();
  const {
    match: {
      params: { id, device_id },
    },
  } = props;

  const columns = [
    {
      title: "抽查时间",
      dataIndex: "request_at",
      align: 'center',
      render: (val) => <span> {formatDate(val, "YYYY-MM-DD")}</span>,
    },
    {
      title: "抽查结果",
      dataIndex: ["message"],
      align: 'center',
    },
  ];

  useEffect(() => {
    setLoading(true);
    accessSearch();
    // totalDailySearch();
    totalSearchUseOne({
      device_id: device_id,
      start_at: moment().startOf('day').format("YYYYMMDDHHmmss"),
      end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
    },setTodayTotal);
    totalSearchUseOne({
      device_id: device_id,
      start_at: moment().subtract(6,"days").startOf('day').format("YYYYMMDDHHmmss"),
      end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
    },setSevenTotal);

    getTags();
    imgInfoSearch();
    getTimeInfo();
    setLoading(false);
  }, []);
  // 获取报文
  const imgInfoSearch = async () => {
    try {
      setLoading3(true)
      const response: any = await cacheList({
        device_id,
        page_num: 1,
        page_size: 1,
      });
      if (response && response.length && response[0].request_id) {
        const request_id = response[0].request_id;
        const cacheInfo = await cacheDetail({ device_id, request_id });
        const imgInfo = await subimageList({ device_id, request_id });
        const index =
          imgInfo &&
          imgInfo.subImages.findIndex(
            (m) =>
              m.Type === "01" ||
              m.Type === "02" ||
              m.Type === "04" ||
              m.Type === "05" ||
              m.Type === "09"
          );
        if (index > -1) {
          setTypeImg("car");
        } else {
          setTypeImg("face");
        }
        setCacheInfo(cacheInfo && cacheInfo.data || {});
        setImageInfo((imgInfo && imgInfo.subImages) || []);
      } else {
        setCacheInfo({});
        setImageInfo([]);
      }
      setLoading3(false)
    } catch (e) {
      console.error(e);
    }
  };
  const getTimeInfo = async () => {
    try {
      setLoading2(true)
      const res = await messageTimeLine({ id: device_id });
      setTimeInfo(res);
      setLoading2(false)
    } catch (e) {
      console.error(e);
    }
  };

  //基础信息
  const accessSearch = async () => {
    try {
      setLoading1(true)
      const response = await accessSearchOnce({ id });
      setBasicInfo(response || {});
      setLoading1(false)
    } catch (e) {
      console.error(e);
    }
  };

  //查询头部七日和当日数据
  const totalDailySearch = async () => {
    try {
      setLoading(true)
      const response = await totalDaily({ id: device_id });
      setDailyTotal(response || {});
      setLoading(false)
    } catch (e) {
      console.error(e);
    }
  };
//查询头部七日和当日数据 一期接口查询
const totalSearchUseOne = async (params, setData) => {
  try {
    setLoading(true)
    const response = await totalDailyUseOne({ ...params });
    setData(response || {});
    setLoading(false)
  } catch (e) {
    console.error(e);
  }
}

  // 获取标签信息
  const getTags = async () => {
    const res = await accessDetailTag(device_id);
    if (res && res.length > 0) {
      setTags(res);
    }
  };

  const renderItem = (title, type) => {
    const url = getImgUrl(imgInfo, type);
    return (
      <>
        <div className={styles.imageList_title}>{title}</div>
        {url && <Image src={url} height={"100%"} />}
      </>
    );
  };

  return (
    <>
      <Card bordered={false}>
        <Spin tip="Loading..." spinning={loading}>
          <Row gutter={32} justify="space-around">
            <Col>
              <TotalCard
                title="今日人像"
                total={(todayTotal && todayTotal.Face) || 0}
                icon={todayPic}
              />
            </Col>
            <Col>
              <TotalCard
                title="今日车辆"
                total={(todayTotal && todayTotal.Vehicle) || 0}
                icon={todayCar}
              />
            </Col>
            <Col>
              <TotalCard
                title="七天人像总数"
                total={(sevenTotal && sevenTotal.Face) || 0}
                icon={sevenDay}
              />
            </Col>
            <Col>
              <TotalCard
                title="七天车辆总数"
                total={(sevenTotal && sevenTotal.Vehicle) || 0}
                icon={sevenDay}
              />
            </Col>
          </Row>
        </Spin>
        <Divider style={{ color: "#525B68" }} />
        <p className={styles.title}>基础信息</p>
        <Spin tip="Loading..." spinning={loading1}>
          <Row gutter={[24, 12]}>
            <Col span={6}>
              设备编码: {(basicInfo && basicInfo.device_id) || ""}
            </Col>
            <Col span={6}>设备名称: {(basicInfo && basicInfo.alias) || ""}</Col>
            <Col span={6}>经度: {(basicInfo && basicInfo.longitude) || ""}</Col>
            <Col span={6}>纬度: {(basicInfo && basicInfo.latitude) || ""}</Col>
            <Col span={6}>地点: {(basicInfo && basicInfo.alias) || ""}</Col>
            <Col span={6}>
              地点编号: {(basicInfo && basicInfo.place_code) || ""}
            </Col>
            <Col span={6}>设备IP: {(basicInfo && basicInfo.ipv4) || ""}</Col>
            {/* <Col span={6}>设备端口: {(basicInfo && basicInfo.port) || ""}</Col>
            <Col span={6}>
              设备厂商: {(basicInfo && basicInfo.manufactor) || ""}
            </Col> */}
            <Col span={6}>设备型号: {(basicInfo && basicInfo.model) || ""}</Col>
            <Col span={6}>接入来源: {(basicInfo && basicInfo.source) || ""}</Col>
            {/* <Col span={6}>
            最后抓拍时间:{" "}
            {formatDate(
              basicInfo && basicInfo.updated_at,
              "YYYY-MM-DD HH:MM:SS"
            )}
          </Col> */}
          </Row>
        </Spin>
        <Divider />
        <p className={styles.title}>标签信息</p>
        <Space size={32} style={{ marginBottom: 10 }}>
          {tags.map((item, index) => (
            <Tag color="#54627B" key={index}>
              {item}
            </Tag>
          ))}
        </Space>
        <Divider />
        <p className={styles.title}>当日快照</p>
        <Spin tip="Loading..." spinning={loading2}>
          <div className={styles.updateTime}>
            <Steps current={3} size="small">
              <Step title="设备安装时间" description={formatDatetime(timeInfo && timeInfo.install_time, "YYYY-MM-DD HH:mm:ss")} />
              <Step title="设备同步一机一档时间" description={formatDate(timeInfo && timeInfo.last_sync_at, "YYYY-MM-DD HH:mm:ss")} />
              <Step title="最后一次抓拍时间" description={formatDate(timeInfo && timeInfo.capture_at, "YYYY-MM-DD HH:mm:ss")} />
              <Step title="心跳时间" description={formatDate(timeInfo && timeInfo.request_at, "YYYY-MM-DD HH:mm:ss")} />
            </Steps>
          </div>
        </Spin>
        <Spin tip="Loading..." spinning={loading3}>
          <Row>
            <Col span={10}>
              <div className={styles.bigPic}>{renderItem("场景图", "14")}</div>
            </Col>
            <Col span={6}>
              <div className={styles.centerUpPic}>
                {typeImg === "face"
                  ? renderItem("压缩背景", "99")
                  : renderItem("车牌彩色小图", "02")}
              </div>
              <div style={{ display: "flex" }}>
                <div className={styles.carPic}>
                  {typeImg === "face"
                    ? renderItem("人脸图", "11")
                    : renderItem("车辆特写图", "09")}
                </div>
                <div>
                  {typeImg === "face" ? (
                    <div className={styles.carPic}>
                      {renderItem("人员图", "10")}
                    </div>
                  ) : (
                    <>
                      <div className={styles.drivePic}>
                        {renderItem("驾驶员面部特征图", "04")}
                      </div>
                      <div className={styles.drivePic}>
                        {renderItem("副驾驶面部特征图", "05")}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </Col>

            <Col span={8}>
              <p>报文</p>
              <JSONInput
                locale={locale}
                height="380px"
                width="100%"
                colors={{
                  background: "transparent",
                  default: "#848585",
                }}
                style={{
                  contentBox: {
                    color: "#848585",
                  },
                }}
                viewOnly
                placeholder={cacheInfo}
              />
            </Col>
          </Row>
        </Spin>
        <Divider />
        <p className={styles.title}>抽检信息</p>
        <StandardTable
          columns={columns}
          services={() => {
            const {
              match: {
                params: { device_id },
              },
            } = props;

            return inspection({
              device_id: device_id,
            });
          }}
          rowSelection={false}
          tableProps={{
            pagination: false,
          }}
        />
        <br />
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id,period:"day",group_by:"date"});
          }}
          title="人像上传量"
          dataType={1}

        />
        <br />
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id,period:"day",group_by:"date"});
          }}
          title="车辆上传量"
          dataType={2}

        />
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>
            取消
          </Button>
        </div>
      </Card>
    </>
  );
};

export default Info;
