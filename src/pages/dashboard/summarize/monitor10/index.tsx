import React from "react";
import { Tooltip } from "antd";
import styles from "./index.less";
import lianlu1 from "../../../../assets/dashboard/lianlu1.png";
import lianlu2 from "../../../../assets/dashboard/lianlu2.png";
import lianlu4 from "../../../../assets/dashboard/lianlu4.png";
import lianlu5 from "../../../../assets/dashboard/lianlu5.png";
import lianlu6 from "../../../../assets/dashboard/lianlu6.png";
import lianlu7 from "../../../../assets/dashboard/lianlu7.png";
import lianlu8 from "../../../../assets/dashboard/lianlu8.png";
import lianlu9 from "../../../../assets/dashboard/lianlu9.png";
import lianlu10 from "../../../../assets/dashboard/lianlu10.png";

const DataLink = () => {
  const names = ["百度", "科达"];
  const arr = ["接入服务A", "接入服务C", "接入服务E"];
  const arr1 = ["转发服务A", "转发服务C", "转发服务E"];
  const arr2 = ["接入服务B", "接入服务D", "接入服务F"];
  const arr3 = ["转发服务B", "转发服务D", "转发服务F"];

  const getAll = (data) => {
    return data.map((d) => <div>{d}</div>);
  };
  return (
    <div className={styles.dataLine}>
      <div className={styles.content}>
        <div className={`${styles.part1} ${styles.part}`}>
          <img src={lianlu1} />
        </div>
        <div className={`${styles.part2} ${styles.part}`}>
          <div className={styles.lianlu2}>
            <img src={lianlu2} />
          </div>
          <Tooltip placement="topRight" title={() => getAll(arr)}>
            <div className={styles.lianlu3}>
              <span className={styles.lianlu3_title}>接入服务集群</span>
              {arr.map((m, index) => {
                if (index < 2) {
                  return (
                    <div className={styles.lianlu3_content}>
                      <div className={styles.lianlu3_label}>{m}</div>
                      <div className={styles.lianlu3_point}></div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tooltip>
          <div className={styles.lianlu4}>
            <img src={lianlu4} />
          </div>
        </div>
        <div className={`${styles.part3} ${styles.part}`}>
          <img src={lianlu5} />
        </div>
        <div className={`${styles.part4} ${styles.part}`}>
          <div className={styles.lianlu2}></div>
          <Tooltip placement="topRight" title={() => getAll(arr1)}>
            <div className={styles.lianlu3}>
              <span className={styles.lianlu3_title}>转发服务集群</span>
              {arr1.map((m, index) => {
                if (index < 2) {
                  return (
                    <div className={styles.lianlu3_content}>
                      <div className={styles.lianlu3_label}>{m}</div>
                      <div className={styles.lianlu3_point}></div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tooltip>
          <div className={styles.lianlu4}>
            <img src={lianlu6} />
          </div>
        </div>
        <div className={`${styles.part5} ${styles.part}`}>
          <img src={lianlu7} />
        </div>
        <div className={`${styles.part6} ${styles.part}`}>
          <div className={styles.lianlu2}>
            <img src={lianlu8} />
          </div>
          <Tooltip placement="topRight" title={() => getAll(arr2)}>
            <div className={styles.lianlu3}>
              <span className={styles.lianlu3_title}>接入服务集群</span>
              {arr2.map((m, index) => {
                if (index < 2) {
                  return (
                    <div className={styles.lianlu3_content}>
                      <div className={styles.lianlu3_label}>{m}</div>
                      <div className={styles.lianlu3_point}></div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tooltip>
          <div className={styles.lianlu4}>
            <img src={lianlu4} />
          </div>
        </div>
        <div className={`${styles.part7} ${styles.part}`}>
          <img src={lianlu5} />
        </div>
        <div className={`${styles.part8} ${styles.part}`}>
          <div className={styles.lianlu2}></div>
          <Tooltip placement="topRight" title={() => getAll(arr3)}>
            <div className={styles.lianlu3}>
              <span className={styles.lianlu3_title}>转发服务集群</span>
              {arr3.map((m, index) => {
                if (index < 2) {
                  return (
                    <div className={styles.lianlu3_content}>
                      <div className={styles.lianlu3_label}>{m}</div>
                      <div className={styles.lianlu3_point}></div>
                    </div>
                  );
                } else {
                  return;
                }
              })}
            </div>
          </Tooltip>
          <div className={styles.lianlu4}>
            <img src={lianlu6} />
          </div>
        </div>
        <div className={`${styles.part9} ${styles.part}`}>
          <img src={lianlu9} />
        </div>
        <div className={`${styles.part10} ${styles.part}`}>
          <div>
            {names.map((m, index) => (
              <div key={index} className={styles.name}>
                <span className={styles.img}>
                  <img src={lianlu10} />
                </span>
                <span className={styles.text}>{m}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataLink;
