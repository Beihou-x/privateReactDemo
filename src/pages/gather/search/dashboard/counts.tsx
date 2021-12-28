import React, { useCallback, useEffect, useState } from "react";
import styles from "./index.less";
import { formatDatetime } from "@/utils/utils";
import { countsInfoSearch } from "@/services/v1";
import { getCounts } from "@/utils/utils";

const Counts = (props) => {
  const [time, setTime]: any = useState("");
  const [counts, setCount]: any = useState([0, 0, 0, 0, 0, 0, 0]);

  let timer: any = null;
  let timer1: any = null;

  useEffect(() => {
    changeTimer();
    if (timer1) {
      clearInterval(timer1);
    }
    timer1 = setInterval(() => {
      changeTimer();
    }, 1000);
    return () => clearInterval(timer1);
  }, []);

  const changeTimer = () => {
    setTime(formatDatetime(new Date(), "YYYY-MM-DD HH:mm:ss"));
  };

  useEffect(() => {
    handleSearch();
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(() => {
      handleSearch();
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const getNum = (value) => {
    return value ? `${Number((Number(value) * 100).toFixed(2))}%` : "0%";
  };
  const handleSearch = () => {
    countsInfoSearch().then((res) => {
      if (res) {
        const arr = [
          {
            name: "今日抓拍总量",
            value: getCounts(res, "今日抓拍总量"),
          },
          {
            name: "设备标签数",
            value: getCounts(res, "设备标签数"),
          },
          {
            name: "超卡人脸合格率",
            value: getNum(getCounts(res, "超卡人脸合格率")),
          },
          {
            name: "人卡人脸合格率",
            value: getNum(getCounts(res, "人卡人脸合格率")),
          },
          {
            name: "今日最好版块",
            value: getCounts(res, "good") || "无",
          },
          {
            name: "今日最差版块",
            value: getCounts(res, "poor") || "无",
          },
        ];
        setCount(arr);
      }
    });
  };

  return (
    <div className={styles.counts}>
      <div className={styles.part}>
        {counts.map((m, index) => (
          <div className={styles.item} key={index}>
            <span className={styles.label}>{m.name}</span>
            <span className={styles.value}>{m.value}</span>
          </div>
        ))}
      </div>
      <div className={styles.day_t}>{time}</div>
    </div>
  );
};

export default Counts;
