import React from "react";

import styles from './cluster.less'

const Column = (props) => {
  const {style, color} = props
  return (
    <>
      <div>
        <div className={styles.column} style={style}>

        </div>
        <div className={styles.columnIdot} style={{backgroundColor: color}}></div>
      </div>
    </>
  )
}

export default Column