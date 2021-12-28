import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { Popover} from "antd";
import {QuestionCircleOutlined} from '@ant-design/icons';
import Nav from "./child/nav";
import HeadItem from "./child/head";
import DeviceInfo from "./child/unitDeviceInfo";
import Dashboard from "./child/dashboard";
import BarSchema from "./child/barSchema";
import TodayQuality from './child/todayQuality';
import TodayDevice from './child/todayDevice';
import {
  access_cloud_face_super_total,
  data_schema_search
} from "@/services/access_cloud";

const SystemView = (props) => {
  const title = ["排名", "区域", "设备编码", "图片有效率"];
  // 及时性
  const [faceTimely, setFaceTimely]: any = useState({});
  // 完整性
  const [integrity, setIntegrity]: any = useState({});
  const [schemaData, setSchemaData]: any = useState([]);

  const getRank = (value) => {
    return value && value !== "-"
      ? `${Number((Number(value) * 100).toFixed(2))}`
      : "0";
  };

  useEffect(() => {
    access_cloud_face_super_total().then((res) => {

      setFaceTimely(res.faceAccessTimely ? res.faceAccessTimely : []);
      setIntegrity(res.faceAccessIntegrity ? res.faceAccessIntegrity : []);
    });
    // 数据Schema
    data_schema_search().then((res) => {
      setSchemaData(res || [])
    });

  }, []);

  return (
    <div className={styles.systemView}>
      <Nav></Nav>
      <div className={styles.content}>
        <div className={styles.leftContent}>
          <div className={styles.todayQuality}>
            <HeadItem title="今日质量" />
            <TodayQuality />
            <div style={{ marginLeft: '5%', marginTop: '10px' }}><QuestionCircleOutlined /> 图片有效率：当日图片抽检合格数/当日图片抽检总数，图片经过人像引擎检测判定合格的图片数</div>
          </div>
          <div className={styles.todayQuality}>
            <HeadItem title="今日设备" />
            <TodayDevice />
          </div>
        </div>
        <div className={styles.rightContent}>
          <HeadItem title="设备接入" />
          <div className={styles.dashboard}>
            <div className={styles.dashboardContent}>
              <span>及时性</span>
              <div style={{ display: "flex", height: 230,textAlign: "center" }}>
                <div style={{width: "50%",height: 230}}>
                  <Dashboard
                    title="前端延迟率"
                    data={getRank(faceTimely.front_delay)}
                  />
                  <div>
                    <Popover content="当日人像卡口延迟设备数(请求时间-抓拍时间>30)/人像设备总数">
                      <QuestionCircleOutlined />
                    </Popover>
                    前端延迟率
                  </div>
                </div>
                <div style={{width: "50%",height: 230}}>
                  <Dashboard
                    title="时钟异常率"
                    data={getRank(faceTimely.abnormal_clock)}
                  />
                  <div>
                    <Popover content="当日人像卡口时钟异常数(请求时间<抓拍时间)/人像卡口总数">
                      <QuestionCircleOutlined />
                    </Popover>
                    时钟异常率
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.dashboardContent}>
              <span>完整性</span>
              <div style={{ display: "flex", height: 230,textAlign: "center" }}>
                <div style={{width: "50%",height: 230}}>
                  <Dashboard
                    title="人脸上传率"
                    data={getRank(integrity.face_upload)}
                  />
                  <div>
                    <Popover content="当日接收人脸完整报文数/当日接收报文总数">
                      <QuestionCircleOutlined />
                    </Popover>
                    人脸上传率
                  </div>
                </div>
                <div style={{width: "50%",height: 230}}>
                  <Dashboard
                    title="场景上传率"
                    data={getRank(integrity.scene_upload)}
                  />
                  <div>
                    <Popover content="当日接收场景完整报文数/当日接收报文总数">
                      <QuestionCircleOutlined />
                    </Popover>
                    场景上传率
                  </div>
                </div>
                
              </div>
            </div>
          </div>
          <div className={styles.badDevice}>
            <div className={styles.badDeviceTitle}>图片质量最差Top50设备</div>
            <DeviceInfo title={title} />
          </div>

        </div>
      </div>
      <div className={styles.barSchema}>
        <HeadItem title="数据Schema" />
        <div style={{ height: 250, width: '100%' }}>
          <BarSchema data={schemaData || []} />
        </div>
      </div>
    </div>
  );
};

export default SystemView;
