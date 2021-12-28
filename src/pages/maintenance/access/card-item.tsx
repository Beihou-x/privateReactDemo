import React, { useEffect, useState } from "react";
import { Modal, message, Button } from "antd";
import { accessServiceRecord } from "@/services/v2";
import styles from "./index.less";
import { Link } from "react-router-dom";
import { filterCategoryValue } from "@/utils/utils";
import {getColor,getStatus} from "./childUtils"

const CardItem = (props) => {

  const { item = {}, downloadFile, handleRestartOrStop, category } = props;

  const [modalShow, setModalShow] = useState(false)
  const [record, setRecord]: any = useState([]);
  

  const recordView = (category, id) => {
    accessServiceRecord(category, id).then(res => {
      setRecord(Array.isArray(res) ? res : []);
      setModalShow(true)
    }).catch(err => {
      console.error(err);
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
            // item.category === 'ACCESS' ?
            //   <Link to={`/monitor/${item && item.id}/service`}>监控</Link>
            //   :
              item.category === "FORWARD" || item.category === "ASYNC_FORWARD" || item.category === "SUBSCRIBE" ?
              <Link to={`/wx_forward_monitor/${item.id}/service/${item.metrics_name}/${item.category}`}>监控</Link>
              :
              <Link to={`/monitor/${item && item.id}/service`}>监控</Link>
          }

          {
            item.category === 'ACCESS' ?
              <Link to={{ pathname: '/gover/wx_reconciliation/data_reconciliation', state: { accessId: item.id, category: category } }}>对账</Link>
              :
              item.category === "FORWARD" || item.category === "ASYNC_FORWARD" || item.category === "SUBSCRIBE" ?
              <Link to={{ pathname: '/gover/wx_reconciliation/data_reconciliation', state: { forwardId: item.id, category: category } }}>对账</Link>
              :
              ""
          }
          {
            item.category === 'ACCESS' ?
              <a onClick={() => recordView(item.category, item.id)}>日志</a> : ""
          }
          <a onClick={() => downloadFile(item.id)}>下载配置文件</a>
          <Link to={`/system/wx_cluster/access/info/${item && item.id}`}>详情</Link>
        </div>
      </div>


      <Modal title={`${item.name}日志`} visible={modalShow} onCancel={() => setModalShow(false)} footer={[
        <Button type="primary" key="back" onClick={() => setModalShow(false)}>
          确定
        </Button>
      ]}>
        <div style={{ height: 500, color: "#fff", overflowY: "auto" }}>
          {
            record.map((item, index) => (
              <div key={index}>{item}</div>
            ))
          }
        </div>
      </Modal>
    </>
  );
};

export default CardItem;
