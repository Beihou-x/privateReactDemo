import React from "react";
import { Progress } from "antd";
import styles from "./index.less";

type ProgressSortProps = {
  name: string;
  percent: number;
  number: number;
};

const ProgressSort: React.FC<ProgressSortProps> = ({
  name,
  percent,
  number,
}) => {
  return (
    <div className={styles["progress-sort"]}>
      <span>{name}</span>
      <Progress percent={percent} showInfo={false} />
      <span>{number}</span>
    </div>
  );
};

export default ProgressSort;
