import React, { useEffect, useState } from "react";
import styles from "./index.less";

const Title = props => {
  const { title } = props;
  return <div className={styles.title}>{title}</div>;
};

export default Title;
