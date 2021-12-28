import React from "react";
import styles from "./cluster.less";
import Column from "./column";

const PersonFile = (props) => {
  const { title } = props;
  const style = {
    width: 30,
    height: 45,
  };
  return (
    <>
      <div className={styles.personFile}>
        <div>{title}</div>
        <Column style={style}></Column>
      </div>
    </>
  );
};

export default PersonFile;
