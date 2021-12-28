import React from "react";
import styles from "../index.less";
import { Space } from "antd";
import { bigNumberTransform, format } from "@/utils/utils";
import up from "@/assets/dashboard/up.png";
import down from "@/assets/dashboard/down.png";

const forwardToday = (props) => {
  const { data = [] } = props;
  return (
    <div className={styles.table}>
      <div className={styles.tableHead}>
        <div>排名</div>
        <div>名称</div>
        <div>今日数据</div>
        <div>设备数</div>
        <div>今日有数据设备</div>
        <div>数据类型</div>
        <div>标签</div>
        <div>服务分类</div>
        <div>服务状态</div>
      </div>
      {data.map((item, index) => (
        <div key={index} className={styles.tableHead}>
          <div>{index + 1}</div>
          <div>{item.k1}</div>
          {/* 今日数据 */}
          <div>
            <Space size="small">
              <span
                style={{
                  display: "inline-block",
                  width: 70,
                  textAlign: "center",
                }}
              >
                {bigNumberTransform(item.k5)}
              </span>{" "}
              {format(item.k8) === 0 ? (
                <span>-</span>
              ) : (
                <img
                  style={{ height: 16, width: 9 }}
                  src={item.k6 === "1" ? up : down}
                />
              )}
              <span
                style={{
                  fontSize: "12px",
                  display: "inline-block",
                }}
              >
                {Math.abs(format(item.k8))}%
              </span>
            </Space>
          </div>
          {/* 设备数 */}
          <div>{item.k3}</div>
          {/* 今日有数据设备 */}
          <div>{item.k9}</div>
          {/* 数据类型 */}
          <div>{item.k7}</div>
          {/* 标签 */}
          <div>
            {(item.k4 || []).map((m) => (
              <div key={m} className={`${styles.tags} ${styles.tags2}`}>
                {m}
              </div>
            ))}
          </div>
          {/* 分类*/}
          <div>
            {item.k0 === "0" ? (
              <div className={`${styles.tags} ${styles.tags1}`}>实时</div>
            ) : item.k0 === "1" ? (
              <div className={styles.tags}>异步</div>
            ) : (
              ""
            )}
          </div>
          {/* 服务状态 */}
          <div>{item.k10}</div>
        </div>
      ))}
    </div>
  );
};

export default forwardToday;
