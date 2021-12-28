import React, { useEffect, useState } from "react";
import { deviceImageSearch } from "@/services/v2";
import { Row, Image } from "antd";
import styles from "./index.less";
import { Link } from "react-router-dom";

const ExpandedRow = ({ values }) => {

  const [datas, setData]: any = useState([]);

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async () => {
    const response = await deviceImageSearch({
      device_id: values.device_id,
      limit: 10,
      offset: 0
    });

    setData(response && response.items || []);
  };

  return (
    <div className={styles.detail}>
      <Row gutter={32}>
        {(datas || []).map((item, index) => (
          <div className={styles.imgBox} key={index}>
            <Image src={item.url} width='80%' height='80%' />
          </div>
        ))}
      </Row>
      <Link to={`/device/detect/wx_small_pic_qualified_detect_detail/${values && values.device_id}`}>
        <p className={styles.more}>查看更多图片</p>
      </Link>
    </div>
  );
};

export default ExpandedRow;
