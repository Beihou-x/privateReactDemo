import React from "react";
import { Carousel, Row } from "antd";
import styles from "./index.less";

const NoticeInfo = () => {
  const onChange = () => {};
  return (
    <div className={styles.info}>
      <Carousel
        autoplay
        dots={false}
        dotPosition="right"
        after-change={onChange}
      >
        {[1, 2, 3, 4].map(item => (
          <ul>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
            <li key={item}>
              <i>设备异常</i>
              <b>设备离线</b>
              <span>2021-04-26 19:20:31</span>
            </li>
          </ul>
        ))}
      </Carousel>
    </div>
  );
};
export default NoticeInfo;
