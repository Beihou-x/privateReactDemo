import React, { useState } from "react";
import styles from "./index.less";
import { Row, Col, Card } from "antd";
import TotalStatistics from "../hotel/components/TotalStatistics";
import Link from "./components/Link";
import PressureToday from "./components/PressureToday";
import ProportionTotal from "../hotel/components/ProportionTotal";
import CheckInTotal from "./components/CheckInTotal";
import AutoRefresh from "../hotel/components/AutoRefresh";
import { hotelDataSearch, hotelGraphSearch, hotelHistory } from "@/services/v1";
import moment from "moment";
import VerificationTotal from "./components/VerificationTotal";
import WeekSynchronization from "./components/WeekSynchronization";
import WeekSynchronizationError from "./components/WeekSynchronizationError";
import WeekAccountCheck from "./components/WeekAccountCheck";
import WeekForward from "./components/WeekForward";
import WeekRate from "./components/WeekRate";
import DataStorage from "./components/DataStorage";

const Screen = () => {
  const [linkType, setLink] = useState("旅馆");

  //链路点击
  const onChange = (name) => {
    switch (name) {
      case "旅馆":
        setLink(name);
        break;
      case "引擎":
        setLink(name);
        break;
      case "人像基础库":
        setLink(name);
        break;
      default:
        setLink("旅馆");
        break;
    }
  };

  return (
    <div className={styles.screen}>
      <div className={styles["header-total"]}>
        <AutoRefresh
          autorefresh
          // services={() =>
          //   hotelHistory({
          //     name: "history_others",
          //   })
          // }
        >
          {(data: any) => {
            let values = data;
            return (
              <Row gutter={32} justify="space-around" align="middle">
                <Col span={4} style={{ height: "100%" }}>
                  <TotalStatistics
                    title="旅馆数"
                    total={<>{(values && values.hotel_total) || 50}</>}
                  />
                </Col>
                <Col span={4} style={{ height: "100%" }}>
                  <TotalStatistics
                    title="设备数"
                    total={<>{(values && values.device_total) || 423}</>}
                  />
                </Col>
                <Col span={4} style={{ height: "100%" }}>
                  <TotalStatistics
                    title="图片数"
                    total={<>{(values && values.pic_total) || 402354}</>}
                  />
                </Col>
                <Col span={4} style={{ height: "100%" }}>
                  <TotalStatistics
                    title="入住数"
                    total={<>{(values && values.check_in_total) || 7895}</>}
                  />
                </Col>
                <Col span={4} style={{ height: "100%" }}>
                  <TotalStatistics
                    title="核验数"
                    total={<>{(values && values.validate_total) || 7520}</>}
                  />
                </Col>
              </Row>
            );
          }}
        </AutoRefresh>
      </div>
      <div style={{ width: "98%" }}>
        <Row gutter={16}>
          {linkType === "旅馆" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据来源"
                style={{ marginBottom: "5px" }}
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "27vh" }}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() => hotelDataSearch({ name: "data_source" })}
                    >
                      {(data) => {
                        const val = data ? data : {};
                        return (
                          <>
                            <TotalStatistics
                              title="今日入住数"
                              total={(val && val.check_in_total) || 1286}
                            />
                            <TotalStatistics
                              title="人证核验数"
                              total={(val && val.validate_total) || 1245}
                            />
                          </>
                        );
                      }}
                    </AutoRefresh>
                  </div>
                  <div style={{ height: "16vh" }}>
                    <span
                      style={{
                        color: "rgba(79, 217, 252, 1)",
                        fontSize: "16px",
                        fontWeight: 400,
                        marginLeft: 2,
                      }}
                    >
                      今日情况
                    </span>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelDataSearch({
                      //     name: "data_rate",
                      //   })
                      // }
                    >
                      {(data) => {
                        return (
                          <PressureToday
                            styles={{
                              height: "15vh",
                            }}
                            data={data}
                          />
                        );
                      }}
                    </AutoRefresh>
                  </div>
                </div>
              </Card>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="人证核验成功率最高TOP10旅馆"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div
                  style={{
                    height: "33vh",
                    overflowY: "auto",
                    position: "relative",
                  }}
                >
                  <div style={{ position: "absolute", width: "100%" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelDataSearch({
                      //     name: "validate_top",
                      //   })
                      // }
                    >
                      {(data) => {
                        return (data || []).map((item, index) => (
                          <>
                            <ProportionTotal
                              key={index}
                              tab={index + 1}
                              title={item.name}
                              total={(item.rec_rate / 100).toFixed(2) + "%"}
                            />
                            <br />
                          </>
                        ));
                      }}
                    </AutoRefresh>
                  </div>
                </div>
              </Card>
            </Col>
          ) : null}

          {linkType === "引擎" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据来源"
                style={{ marginBottom: "5px" }}
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "12vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelDataSearch({
                    //     name: "data_access",
                    //   })
                    // }
                  >
                    {(data) => {
                      let info = data ? data : {};
                      return (
                        <>
                          <p>
                            <span style={{ color: "#BDFCF7" }}>来源 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {" "}
                              {(info && info.name) || ""}
                            </span>
                          </p>

                          <p>
                            <span style={{ color: "#BDFCF7" }}>应接收 : </span>
                            <span
                              style={{
                                marginRight: 10,
                                color: "#79F8FD",
                                fontSize: "20px",
                              }}
                            >
                              {(info && info.should_access_total) || 0}
                            </span>
                            <span style={{ color: "#BDFCF7" }}>实接收 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {" "}
                              {(info && info.real_access_total) || 0}
                            </span>
                          </p>
                        </>
                      );
                    }}
                  </AutoRefresh>
                </div>
              </Card>
              <Card
                className={`${styles["screen-card"]} ${styles["access-graph-card"]}`}
                bordered={false}
                title="数据对账"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "45vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelGraphSearch({
                    //     name: "data_access_graph",
                    //     created_ats: [
                    //       moment().startOf("week").unix(),
                    //       moment().endOf("week").unix(),
                    //     ],
                    //   })
                    // }
                  >
                    <WeekForward />
                  </AutoRefresh>
                </div>
              </Card>
            </Col>
          ) : null}

          {linkType === "人像基础库" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据来源"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "60vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelDataSearch({
                    //     name: "data_sync",
                    //   })
                    // }
                  >
                    {(data) => {
                      let info = data ? data : {};
                      return (
                        <>
                          <p>
                            <span style={{ color: "#BDFCF7" }}>来源 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {" "}
                              {(info && info.name) || ""}
                            </span>
                          </p>
                          <p>
                            <span style={{ color: "#BDFCF7" }}>应同步 : </span>
                            <span
                              style={{
                                marginRight: 10,
                                color: "#79F8FD",
                                fontSize: "20px",
                              }}
                            >
                              {(info && info.should_sync_total) || 0}
                            </span>
                            <span style={{ color: "#BDFCF7" }}>实同步 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {" "}
                              {(info && info.real_sync_total) || 0}
                            </span>
                          </p>
                        </>
                      );
                    }}
                  </AutoRefresh>
                  <p>近一周同步情况</p>
                  <div style={{ height: "22vh" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelGraphSearch({
                      //     name: "data_sync_graph",
                      //     created_ats: [
                      //       moment().startOf("week").unix(),
                      //       moment().endOf("week").unix(),
                      //     ],
                      //   })
                      // }
                    >
                      <WeekSynchronization />
                    </AutoRefresh>
                  </div>
                  <p>近一周同步失败分析</p>
                  <div style={{ height: "22vh" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelDataSearch({
                      //     name: "data_sync_failed",
                      //     created_ats: [
                      //       moment()
                      //         .startOf("week")
                      //         .subtract(2, "days")
                      //         .startOf("week")
                      //         .unix(),
                      //       moment()
                      //         .startOf("week")
                      //         .subtract(2, "days")
                      //         .endOf("week")
                      //         .unix(),
                      //     ],
                      //   })
                      // }
                    >
                      <WeekSynchronizationError />
                    </AutoRefresh>
                  </div>
                </div>
              </Card>
            </Col>
          ) : null}
          <Col span={12}>
            <Card
              className={styles["screen-service-card"]}
              bordered={false}
              title="数据体系"
            >
              <div className={styles.conBorBox}>
                <div className={styles.bor}></div>
                <div className={`${styles.line} ${styles.lineTop}`}></div>
                <div className={`${styles.line} ${styles.lineBottom}`}></div>
              </div>
              <div
                style={
                  linkType === "人像基础库"
                    ? {
                        height: "59vh",
                      }
                    : {
                        height: "60vh",
                      }
                }
              >
                <AutoRefresh
                  autorefresh
                  // services={() =>
                  //   hotelHistory({
                  //     name: "history_link",
                  //   })
                  // }
                >
                  <Link
                    onChange={onChange}
                    styles={{
                      height: "59vh",
                      weight: "100%",
                    }}
                  />
                </AutoRefresh>
              </div>
            </Card>
          </Col>
          {linkType === "人像基础库" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据共享"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "60vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelDataSearch({
                    //     name: "data_forward",
                    //   })
                    // }
                  >
                    {(data) => {
                      let info = data ? data : {};

                      return (
                        <>
                          <p>
                            <span style={{ color: "#BDFCF7" }}>应用 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {" "}
                              {(info && info.name) || ""}
                            </span>
                          </p>
                          <p>
                            <span style={{ color: "#BDFCF7" }}>应转发 : </span>
                            <span
                              style={{
                                marginRight: 10,
                                color: "#79F8FD",
                                fontSize: "20px",
                              }}
                            >
                              {(info && info.should_forward_total) || 0}
                            </span>
                            <span style={{ color: "#BDFCF7" }}>实转发 : </span>
                            <span
                              style={{ color: "#79F8FD", fontSize: "20px" }}
                            >
                              {(info && info.real_forward_total) || 0}
                            </span>
                          </p>
                        </>
                      );
                    }}
                  </AutoRefresh>

                  <p>近一周对账情况</p>
                  <div style={{ height: "45vh" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelGraphSearch({
                      //     name: "data_forward_graph",
                      //     created_ats: [
                      //       moment().startOf("week").unix(),
                      //       moment().endOf("week").unix(),
                      //     ],
                      //   })
                      // }
                    >
                      <WeekAccountCheck />
                    </AutoRefresh>
                  </div>
                </div>
              </Card>
            </Col>
          ) : null}
          {linkType === "引擎" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据质态"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "60vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelDataSearch({
                    //     name: "data_quality_status",
                    //   })
                    // }
                  >
                    {(data) => {
                      let info = data ? data : {};

                      return (
                        <>
                          <p>
                            今日识别率:{" "}
                            {(info &&
                              info.rec_rate &&
                              Number(info.rec_rate / 100).toFixed(2) + "%") ||
                              ""}
                          </p>
                        </>
                      );
                    }}
                  </AutoRefresh>

                  <p>近一周识别率变化</p>
                  <div style={{ height: "52vh" }}>
                    <AutoRefresh
                      autorefresh
                      // services={() =>
                      //   hotelGraphSearch({
                      //     name: "data_rate_graph",
                      //     created_ats: [
                      //       moment()
                      //         .startOf("week")
                      //         .subtract(2, "days")
                      //         .startOf("week")
                      //         .unix(),
                      //       moment()
                      //         .startOf("week")
                      //         .subtract(2, "days")
                      //         .endOf("week")
                      //         .unix(),
                      //     ],
                      //   })
                      // }
                    >
                      <WeekRate />
                    </AutoRefresh>
                  </div>
                </div>
              </Card>
            </Col>
          ) : null}

          {linkType === "旅馆" ? (
            <Col span={6}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="近一周数据变化"
                style={{ marginBottom: "5px" }}
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "30vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelGraphSearch({
                    //     name: "checkin_validate_graph",
                    //     created_ats: [
                    //       moment().subtract(7, "days").startOf("day").unix(),
                    //       moment().endOf("day").unix(),
                    //     ],
                    //   })
                    // }
                  >
                    <CheckInTotal
                      styles={{
                        height: "100%",
                      }}
                    />
                  </AutoRefresh>
                </div>
              </Card>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="人证核验对比情况"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "30vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelGraphSearch({
                    //     name: "checkin_validate_graph",
                    //     created_ats: [
                    //       moment().subtract(7, "days").startOf("day").unix(),
                    //       moment().endOf("day").unix(),
                    //     ],
                    //   })
                    // }
                  >
                    <VerificationTotal
                      styles={{
                        height: "100%",
                      }}
                    />
                  </AutoRefresh>
                </div>
              </Card>
            </Col>
          ) : null}
        </Row>
        {linkType === "人像基础库" ? (
          <Row style={{ marginTop: "1vh" }}>
            <Col span={24}>
              <Card
                className={styles["screen-card"]}
                bordered={false}
                title="数据存储"
              >
                <div className={styles.conBorBox}>
                  <div className={styles.bor}></div>
                  <div className={`${styles.line} ${styles.lineTop}`}></div>
                  <div className={`${styles.line} ${styles.lineBottom}`}></div>
                </div>
                <div style={{ height: "10vh" }}>
                  <AutoRefresh
                    autorefresh
                    // services={() =>
                    //   hotelGraphSearch({
                    //     name: "data_person_graph",
                    //     created_ats: [
                    //       moment().startOf("month").unix(),
                    //       moment().endOf("month").unix(),
                    //     ],
                    //   })
                    // }
                  >
                    {(data) => {
                      return (
                        <Row>
                          <Col
                            span={8}
                            style={{ height: "100%", display: "flex" }}
                          >
                            <span
                              style={{
                                color: "rgba(255, 254, 254, 0.8)",
                              }}
                            >
                              平均入库成功
                            </span>
                            <DataStorage
                              data={(data || []).map((item) => {
                                return {
                                  ...item,
                                  // value: item.avg_warehouse_success_rate
                                };
                              })}
                            />
                          </Col>
                          <Col
                            span={8}
                            style={{ height: "100%", display: "flex" }}
                          >
                            <span
                              style={{
                                color: "rgba(255, 254, 254, 0.8)",
                              }}
                            >
                              数据有效性
                            </span>
                            <DataStorage
                              data={(data || []).map((item) => ({
                                ...item,
                                // value: item.data_valid_rate
                              }))}
                            />
                          </Col>
                          <Col
                            span={8}
                            style={{ height: "100%", display: "flex" }}
                          >
                            <span
                              style={{
                                color: "rgba(255, 254, 254, 0.8)",
                              }}
                            >
                              数据信息完整性
                            </span>
                            <DataStorage
                              data={(data || []).map((item) => ({
                                ...item,
                                // value: item.data_complete_rate
                              }))}
                            />
                          </Col>
                        </Row>
                      );
                    }}
                  </AutoRefresh>
                </div>
              </Card>
            </Col>
          </Row>
        ) : null}
      </div>
    </div>
  );
};

export default Screen;
