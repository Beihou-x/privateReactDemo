import React, { useEffect, useState } from "react";
import styles from "../index.less";
import { access_cloud_head } from "@/services/access_cloud";
import { bigNumberTransform } from "@/utils/utils";
import todayCatch from "@/assets/dashboard/todaycatch.png";
import superImg from "@/assets/dashboard/super.png";
import humanFace from "@/assets/dashboard/human.png";
import picImg from "@/assets/dashboard/picture.png";
const Nav = () => {
  const defaultData = {
    displayMap: {},
    topTotal: {},
  };
  const [navData, setNavData]: any = useState(defaultData);
  useEffect(() => {
    access_cloud_head().then((res) => {
      setNavData(res);
    });
  }, []);

  return (
    <div className={styles.nav}>
      <div className={styles.navLeft}>
        <div className={styles.navLeftItem}>
          <img src={todayCatch} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k4}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k4 || 0}</div>
          </div>
        </div>
        <div className={styles.navLeftItem}>
          <img src={superImg} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k10}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k10 ? navData.topTotal.k10 : '0'}</div>
          </div>
        </div>
        <div className={styles.navLeftItem}>
          <img src={humanFace} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k2}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k2 ? bigNumberTransform(navData.topTotal.k2) : '0'}</div>
          </div>
        </div>
        <div className={styles.navLeftItem}>
          <img src={humanFace} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k3}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k3 ? bigNumberTransform(navData.topTotal.k3) : '0'}</div>
          </div>
        </div>
        {/* <div className={styles.navLeftItem}>
          <img src={picImg} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k9}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k9 ? bigNumberTransform(navData.topTotal.k9) : '0'}</div>
          </div>
        </div> */}
        <div className={styles.navLeftItem}>
          <img src={picImg} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k_face}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k_face ? bigNumberTransform(navData.topTotal.k_face) : '0'}</div>
          </div>
        </div>
        <div className={styles.navLeftItem}>
          <img src={picImg} alt="" />
          <div className={styles.leftItemContent}>
            <div className={styles.leftItemContentTitle}>{navData.displayMap.k_motor}</div>
            <div className={styles.leftItemContentValue}>{navData.topTotal.k_motor ? bigNumberTransform(navData.topTotal.k_motor) : '0'}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
