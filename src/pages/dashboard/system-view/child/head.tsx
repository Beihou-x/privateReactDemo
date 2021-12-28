import React, { useEffect, useState } from "react";
import styles from "../index.less"

const HeadItem = (props) => {
  const {title} = props

  return (
    <div className={styles.headItem}>
      {title}
    </div>
  )
}

export default HeadItem