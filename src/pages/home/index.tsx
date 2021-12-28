import React, { useEffect, useState } from "react";

import icons from "@/assets/home_pic";
import styles from "./index.less";
import { homePageSearch } from "@/services/v2";

const Home = () => {
  const [data, setData]: any = useState([]);
  useEffect(() => {
    homePageSearch().then(res => {
      setData(res || [])
    })
  }, [])

  return (
    <div className={styles.content}>
      <div className={styles.linkContent}>
        {data.map((item, index) => (
          <a href={`/#${item.path}`} key={index} className={styles.square}>
            <img src={item.icon_name && icons[item.icon_name] ? icons[item.icon_name] : icons['img1']} alt="" />
            <div className={styles.name}>{item.name}</div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Home;
