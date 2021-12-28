import React, { useEffect, useState } from "react";
import styles from "../index.less";

const Title = (props) => {
  const { title, description = "" } = props;
  return (
    <div className={styles.title}>
      {title}
      {
        description? 
        <span style={{ fontSize: 12, color: "#ccc" }}>{`（${description}）`}</span>
        : ""
      }
    </div>
  )
};

export default Title;
