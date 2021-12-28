import React, { useEffect, useState } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Tooltip, Radio, Popover } from "antd";
import styles from "./index.less";
import Title from "../front-end-view/components/title";
import Pie from "../front-end-view/components/topPie";
import Rank from "../front-end-view/components/rank";
import DeviceBar from "./components/deviceBar";
import Dashboard from "./components/dashboard";
import DataBar from "./components/dataBar";
import Line from "./components/line";
import DataLess from './components/dataLess';
import up from "@/assets/up.png";
import down from "@/assets/down.png";
import { format, bigNumberTransform } from '@/utils/utils';

import { dataHead, dataTodayUpload, dataDataQuality, dataDataAbnormalTop } from '@/services/feel_view';


const DataView = () => {
  const [allData, setAllData]: any = useState([]);
  const [abnormal, setAbnormal]: any = useState([]);
  const [todayUpload, setTodayUpload]: any = useState([]);
  const [deviceNum, setDeviceNum]: any = useState([]);
  const [dataQuality, setDataQuality]: any = useState({});
  const [dataAbnormal, setDataAbnormal]: any = useState({});
  useEffect(() => {
    dataHead().then(res => {
      if (res && res.feelDataHeadMessage) {
        let allArr: any = [];
        let abnormalArr: any = [];
        allArr.push({
          name: res.displayMap.k2,
          value: res.feelDataHeadMessage.k2 || 0
        })
        allArr.push({
          name: res.displayMap.k3,
          value: res.feelDataHeadMessage.k3 || 0
        })
        abnormalArr.push({
          name: res.displayMap.k5,
          value: res.feelDataHeadMessage.k5 || 0
        })
        abnormalArr.push({
          name: res.displayMap.k6,
          value: res.feelDataHeadMessage.k6 || 0
        })
        abnormalArr.push({
          name: 'IMSI完整总量',
          value: 0
        })
        setAllData(allArr);
        setAbnormal(abnormalArr);
      }
    })
    dataTodayUpload().then(res => {
      if (res && res.dataTodayUpload) {
        setTodayUpload(res.dataTodayUpload);
        setDeviceNum(res.dataDeviceNum);
      }
    })
    dataDataQuality().then(res => {
      setDataQuality(res)
    })
    // dataDataAbnormalTop({}).then(res => {
    //   setDataAbnormal(res)
    // })
    // 
    getAbnormalData({});
  }, [])

  const dataAbnormalChange = e => {
    if (e.target.value === 'today') {
      getAbnormalData({});
    } else {
      getAbnormalData({ type: 'weekly' })
    }

  }
  //数据异常top5
  const getAbnormalData = (params) => {
    dataDataAbnormalTop(params).then(res => {
      setDataAbnormal(res)
    })
  }

  return (
    <div className={styles.content}>
      <div className={styles.leftPart}>

        <div className={styles.leftTop}>
          <div style={{ width: '50%', height: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: '16px' }}>
              数据统计
            </div>
            <div style={{ width: '100%', height: '90%' }}>
              <Pie title="数据总量" data={allData}></Pie>
            </div>
          </div>
          <div
            style={{
              height: "85%",
              width: "1px",
              borderRight: "1px dashed rgba(199, 204, 208, 0.2)",
            }}
          ></div>
          <div style={{ width: '50%', height: '100%' }}>
            <div style={{ textAlign: 'center', fontSize: '16px' }}>
              质量统计
            </div>
            <div style={{ width: '100%', height: '90%' }}>
              <Pie title="完整总数" data={abnormal}></Pie>
            </div>
          </div>
        </div>
        <div className={styles.leftCenter}>
          <Title title="设备统计" />
          <div className={styles.todayData}>
            <div>
              <div className={styles.todayDataTitle}>昨日上传数据</div>
              <div>
                <span className={styles.todayDataValue}>
                  {todayUpload.k1 ? bigNumberTransform(todayUpload.k1) : 0}
                </span>
              </div>
            </div>
            <div>
              <div className={styles.todayDataTitle}>昨日人像卡口抓拍</div>
              <div>
                <span className={styles.todayDataValue}>
                  {todayUpload.k2 ? bigNumberTransform(todayUpload.k2) : 0}
                </span>
                {
                  format(todayUpload.k4)==0 ? (
                    <span> -</span>
                  ):
                  <img
                    src={format(todayUpload.k4) > 0 ? up : down}
                    className={styles.todayDataArrow}
                />
                }
                <span>{`${Math.abs(format(todayUpload.k4)) || 0}%`}</span>
              </div>
            </div>
            <div>
              <div className={styles.todayDataTitle}>昨日超级卡口抓拍</div>
              <div>
                <span className={styles.todayDataValue}>
                  {todayUpload.k3 ? bigNumberTransform(todayUpload.k3) : 0}
                </span>
                {
                  format(todayUpload.k5) == 0 ? (
                    <span> -</span>
                  ):
                  <img
                    src={format(todayUpload.k5) > 0 ? up : down}
                    className={styles.todayDataArrow}
                />
                }
                
                <span>{`${Math.abs(format(todayUpload.k5)) || 0}%`}</span>
              </div>
            </div>
          </div>
          <div style={{ height: 330 }}>
            <DeviceBar data={deviceNum} />
          </div>
        </div>
        <div className={styles.leftBottom}>
          {/* <Title title="数据异常TOP5板块排名" /> */}
          <div
            className={styles.title}
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>数据异常TOP5板块排名</span>
            <span style={{ marginRight: 20 }}>
              <Radio.Group
                buttonStyle="solid"
                defaultValue="today"
                onChange={dataAbnormalChange}
              >
                <Radio.Button value="today">今日</Radio.Button>
                <Radio.Button value="weekly">近一周</Radio.Button>
              </Radio.Group>
            </span>
          </div>
          <div className={styles.dataAbnormal}>
            <DataLess
              title="数据量少"
              data={dataAbnormal.dataLess && dataAbnormal.dataLess.slice(0, 5)}
              keys="k1"
              value="k3"
            />
            <Rank
              title="数据不完整"
              content={<>
                        <div>当日缺少人像或者车辆的报文数/当日接收报文总数</div>
                        <div>人卡缺少人脸图片，超卡缺少人脸车辆图片被判定为数据不完整</div>
                      </>}
              data={
                dataAbnormal.dataImperfect &&
                dataAbnormal.dataImperfect.slice(0, 5)
              }
              keys="k11"
              value="k13"
            />
            <Rank
              title="小图不合格"
              content={<>
                <div>当日接收小图不合格数/当日接收小图总数</div>
                <div>图片链接无法访问或访问超时判定为不合格</div>
              </>}
              data={
                dataAbnormal.dataLittleNotQualified &&
                dataAbnormal.dataLittleNotQualified.slice(0, 5)
              }
              keys="k31"
              value="k33"
            />
            <Rank
              title="大图不可用"
              content={<>
                <div>当日大图访问无效数/当日大图总数</div>
                <div>图片链接无法访问或访问超时判定为无效</div>
              </>}
              data={
                dataAbnormal.dataBigNotUse &&
                dataAbnormal.dataBigNotUse.slice(0, 5)
              }
              keys="k21"
              value="k23"
            />
          </div>
        </div>
      </div>
      <div className={styles.rightPart}>
        <div className={styles.rightTop}>
          <Title title="数据质量" />
          <div style={{ height: 680 }}>
            <div className={styles.dataQualityItem}>
              <div className={styles.dataQualityContent}>
                <div className={styles.dashboard}>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="质量抽检总次数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;检测总数: {bigNumberTransform(dataQuality.dataAccessIntegrityMessage && dataQuality.dataAccessIntegrityMessage.all_total || 0)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="质量抽检合格数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;检测合格数: {bigNumberTransform(dataQuality.dataAccessIntegrityMessage && dataQuality.dataAccessIntegrityMessage.complete_total || 0)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content={<div>检测合格数/检测总数</div>}>
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;完整率 :
                  </div>
                  <div style={{ width: "100%", height: "150px" }}>
                    {dataQuality.dataAccessIntegrityMessage ? (
                      <Dashboard
                        data={format(
                          dataQuality.dataAccessIntegrityMessage
                            .access_integrity_total || 0
                        )}
                        color="#FF9F7F"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.bar}>
                  {dataQuality.dataAccessIntegrityMessage ? (
                    <DataBar
                      color="#FF9F7F"
                      data={
                        dataQuality.dataAccessIntegrityMessage
                          .data_access_integrity
                      }
                      title="完整率"
                      title1="检测合格数"
                      title2="检测总数"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={styles.dataQualityItem}>
              <div className={styles.dataQualityContent}>
                <div className={styles.dashboard}>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="前端抓拍图片抽检数量">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;抽检图片总数: {bigNumberTransform(dataQuality.dataBigVailMessage && dataQuality.dataBigVailMessage.all_total)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="前端抓拍图片检测URL可用数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;抽检可用图片数: {bigNumberTransform(dataQuality.dataBigVailMessage && dataQuality.dataBigVailMessage.valid_total)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="抽检可用图片数/抽检图片总数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;可用率 :
                  </div>
                  <div style={{ width: "100%", height: "150px" }}>
                    {dataQuality.dataBigVailMessage ? (
                      <Dashboard
                        data={format(
                          dataQuality.dataBigVailMessage.big_vail_total || 0
                        )}
                        color="#37A2DA"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.bar}>
                  {dataQuality.dataBigVailMessage ? (
                    <DataBar
                      color="#37A2DA"
                      data={dataQuality.dataBigVailMessage.data_big_vail}
                      title="可用率"
                      title1="抽检可用图片数"
                      title2="抽检图片总数"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
            <div className={styles.dataQualityItem}>
              <div className={styles.dataQualityContent}>
                <div className={styles.dashboard}>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="前端抓拍人脸图片总数">

                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;人脸总数: {bigNumberTransform(dataQuality.dataLittleVailMessage && dataQuality.dataLittleVailMessage.all_total || 0)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="前端抓拍人脸图片质量检测合格数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;人脸有效图片数: {bigNumberTransform(dataQuality.dataLittleVailMessage && dataQuality.dataLittleVailMessage.valid_total || 0)}
                  </div>
                  <div className={styles.dataQualityTitle}>
                    <Popover content="人脸有效图片数/人脸总数">
                      <ExclamationCircleOutlined />
                    </Popover>
                    &nbsp;合格率 :
                  </div>
                  <div style={{ width: "100%", height: "150px" }}>
                    {dataQuality.dataLittleVailMessage ? (
                      <Dashboard
                        data={format(
                          dataQuality.dataLittleVailMessage.little_vail_total || 0
                        )}
                        color="#9EE6B9"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                <div className={styles.bar}>
                  {dataQuality.dataLittleVailMessage ? (
                    <DataBar
                      color="#9EE6B9"
                      data={dataQuality.dataLittleVailMessage.data_little_vail}
                      title="合格率"
                      title1="人脸图片有效数"
                      title2="人脸总数"
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <Title title="近一周数据变化" />
          <Line />
        </div>
      </div>
    </div>
  );
};

export default DataView;
