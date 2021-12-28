import React from "react";
import styles from "./index.less";
import up from "@/assets/up.png";
import down from "@/assets/down.png";

type TodayTotalProps = {
  label: string;
  value: number;
  rank?: any;
};

const TodayTotal: React.FC<TodayTotalProps> = ({
  label = "",
  value = 0,
  rank,
}) => {
  return (
    <div className={styles["device-type"]}>
      <span>{label}</span>
      <span className={styles["device-type-value"]}>
        {value}
        <span className={styles["device-type-rank"]}>
          {rank ? <img src={rank === "up" ? up : down}></img> : ""}
        </span>
      </span>
    </div>
  );
};

export default TodayTotal;
