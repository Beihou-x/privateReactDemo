import React, { useEffect, useState } from "react";
import { Empty, Card, Row, Col, Divider, Space } from "antd";
import { serviceSearchOnce, serviceDiscription } from "@/services/v1";
import { useLocation } from "react-router-dom";
import CheckBox from "./components/CheckBox";
import CheckBoxGroup from "./components/CheckBox/CheckBoxGroup";

type ServiceInfoProps = {};

const ServiceInfo: React.FC<ServiceInfoProps> = props => {
  const [info, setInfo] = useState({});
  const query = new URLSearchParams(useLocation().search);
  const [discription, setDiscription]: any = useState([]);
  const {
    match: {
      params: { id },
    },
  }: any = props;

  useEffect(() => {
    handleSearch();
    handleDiscriptionSearch();
  }, []);

  const handleDiscriptionSearch = async () => {
    try {
      const response = await serviceDiscription({
        name: (query.get("type") && query.get("type")) || null,
      });

      setDiscription((response && response) || []);
    } catch (e) {
      console.error(e);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await serviceSearchOnce({ id });

      setInfo((response && response) || {});
    } catch (e) {
      console.error(e);
    }
  };

  const formLayout = { labelCol: { span: 8 }, wrapperCol: { span: 12 } };

  return (
    <Card bordered={false}>
      <Row gutter={12}>
        <Col span={12}>
          <p>基本信息</p>
          {(discription || [])
            .filter(q => q.attribute === "基础数据")
            .map(item => (
              <p>
                <Space direction="horizontal" size="large">
                  <span>{item.display}:</span>
                  <span>{info[item.name]}</span>
                </Space>
              </p>
            ))}
        </Col>
        <Divider type="vertical" style={{ height: "auto" }} />
        <Col span={11}>
          <p>转发配置</p>
          {(discription || [])
            .filter(q => q.attribute === "转发配置")
            .map(item => (
              <p>
                <Space direction="horizontal" size="large">
                  <span>{item.display}:</span>
                  <span>{info[item.name]}</span>
                </Space>
              </p>
            ))}
        </Col>
      </Row>
      <Divider />
      <Row gutter={12}>
        <Space direction="vertical" style={{ width: "100%" }}>
          <div>
            <p>依赖服务:</p>
            <CheckBoxGroup services={serviceSearchOnce} id={(id && id) || ""}>
              {group => (
                <>
                  <Row gutter={32}>
                    {group.map(item => (
                      <Col span={4}>
                        <CheckBox values={item} disabled />
                      </Col>
                    ))}
                  </Row>
                  {group.length === 0 ? <Empty /> : null}
                </>
              )}
            </CheckBoxGroup>
          </div>
        </Space>
      </Row>
    </Card>
  );
};

export default ServiceInfo;
