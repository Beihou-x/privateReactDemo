import React, { useEffect, useState } from "react";
import styles from "./index.less";
import Title from "./components/title";
import Histogram from "./components/histogram";
import ForwardToday from "./components/forwardToday";
import Pie from "./components/pie";
import Sunburst from "./components/sunburst";
import img from "@/assets/dashboard/forward_1.png";
import Bar from "./components/deviceBar";
import NumBar from "./components/numBar";
import { bigNumberTransform } from "@/utils/utils";
import {
  forwardServiceHeader,
  forwardServiceRank,
  forwardServiceCheck,
  forwardServiceAlive,
} from "@/services/v1";

const ForwardServe = () => {
  const [data, setData]: any = useState([]);
  const [total, setTotal]: any = useState(0);
  const [data1, setData1]: any = useState([]);
  const [data2, setData2]: any = useState([]);
  const [data3, setData3]: any = useState([]);
  useEffect(() => {
    // 设备数量
    forwardServiceHeader({}).then((res) => {
      if (res && res.forwardHeaderMessage) {
        setData([
          { name: "实时数量", value: res.forwardHeaderMessage.k2 || 0 },
          { name: "异步数量", value: res.forwardHeaderMessage.k3 || 0 },
        ]);
        // setTotal(res.forwardHeaderMessage.k4 || 0);
      }
    });
    // 排名
    forwardServiceRank({}).then((res) => {
      if (res && res.forwardDataRankMessage) {
        setData1(res.forwardDataRankMessage);
        setTotal(res.forwardDataRankMessage.reduce((acc,currentVal) => {
          return acc + Number(currentVal.k5)
        },0))
      }
    });
    // 对账
    forwardServiceCheck({}).then((res) => {
      if (res && res.forwardDataCheckMessage) {
        setData2(res.forwardDataCheckMessage);
      }
    });
    // 对账
    forwardServiceAlive({}).then((res) => {
      if (res && res.forwardDeviceAliveMessage) {
        setData3(res.forwardDeviceAliveMessage);
      }
    });
  }, []);
  return (
    <div className={styles.content}>
      <div className={styles.topPart}>
        <div className={styles.leftPart}>
          <div className={styles.gather}>
            <div className={styles.leftGather}>
              <Pie data={data} />
            </div>
            <div className={styles.rightGather}>
              <div className={styles.rightGather_total}>
                <img src={img}></img>
                <div className={styles.rightGather_total_content}>
                  <div className={styles.rightGather_total_content_value}>
                    {bigNumberTransform(total)}
                  </div>
                  <div className={styles.rightGather_total_content_label}>
                    转发数据总量
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.forwardToday}>
            <Title title="今日转发数据排名" />
            <ForwardToday data={data1} />
          </div>
        </div>
        <div className={styles.rightPart}>
          <Title title="数据对账" />
          {/* <Histogram data={data2} /> */}
          <div style={{display:"flex", height: "100%"}}>
            <NumBar data={data2}/>
            <Bar data={data2} />
          </div>
        </div>
      </div>
      {/* <div className={styles.footer}>
        <Title title="板块设备活跃情况" />
        <div className={styles.footer_header}>
          <div className={styles.footer_header_item}>
            <span className={`${styles.footer_header_item_icon}`}></span>
            <span className={styles.footer_header_item_name}>不活跃设备</span>
          </div>
          <div className={styles.footer_header_item}>
            <span
              className={`${styles.footer_header_item_icon} ${styles.footer_header_item_icon1}`}
            ></span>
            <span className={styles.footer_header_item_name}>活跃设备</span>
          </div>
          <div className={styles.footer_header_item}>
            <span
              className={`${styles.footer_header_item_icon} ${styles.footer_header_item_icon2}`}
            ></span>
            <span className={styles.footer_header_item_name}>
              今日转发数据设备
            </span>
          </div>
          <div className={styles.footer_header_item}>
            <span
              className={`${styles.footer_header_item_icon} ${styles.footer_header_item_icon3}`}
            ></span>
            <span className={styles.footer_header_item_name}>
              今日未转发数据设备
            </span>
          </div>
        </div>
        <div className={styles.footer_content}>
          {data3.map((m, index) => (
            <div key={index} className={styles.footer_content_item}>
              <Sunburst data={m || {}} />
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default ForwardServe;
