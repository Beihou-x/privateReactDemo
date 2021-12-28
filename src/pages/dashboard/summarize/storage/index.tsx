import React from "react";
import styles from "./index.less";

import Cluster from "./children/cluster";

import PersonFile from "./children/personFile";
const Storage = () => {
  return (
    <div className={styles.storageView}>
      <div className={styles.leftBox}>
        <div className={styles.boxTitle}>视频网</div>
        <div className={styles.leftCenter}>
          <div className={styles.storageItem}>
            <div>HDFS存储（HBASE,HIVE)</div>
            <div>15T/156T</div>
          </div>
          <div className={styles.storageItem}>
            <div>华为ES存储</div>
            <div>12T/147T</div>
          </div>
        </div>
        <div className={styles.leftCluster}>
          <Cluster title="华为OS9000旧集群" value="179T/180T" />
          <Cluster title="华为MPP存储" value="104T/140T" />
          <Cluster title="华为OS9000新集群" value="10T/197T" />
          <Cluster title="科达对象存储（自备）" value="15T/236T" />
        </div>
      </div>
      <div className={styles.rightBox}>
        <div className={styles.boxTitle}>公安网</div>
        <div className={styles.rightCenter}>
          <Cluster title="HDFS存储（HBASE,HIVE) 拷贝" value="97T/160T" />
          <Cluster title="华为ES存储" value="12T/198T" />
          <div className={styles.file}>
            <PersonFile title="百度人档(自备)"></PersonFile>
            <PersonFile title="依图人档（自备）"></PersonFile>
            <PersonFile title="商汤人档（自备）"></PersonFile>
          </div>
        </div>
        <div className={styles.rightBottom}>
          <Cluster title="华为OS9000集群" value="97T/160T" />
          <Cluster title="存储具体信息" value="15T/236T" />
          <div style={{height:150,width:250,marginTop:20}}>
            <div className={styles.storageItem}>
              <div>华为MPP存储，存储服务</div>
              <div>7T/137T</div>
            </div>
            <div className={styles.storageItem}>
              <div>华为MPP存储，生产环境</div>
              <div>12T/147T</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Storage;
