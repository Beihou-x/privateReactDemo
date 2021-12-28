import React, { useEffect, useState } from "react";
import styles from "./progressTime.less";
import { Progress } from "antd";

const ProgressList = (props) => {
  const { list = [] } = props;
  let color;
  let level = "";
  let fontColor = '';
  const dataList = list.map((item) => {
    if (item.value <= 15) {
      (color = {from :"rgba(158, 230, 185, 0)", to: 'rgba(158, 230, 185, 1)'}), (level = "良好"),(fontColor="#9EE6B9 ");
    } else {
      (color ={from :"rgba(254, 83, 110, 0)", to: 'rgba(254, 83, 110, 1)'}), (level = "异常"),(fontColor="#FE536E");
    }
    return {
      name: item.name,
      value: item.value,
      level: level,
      color: color,
      fontColor: fontColor
    };
  });

  return (
    <div className={styles.timeLyContent}>
      {dataList.map((item, index) => (
        <div className={styles.out} key={index}>
          <div>{item.name}</div>
          <div style={{ width: 330 }}>
            <Progress
              strokeLinecap="square"
              strokeColor={item.color}
              trailColor="rgba(158, 230, 185, 0.05)"
              type="line"
              percent={item.value}
              status="active"
              strokeWidth={24}
              showInfo={false}
            />
          </div>
          <div style={{ color: item.fontColor }}>{item.value}%</div>
          <div style={{ color: item.fontColor }}>{item.level}</div>
        </div>
      ))}
    </div>
  );
};

export default ProgressList;
