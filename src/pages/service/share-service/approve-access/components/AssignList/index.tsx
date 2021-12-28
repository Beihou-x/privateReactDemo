import React, { useEffect, useState } from "react";
import { Row, Descriptions, Card, Select, Col, Radio } from "antd";
import styles from "./index.less";
import {
  clusterSearch,
  capabilityServicesSearch,
  serviceSearchOnce,
} from "@/services/v1";

import Event from "@/utils/eventEmitter";

const AssignList = () => {
  const [selectList, setSelectList] = useState([]);
  const [list, setList] = useState([]);
  const [checkedKeys, setCheckedKeys] = useState([]);
  const [detailInfo, setDetailInfo]: any = useState({});

  const onChangeTree = e => {
    //多选框数据
    capabilityServicesSearch({
      categorys: ['FORWARD', 'ASYNC_FORWARD'],
      id: e
    }).then(res => {
      const { items = [] } = res;
      if (items && items.length) {
        setList(items);
      } else {
        setList([])
      }
    });
  };

  //详情信息
  const onChange = async checkedKeys => {
    try {
      const id = checkedKeys.target.value;
      const response = await serviceSearchOnce({ id });
      (Event as any).emit("serveChange", id);
      setDetailInfo((response && response) || {});
    } catch (e) {
      console.error(e);
    }
  };

  //select下拉框数据
  useEffect(() => {
    clusterSearch({}).then(res => {
      const { items = [] } = res;
      if (items && items.length) {
        const arr = items.map(m => {
          return { label: m.name, value: m.id };
        });
        setSelectList(arr);
      }
    });
  }, []);

  const getStatus = (val) => {
    if (val === "START") {
      return "就绪";
    } else if (val === "STARTING") {
      return "启动中";
    } else if (val === "RUNNING") {
      return "运行中";
    } else if (val === "STOPPING") {
      return "停止中";
    } else if (val === "UNKNOW") {
      return "未知"
    } else {
      return "就绪"
    }
  };

  return (
    <Row>
      <div className={styles.source}>
        <Card style={{ width: 350, overflowY: "auto" }}>
          <Select
            style={{ width: "100%", marginBottom: 8 }}
            options={selectList}
            onChange={onChangeTree}
          />
          <Radio.Group style={{ width: "100%" }} onChange={onChange}>
            {(list || []).map((item: any, index) => {
              return (
                <p key={index} style={{ color: "#fff" }}>
                  <Radio value={item.id}>{item.name}</Radio>
                </p>
              );
            })}
          </Radio.Group>
        </Card>
        <Card style={{ width: 700, overflowY: "auto" }}>
          <div>
            {/* <Image
              src={detailInfo.icon_url}
              width={100}
              height={100}
              style={{ marginLeft: 100 }}
            ></Image> */}
            <Descriptions column={2}>
              <Descriptions.Item label="服务名称">
                {detailInfo.name}
              </Descriptions.Item>
              <Descriptions.Item label="IP">{detailInfo.ip}</Descriptions.Item>
              <Descriptions.Item label="服务类型">
                {detailInfo.category}
              </Descriptions.Item>
              <Descriptions.Item label="服务当前状态">
                {getStatus(detailInfo.status)}
              </Descriptions.Item>
              <Descriptions.Item label="服务协议">
                {detailInfo.protocol}
              </Descriptions.Item>
              <Descriptions.Item label="依赖服务器信息">
                <Row style={{ width: "100%" }}>
                  {(detailInfo.dependency_services || []).map((f, i) => (
                    <Col
                      span={6}
                      key={i}
                      style={{ textAlign: "center" }}
                    >
                      {/* <Image
                                    src={f.icon_url}
                                    key={f.icon_url}
                                    width={50}
                                    height={50}
                                  /> */}
                      <div>{f.name}</div>
                    </Col>
                  ))}
                </Row>
              </Descriptions.Item>
            </Descriptions>
          </div>
        </Card>
      </div>
    </Row>
  );
};

export default AssignList;
