import React from "react";
import styles from "./index.less";
import up from "@/assets/up.png";
import down from "@/assets/down.png";

type AreaDeviceProps = {
  label: React.ReactNode | string;
  value: number;
  rank?: any;
};

const AreaDevice: React.FC<AreaDeviceProps> = ({
  label = "",
  value = 0,
  rank,
}) => {
  return (
    <div className={styles["area-device"]}>
      <div>{label}</div>
      <div className={styles["area-device-value"]}>
        {value}
        <span className={styles["area-device-rank"]}>
          {rank ? <img src={rank === "up" ? up : down}></img> : ""}
        </span>
      </div>
    </div>
  );
};

export default AreaDevice;
