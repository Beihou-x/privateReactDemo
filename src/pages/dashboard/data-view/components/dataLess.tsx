import React, { useEffect, useState } from "react";
import { Progress } from "antd";
import styles from '../index.less';
import { bigNumberTransform } from '@/utils/utils';

const DataLess = (props) => {
  const { title, data = [], keys, value } = props;
  return (
    <div className={styles.rate}>
      <div className={styles.rankTitle}>{title}</div>
      {
        (data || []).map((item, index) => (
          <div key={index} className={styles.Content}>
            <div style={{ display: 'flex' }}>
              <div className={`${styles.rateIndex} ${index > 2 ? styles.rateIndex1 : ''}`}>{index + 1}</div>
              <span className={styles.rateName}>{item[keys]}</span>
            </div>
            <span>{bigNumberTransform(item[value])}</span>
            {/* <div style={{width:130}}>
              <Progress status="active" percent={format(item[value])}/>
            </div> */}
          </div>
        ))
      }
    </div>
  )
}

export default DataLess;