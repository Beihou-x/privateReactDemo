import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import styles from "../index.less";
import { access_cloud_quality_bad_fifty } from "@/services/access_cloud";
import CarouselList from "./carousel";

const DeviceInfo = (props) => {
  const { title = [] } = props;
  const [deviceData, setDeviceData]: any = useState([]);
  useEffect(() => {
    access_cloud_quality_bad_fifty().then((res) => {
      if (res) {
        const { image_bad_quality = [] } = res;
        setDeviceData(image_bad_quality || []);
      }
    });
  }, []);

  return (
    <div className={styles.listInfo}>
      <div className={styles.deviceInfoTitle}>
        {title.map((item, index) => (
          <span key={index}>{item}</span>
        ))}
      </div>
      {deviceData && deviceData.length ? (
        <CarouselList data={deviceData} />
      ) : (
        ""
      )}
    </div>
  );
};

export default DeviceInfo;
