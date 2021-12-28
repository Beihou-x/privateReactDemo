import React from "react";
import styles from "./index.less";

type DeviceTypeProps = {
  label: string;
  value: number;
};

const DeviceType: React.FC<DeviceTypeProps> = ({ label = "", value = 0 }) => {
  return (
    <div className={styles["device-type"]}>
      <span>{label}</span>
      <br />
      <span className={styles["device-type-value"]}>{value}</span>
    </div>
  );
};

export default DeviceType;
