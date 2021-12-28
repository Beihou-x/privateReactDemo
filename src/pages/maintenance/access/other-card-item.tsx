import React, { useEffect, useState } from "react";
import styles from "./index.less";
import { Modal, message, Button, Descriptions } from "antd";
import { Link } from "react-router-dom";
import { prometheus } from "@/services/v2";
import { filterCategoryValue, formatDate } from "@/utils/utils";
import { getColor, getStatus } from "./childUtils"

const CardItem = (props) => {
  const { item = {}, downloadFile, handleRestartOrStop, category } = props;
  const [modalShow, setModalShow] = useState(false);

  const [accessTotal, setAccessTotal]: any = useState([]);
  const [delay, setDelay] = useState([]);

  const transportReport = (id) => {
    prometheus("latency", id, "service").then(res => {
      if (res && res.data && res.data.result.length) {
        setDelay(res.data.result[0].values)
      } else {
        setDelay([])
      }
    })
    prometheus("total", id, "service").then(res => {
      setModalShow(true);
      if (res && res.data && res.data.result.length) {
        setAccessTotal(res.data.result[0].values)
      } else {
        setAccessTotal([])
      }
    })
  }
  return (
    <>
      <div className={styles.content}>
        <div className={styles.serveTitle}>{item.name}</div>
        <div className={styles.serveContent}>
          <span className={styles.serveContentName}>类型:</span>
          <span style={{ color: "#fff" }}> {filterCategoryValue('服务', item.category)}</span>
        </div>
        <div className={styles.serveContent}>
          <span className={styles.serveContentName}>IP:</span>
          <span style={{ color: "#fff" }}>{item.ip}</span>
        </div>
        <div className={styles.serveContent}>
          <span className={styles.serveContentName}>状态:</span>
          <span>
            <span
              className={styles.severStatus}
              style={{ backgroundColor: getColor(item.status) }}
            ></span>
            <span style={{ color: getColor(item.status) }}>
              {getStatus(item.status)}
            </span>
          </span>
        </div>
        <div className={styles.footer}>
          <Link to={`/system/wx_cluster/wx_service_config/${item.id}`}>服务配置</Link>
          <Link to={`/system/wx_cluster/wx_maintenance_service1/edit/${item.id}`}>编辑</Link>
          {
            item.status === "RUNNING" ? "" : (
              <a onClick={() => handleRestartOrStop(item, "RUNNING", "更新")}>
                更新
              </a>
            )
          }
          {
            item.status === "UNKNOW" || item.status === "START" ? "" : (
              <a onClick={() => handleRestartOrStop(item, "START", "停用")}>
                停用
              </a>
            )
          }
          {
            item.category === "FTP" || item.category === "可信网关" ?
              <a onClick={() => transportReport(item.id)}>传输报告</a>
              : ""
          }
          <Link to={`/monitor/${item && item.id}/service`}>监控</Link>
          <a onClick={() => downloadFile(item.id)}>下载配置文件</a>
          <Link to={`/system/wx_cluster/access/info/${item && item.id}`}>详情</Link>
        </div>
      </div>

      <Modal title={`${item.name}传输报告`} visible={modalShow} width={800} onCancel={() => setModalShow(false)} footer={[
        <Button type="primary" key="back" onClick={() => setModalShow(false)}>
          确定
        </Button>
      ]}>
        <Descriptions column={2}>
          <Descriptions.Item label="接入量">{accessTotal[0] && accessTotal[0][1] || 0}</Descriptions.Item>
          <Descriptions.Item label="响应时间">{delay.length && delay[delay.length - 1] && delay[delay.length - 1][1] ? `${Number(delay[delay.length - 1][1]).toFixed(2)}ms` : '-'}</Descriptions.Item>
          <Descriptions.Item label="服务状态">{getStatus(item.status)}</Descriptions.Item>

        </Descriptions>
      </Modal>
    </>
  );
};

export default CardItem;
