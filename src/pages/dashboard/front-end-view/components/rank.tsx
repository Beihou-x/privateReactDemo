import React, { useEffect, useState } from "react";
import { Progress,Popover } from "antd";
import styles from '../index.less';
import { format } from '@/utils/utils';
import {QuestionCircleOutlined} from '@ant-design/icons';

const Rank = (props) => {
  const { title, data = [], keys, value,content="" } = props;
  return (
    <div className={styles.rate}>
      <div className={styles.rankTitle}>
        <Popover content={content}>
          <QuestionCircleOutlined />{" "}
        </Popover>
        {title}
      </div>
      {
        (data || []).map((item, index) => (
          <div key={index} className={styles.Content}>
            <div className={`${styles.rateIndex} ${index > 2 ? styles.rateIndex1 : ''}`}>{index + 1}</div>
            <span className={styles.rateName}>{item[keys]}</span>
            <div style={{ width: 130 }}>
              <Progress status="active" percent={format(item[value])} strokeColor={index > 2 ? '#37A2DA' : '#9EE6B9'}/>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default Rank;