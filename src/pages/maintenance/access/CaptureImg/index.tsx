import React from "react";
import { Image } from "antd";
import styles from "./index.less";

type CaptureImgProps = {
  width?: number | string;
  height?: number | string;
  url: string;
  tip?: string;
};

const CaptureImg: React.FC<CaptureImgProps> = ({ width, height, url, tip }) => {
  return (
    <div className={styles["capture-img"]}>
      <Image key={url} width={width} height={height} src={url} />
      <p>{tip}</p>
    </div>
  );
};

export default CaptureImg;
