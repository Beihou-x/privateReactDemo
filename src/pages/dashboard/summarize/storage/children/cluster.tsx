import React from "react";
import styles from './cluster.less'
import Column from './column'

const Cluster =(props) => {
    const {title, value } = props
    const style = {
      width: 45,
      height: 66
    }
  return (
    <>
      <div className={styles.clusterItem}>
        <div className={styles.title}>{title}</div>
        <div className={styles.value}>{value}</div>
        <Column style={style} color="#F59A23"></Column>
      </div>
    </>
  )
}

export default Cluster