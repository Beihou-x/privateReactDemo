import React from "react";
import styles from "./index.less";

type ProportionTotalProps = {
  tab: string | number;
  title: string;
  total: React.ReactNode;
  comparison?: React.ReactNode;
};

const ProportionTotal: React.FC<ProportionTotalProps> = ({
  tab,
  title,
  total,
  comparison,
}) => {
  return (
    <div className={styles["total-statistics"]}>
      <div className={`${styles["total-statistics-tab"]}`}>{tab}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.total}>{total}</div>
      <div className={`${styles["total-statistics-comparison"]}`}>
        {comparison}
      </div>
    </div>
  );
};

export default ProportionTotal;
