import React from "react";
import { Row, Col } from "antd";
import styles from "./index.less";
import Area from "./area";
import Bar from "./bar";
import Gauge from "./gauge";
import RankBar from "./rankBar";
import DataBar from "./dataBar";
import Line from "./line";
import down from "../../../../assets/dashboard/down.png";
import up from "../../../../assets/dashboard/up.png";
import rcgl1 from "../../../../assets/dashboard/rcgl1.png";
import rcgl2 from "../../../../assets/dashboard/rcgl2.png";
import rcgl3 from "../../../../assets/dashboard/rcgl3.png";
import rcgl4 from "../../../../assets/dashboard/rcgl4.png";
import rcgl5 from "../../../../assets/dashboard/rcgl5.png";
import rcgl6 from "../../../../assets/dashboard/rcgl6.png";
import rcgl7 from "../../../../assets/dashboard/rcgl7.png";
const MonitorSeven = () => {
  const obj = {
    num1: 12654,
    num2: 3578,
    num: 4000,
    num3: "15W+",
    num4: "8.3W+",
    num5: "7.2W+",
    num6: "6.8W+",
    num7: "8.2W+",
    num8: "16.8W+",
    num9: "3578",
    num10: "121",
  };
  return (
    <div className={styles.personCarContent}>
      <div className={styles.left}>
        <div className={styles.part1}>
          <div className={styles.title}>数据来源</div>
          <div className={styles.part1_b}>
            <div className={styles.part1_1}>
              <div className={styles.part1_1_1}>
                <div className={styles.part1_1_1_1}>人车同拍设备数</div>
                <div className={styles.num}>{obj.num1}</div>
              </div>
              <div className={styles.part1_1_1}>
                <div className={styles.part1_1_1_1}>今日上传数量</div>
                <div className={`${styles.num} ${styles.num1}`}>
                  {obj.num2}
                  <span>
                    <img src={obj.num2 > obj.num ? up : down} />
                    较昨日
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.part1_2}>
              <Area />
            </div>
          </div>
        </div>
        <div className={styles.part2}>
          <div className={styles.t_1}>
            <div className={styles.title}>数据质量</div>
            <div className={styles.part2_1}>
              <div className={styles.part2_1_1}>
                <div>人像图片</div>
                <div className={styles.part2_1_1_1}>
                  <div className={styles.part2_1_1_1_1}>
                    <Gauge name="人像识别率" data={88} />
                  </div>
                  <div className={styles.part2_1_1_1_1}>
                    <Gauge name="图片延迟率" data={45} />
                  </div>
                </div>
              </div>
              <div className={styles.part2_1_1}>
                <div>车辆图片</div>
                <div className={styles.part2_1_1_1}>
                  <div className={styles.part2_1_1_1_1}>
                    <Gauge name="车辆识别率" data={44} />
                  </div>
                  <div className={styles.part2_1_1_1_1}>
                    <Gauge name="车牌识别率" data={88} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.b_1}>
            <div className={styles.title}>建档率</div>
            <div className={styles.bar}>
              <Bar />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.center}>
        <div className={styles.part3}>
          <div className={styles.part3_1}>
            <div className={styles.part3_1_1}>
              <img src={rcgl2} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>上传数据总量</div>
                <div className={styles.value}>{obj.num3}</div>
              </div>
            </div>
            <div className={styles.part3_1_1}>
              <img src={rcgl3} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>人像数据总量</div>
                <div className={styles.value}>{obj.num4}</div>
              </div>
            </div>
            <div className={styles.part3_1_1}>
              <img src={rcgl4} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>车辆档案总量</div>
                <div className={styles.value}>{obj.num5}</div>
              </div>
            </div>
          </div>
          <div className={styles.part3_1}>
            <div className={styles.part3_1_1}>
              <img src={rcgl5} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>车辆转发总量</div>
                <div className={styles.value}>{obj.num6}</div>
              </div>
            </div>
            <div className={styles.part3_1_1}>
              <img src={rcgl6} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>人员数据总量</div>
                <div className={styles.value}>{obj.num7}</div>
              </div>
            </div>
            <div className={styles.part3_1_1}>
              <img src={rcgl7} />
              <div className={styles.part3_1_1_r}>
                <div className={styles.label}>存储总量</div>
                <div className={styles.value}>{obj.num8}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.part4}>
          <img src={rcgl1} />
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.part5}>
          <div className={styles.title}>引擎</div>
          <div className={styles.part5_1}>
            <div className={styles.part5_1_1}>
              <div>档案解析率</div>
              <div className={styles.rankBar}>
                <RankBar />
              </div>
            </div>
            <div className={styles.part5_1_1}>
              <div>数据对账</div>
              <div className={styles.rankBar}>
                <DataBar />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.part6}>
          <div className={styles.title}>数据库</div>
          <div className={styles.part6_1}>
            <div className={styles.part6_1_1}>
              <div className={styles.part6_1_1_1}>今日入库量</div>
              <div className={styles.part6_1_1_2}>
                <span className={styles.num9}>{obj.num9}</span>
                <img className={styles.img6} src={down} />
                <span>较昨日</span>
                <span className={styles.num10}>{obj.num10}</span>
              </div>
            </div>
            <div className={styles.part6_1_2}>
              <div>近一周入库量对比</div>
              <div className={styles.part6_1_2_1}>
                <Line />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitorSeven;
