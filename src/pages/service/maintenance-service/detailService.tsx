import React, { useEffect, useState, useContext } from "react";
import { Row, Card, Col, Divider, Button, Image, Descriptions } from "antd";
import { useHistory } from "react-router-dom";
import { serviceSearchOnce } from "@/services/v1";
import { severRunInfo } from "@/services/v2";
import styles from "./index.less";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import { formatDate, filterCategoryValue } from "@/utils/utils";
import { forwardServiceMonitorSearch } from "@/services/v2";

const DetailService = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const history = useHistory();
  const [data, setData]: any = useState({});
  const [data1, setData1]: any = useState([]);
  const [data2, setData2]: any = useState([]);
  const [runInfo, setRunInfo]: any = useState({});
  useEffect(() => {
    serviceSearchOnce({ id }).then((res) => {
      if (res) {
        setData(res);
      }
    });
    severRunInfo(id).then((res) => {
      setRunInfo(res);
    });
    // 服务总次数
    forwardServiceMonitorSearch({ type: 'total', category: 'service', service_id: id }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setData1(arr.length ? arr[0] : []);
    })
    // 响应时间
    forwardServiceMonitorSearch({ type: 'latency', category: 'service', service_id: id }).then(res => {
      const arr = res && res.data && res.data.result && res.data.result[0] && res.data.result[0].values || [];
      setData2(arr.length ? arr[arr.length - 1] : []);
    })
  }, []);

  const getStatus = (val) => {
    if (val === "RUNNING") {
      return "运行中";
    } else if (val === "STOPPING") {
      return "停用";
    } else if (val === "STARTING") {
      return "更新";
    } else {
      return "异常";
    }
  };

  return (
    <div className={styles.detail}>
      <Card bordered={false}>
        <div className={styles.part}>
          <div className={styles.part_1}>
            <Card
              style={{ height: "65vh", overflowY: "auto", marginRight: 10 }}
            >
              <p>基本信息</p>
              <Descriptions column={2}>
                <Descriptions.Item label="名称">{data.name}</Descriptions.Item>
                <Descriptions.Item label="服务类型">
                  {filterCategoryValue('服务', data.category)}
                </Descriptions.Item>
                <Descriptions.Item label="服务IP信息">
                  {data.ip}
                </Descriptions.Item>
                <Descriptions.Item label="服务访问Urls">
                  {data.icon_url}
                </Descriptions.Item>
                {/* 
              <Descriptions.Item label="统计信息">

              </Descriptions.Item> */}
                <Descriptions.Item label="服务版本号">
                  {data.version}
                </Descriptions.Item>
                <Descriptions.Item label="服务当前状态">
                  {getStatus(data.status)}
                </Descriptions.Item>
                {data.category === "PARSEENGIN" ? (
                  ""
                ) : (
                  <Descriptions.Item label="协议名称">
                    {data.protocol_name}
                  </Descriptions.Item>
                )}

                <Descriptions.Item label="创建人">
                  {data.creator}
                </Descriptions.Item>
                <Descriptions.Item label="创建时间">
                  {formatDate(data.created_at, "YYYY-MM-DD")}
                </Descriptions.Item>
              </Descriptions>
              <p>服务质量</p>
              <Descriptions column={2}>
                <Descriptions.Item label="服务总次数">{data1.length ? data1[1] : '-'}</Descriptions.Item>
                <Descriptions.Item label="响应时间">{data2.length && data2[1] ? `${Number(data2[1]).toFixed(2)}ms` : '-'}</Descriptions.Item>
              </Descriptions>
              {/* <p>转发配置</p>
            <Descriptions column={1}>
              <Descriptions.Item label="是否实时转发">aa</Descriptions.Item>
            </Descriptions> */}
              <p>依赖服务</p>
              <Row className={styles.dependency}>
                {data && data.dependency_services
                  ? data.dependency_services.map((m, i) => (
                    <Col span={10} key={i} className={styles.dependency_item}>
                      <div className={styles.dependency_center}>
                        <Image
                          src={m.icon_url}
                          key={m.icon_url}
                          width={130}
                          height={130}
                        />
                        <div style={{ marginTop: 5, color: "#fff" }}>
                          {m.name}
                        </div>
                      </div>
                    </Col>
                  ))
                  : null}
              </Row>
            </Card>
          </div>
          <div className={styles.part_2}>
            <Card
              style={{ height: "65vh", overflow: "hidden", marginLeft: 10 }}
            >
              <p>服务运行信息</p>
              <JSONInput
                locale={locale}
                height="60vh"
                width="100%"
                colors={{
                  background: "transparent",
                  default: "#848585",
                }}
                style={{
                  contentBox: {
                    color: "#848585",
                  },
                }}
                placeholder={runInfo}
                viewOnly
              />
            </Card>
          </div>
          <div className={styles.part_3}>
            <Card
              style={{ height: "65vh", overflow: "hidden", marginLeft: 10 }}
            >
              <p>配置文件信息</p>
              <JSONInput
                locale={locale}
                height="60vh"
                width="100%"
                colors={{
                  background: "transparent",
                  default: "#848585",
                }}
                style={{
                  contentBox: {
                    color: "#848585",
                  },
                }}
                placeholder={data.xconfig}
                viewOnly
              />
            </Card>
          </div>
        </div>
        <div></div>
        <div style={{ textAlign: "right", marginTop: 20 }}>
          <Button onClick={() => history.goBack()}>取消</Button>
        </div>
      </Card>
    </div>
  );
};

export default DetailService;
