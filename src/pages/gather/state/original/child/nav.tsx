import React, { useEffect, useState } from "react";
import styles from "../index.less";
import { access_cloud_head } from "@/services/access_cloud";
import { bigNumberTransform } from "@/utils/utils";
import Event from "@/utils/eventEmitter";

const Nav = () => {
  const defaultData: any = {
    displayMap: {},
    topTotal: {},
  };
  // const [navData, setNavData]: any = useState(defaultData);
  const navData: any = {
    displayMap: {
      displayMap: "字段说明",
      k1: "库数量",
      k2: "人脸总量",
      k3: "人体总量",
      k4: "车辆总量",
      k5: "码总量",
    },
    topTotal: {
      k1: "0",
      k2: "0",
      k3: "0",
      k4: "1000",
      k5: "2",
    },
  };

  // const defaultData = [
  //   {
  //     topTotal: { k1: "0", k2: "0", k3: "0", k4: "1000", k5: "", k6: "" },
  //     displayMap: {
  //       displayMap: "字段说明",
  //       k1: "库数量",
  //       k2: "人脸总量",
  //       k3: "人体总量",
  //       k4: "车辆总量",
  //       k5: "码总量",
  //       k6: "今日质量最优版块",
  //       topTotal: "表头数据",
  //     },
  //   },
  // ];

  const style1 = {
    color: "#FFD200",
    fontSize: 38,
    fontWeight: 600,
  };
  const style2 = {
    color: "#00DCDF",
    fontSize: 30,
    fontWeight: 600,
    verticalAlign: "bottom",
  };
  const style3 = {
    color: "#FFD200",
    fontSize: 38,
    fontWeight: 600,
  };
  const style4 = {
    color: "#FF596A",
    fontSize: 38,
    fontWeight: 600,
  };
  const style5 = {
    color: "#3FF6FE",
    fontSize: 38,
    fontWeight: 600,
  };

  // useEffect(() => {
  //   access_cloud_head().then(res => {
  //     console.log("res===", res);
  //     setNavData(res);
  //   });
  // }, []);

  return (
    <div className={styles.nav}>
      <div className={styles.item}>
        <span className={styles.label}>{navData.displayMap.k1}</span>
        <span className={styles.value} style={style1}>
          {navData.topTotal.k1 ? bigNumberTransform(navData.topTotal.k1) : ""}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>{navData.displayMap.k2}</span>
        <span className={styles.value} style={style1}>
          {navData.topTotal.k2 ? bigNumberTransform(navData.topTotal.k2) : ""}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>{navData.displayMap.k3}</span>
        <span className={styles.value} style={style1}>
          {navData.topTotal.k3 ? bigNumberTransform(navData.topTotal.k3) : ""}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>{navData.displayMap.k4}</span>
        <span className={styles.value} style={style1}>
          {navData.topTotal.k4 ? bigNumberTransform(navData.topTotal.k4) : ""}
        </span>
      </div>
      <div className={styles.item}>
        <span className={styles.label}>{navData.displayMap.k5}</span>
        <span className={styles.value} style={style1}>
          {navData.topTotal.k5}
        </span>
      </div>
    </div>
  );
};

export default Nav;
