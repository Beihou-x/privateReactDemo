import React, { useEffect, useRef, useState } from "react";
import styles from "../index.less";
import { Progress } from "antd";

const Carousel = ({ data }) => {
  const [list]: any = useState(data);

  const [isScrolle, setIsScrolle] = useState(true);

  // 滚动速度，值越小，滚动越快
  const speed = 100;
  const warper: any = useRef();
  const childDom1: any = useRef();
  const childDom2: any = useRef();

  // 开始滚动
  useEffect(() => {
    // 多拷贝一层，让它无缝滚动
    childDom2.current.innerHTML = childDom1.current.innerHTML;
    let timer;
    if (isScrolle) {
      timer = setInterval(
        () =>
          warper.current.scrollTop >= childDom1.current.scrollHeight
            ? (warper.current.scrollTop = 0)
            : warper.current.scrollTop++,
        speed
      );
    }
    return () => {
      clearTimeout(timer);
    };
  }, [isScrolle]);

  const hoverHandler = (flag) => setIsScrolle(flag);

  const getRank = (value) => {
    return value && value !== "-"
      ? `${Number((Number(value) * 100).toFixed(2))}%`
      : "-";
  };

  const getColor = (value) => {
    const num: any = Number((Number(value) * 100).toFixed(2));
    if (num >= 90) {
      return "color";
    } else if (num >= 80 && num < 90) {
      return "color1";
    } else if (num < 80) {
      return "color2";
    } else {
      return "";
    }
  };

  return (
    <>
      <div className={styles.parent} ref={warper}>
        <div className={styles.child} ref={childDom1}>
          {list.map((item, index) => (
            <li
              className={styles.deviceListItem}
              key={index}
              onMouseOver={() => hoverHandler(false)}
              onMouseLeave={() => hoverHandler(true)}
            >
              <span>{index+1}</span>
              <span className={styles.item}>{item.name}</span>
              <span className={styles.item}>{item.device_id}</span>
              <span className={styles[getColor(item.image_valid)]}>
                {getRank(item.image_valid)}
              </span>
            </li>
          ))}
        </div>
        <div className={styles.child} ref={childDom2}></div>
      </div>
    </>
  );
};

export default Carousel;
