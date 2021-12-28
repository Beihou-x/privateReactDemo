import React from "react";
import styles from "./index.less";
import SourceBar from "./sourceBar";
import SourceLine from "./sourceLine";
import titleL from "../../../../../assets/dashboard/lgyl-left-title.png";
import titleR from "../../../../../assets/dashboard/lgyl-right-title.png";
import titleR1 from "../../../../../assets/dashboard/lgyl-right-title1.png";

const OverView = () => {
  return (
    <div className={styles.overview}>
      <div className={styles.statistics}>
        <div className={`${styles.label} ${styles.label1}`}>
          旅馆数 <span className={styles.value}>9862+</span>
        </div>
        <div className={`${styles.label} ${styles.label2}`}>
          设备数 <span className={styles.value}>362W</span>
        </div>
        <div className={`${styles.label} ${styles.label3}`}>
          今日数据量 <span className={styles.value}>1.6W</span>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.part1}>
          <img src={titleL} />
          <div className={styles.part1_t}>
            <SourceBar />
          </div>
          <div className={styles.part1_b}>
            <p className={styles.lineTile}>数据完整率</p>
            <SourceLine />
          </div>
        </div>
        <div className={styles.part2}></div>
        <div className={styles.part3}>
          <div className={styles.part3_top}>
            <img src={titleR} />
          </div>
          <div className={styles.part3_bottom}>
            <img src={titleR1} />
          </div>
        </div>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default OverView;
