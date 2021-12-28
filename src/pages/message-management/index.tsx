import React, { useEffect, useState } from "react";
import SearchForm from "@components/SearchForm";
import { Input, Divider, Card, Row, Col, Space, Spin, Image, Button, Steps } from "antd";
import {
  messageCheckhumanImg,
  accessSearchOnce,
  totalDaily,
  totalDailyUseOne
} from "@/services/v1";
import {
  messageDeviceInfo,
  messageTimeLine,
  cacheList,
  cacheDetail,
  subimageList,
} from "@/services/v2";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import moment from 'moment'
import styles from "./index.less";
import { formatDate, getImgUrl, formatDatetime,getDeviceStatus } from "@/utils/utils";
import sevenDay from "@/assets/access_management/seven_day.png";
import todayPic from "@/assets/access_management/today_pic.png";
import todayCar from "@/assets/access_management/today_car.png";
import TotalCard from "@/pages/access-management/components/TotalCard";

import TotalGraph from "@/pages/access-management/components/TotalGraph";

const { Step } = Steps;

const MessageManagement = () => {
  useEffect(() => { }, []);
  const [basicInfo, setBasicInfo]: any = useState({});
  // 头部七天和当天数据
  const [dailyTotal, setDailyTotal]: any = useState({});
  // 使用一期接口查询的七天和当天数据
  const [todayTotal, setTodayTotal]:any = useState({});
  const [sevenTotal, setSevenTotal]:any = useState({});
  
  const [imgInfo, setImageInfo]: any = useState([]);
  const [cacheInfo, setCacheInfo]: any = useState({});
  const [typeImg, setTypeImg] = useState("car");
  // 查询的设备编码
  const [deviceId, setDeviceId] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [loading3, setLoading3] = useState(false);

  const [deviceInfo, setDeviceInfo]: any = useState({});
  // 快照时间信息
  const [timeInfo, setTimeInfo]: any = useState({});

  const [timestamp,setTimestamp] = useState(0);

  const getData = (id) => {
    if(Object.keys(id).length) {
      setLoading(true);
      setDeviceId(id.id);
      accessSearch(id);
      // totalDailySearch(id);
      totalSearchUseOne({
        device_id: id.id,
        start_at: moment().startOf('day').format("YYYYMMDDHHmmss"),
        end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
      },setTodayTotal);
      totalSearchUseOne({
        device_id: id.id,
        start_at: moment().subtract(6,"days").startOf('day').format("YYYYMMDDHHmmss"),
        end_at: moment().endOf('day').format("YYYYMMDDHHmmss"),
      },setSevenTotal);

      getDeviceInfo(id.id);
      getTimeInfo(id);
      imgInfoSearch(id.id);
      setTimestamp(new Date().getTime());
      setLoading(false);
    }else {
      setDeviceId('');
      setBasicInfo({});
      setDailyTotal({});
      setCacheInfo({});
      setImageInfo([]);
      setDeviceInfo({});
      setTimeInfo({});
      setTodayTotal({});
      setSevenTotal({});
    }
    
  };

  // 获取报文
  const imgInfoSearch = async (device_id) => {
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
        setCacheInfo(cacheInfo&&cacheInfo.data ||{});
        setImageInfo((imgInfo && imgInfo.subImages) || []);
      } else {
        setCacheInfo({});
        setImageInfo([]);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading3(false);
    }
  };

  //基础信息
  const accessSearch = async (params) => {
    try {
      setLoading1(true)
      const response = await accessSearchOnce({ ...params });
      setBasicInfo(response || {});
      setLoading1(false)
    } catch (e) {
      console.error(e);
    }
  };
  //查询头部七日和当日数据
  const totalDailySearch = async (params) => {
    try {
      setLoading(true)
      const response = await totalDaily({ ...params });
      setDailyTotal(response || {});
      setLoading(false)
    } catch (e) {
      console.error(e);
    }
  };
  // 一期接口查询
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


  const getDeviceInfo = async (id) => {
    try {
      const res = await messageDeviceInfo(id);
      setDeviceInfo(res);
    } catch (e) {
      console.error(e);
    }
  };
  // 获取时间轴信息
  const getTimeInfo = async (params) => {
    try {
      setLoading2(true)
      const res = await messageTimeLine({ ...params });
      setTimeInfo(res);
      setLoading2(false)
    } catch (e) {
      console.error(e);
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
  // 报文下载
  const messageDownload = () => {
    const blobUrl = window.URL.createObjectURL(
      new Blob([JSON.stringify(cacheInfo)], { type: 'application/json' })
    );
    const filename = '设备报文.txt';
    const a = document.createElement('a');
    a.href = blobUrl;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(blobUrl);
    document.body.removeChild(a);
  }

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "设备编码",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={getData}
        />
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
        <Spin tip="Loading..." spinning={loading1}>
          <p className={styles.title}>基础信息</p>
          <Row gutter={[24, 12]}>
            <Col span={6}>设备编码: {(deviceInfo && deviceInfo.id) || ""}</Col>
            <Col span={6}>设备状态: {getDeviceStatus(deviceInfo && deviceInfo.status)}</Col>
            <Col span={6}>
              警报发送名称: {(deviceInfo && deviceInfo.alarm_send_name) || ""}
            </Col>
            <Col span={6}>
              经度: {(deviceInfo && deviceInfo.longitude) || ""}
            </Col>
            <Col span={6}>
              纬度: {(deviceInfo && deviceInfo.latitude) || ""}
            </Col>
            <Col span={6}>地点: {(deviceInfo && deviceInfo.place_name) || ""}</Col>
            <Col span={6}>
              地点编号: {(deviceInfo && deviceInfo.place_code) || ""}
            </Col>
            <Col span={6}>设备IP: {(deviceInfo && deviceInfo.device_ip) || ""}</Col>
            {/* <Col span={6}>
              设备端口: {(deviceInfo && deviceInfo.device_port) || ""}
            </Col>
            <Col span={6}>
              设备厂商: {(deviceInfo && deviceInfo.manufactor_code) || ""}
            </Col> */}
            <Col span={6}>
              设备型号: {(deviceInfo && deviceInfo.device_model) || ""}
            </Col>
            <Col span={6}>
              同步名称: {(deviceInfo && deviceInfo.sync_name) || ""}
            </Col>
            {/* <Col span={6}>
              安装时间: {formatDate(
                deviceInfo && deviceInfo.install_time,
                "YYYY-MM-DD HH:MM:SS"
              )}
            </Col> */}
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
        <Spin tip="Loading..." spinning={loading2}>
          <p className={styles.title}>当日快照</p>
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
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <p>报文</p>
                <Button size="small" onClick={messageDownload}>报文下载</Button>
              </div>
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
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id:deviceId,period:"day",group_by:"date"});
          }}
          title="人像上传量"
          deviceId={deviceId}
          timestamp={timestamp}
          dataType={1}
        />
        <TotalGraph
          services={(start, end) => {
            return messageCheckhumanImg({start, end, device_id:deviceId,period:"day",group_by:"date"});
          }}
          title="车辆上传量"
          deviceId={deviceId}
          timestamp={timestamp}
          dataType={2}
        />
      </Card>
    </>
  );
};

export default MessageManagement;
