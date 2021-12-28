import React, { useContext, useEffect, useState } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import { Row, Col, Select, Card, Button, Tabs, Input, message } from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import UploadForm from "@components/DraggerByLocal";
import { test } from "@/utils/request";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import styles from './index.less'
import { applicationTcpSearch, getTcpDetail, toolsMockery } from "@/services/v1";

const { Option } = Select;
const { TabPane } = Tabs;

const AccessTest = () => {
  const [method, setMethod]: any = useState("POST");
  const [url, setUrl]: any = useState("");
  const [status, setStatus]: any = useState();
  const [urlRequest, setUrlRequest]: any = useState("krakatoa/api/v2/tools/mockery");
  const [body, setBody] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const { subscribe, unsubscribe }:any = useContext(DefaultPubSubContext);
  const [applicationTcp, setApplicationTcp] = useState([])

  useEffect(() => {
    subscribe("dragger:jsonresult", handleUpload);

    return () => unsubscribe("dragger:jsonresult", handleUpload);
  }, []);

  useEffect(() => {
    // 获取协议
    applicationTcpSearch({}).then(res => {
      if (res && res.items) {
        setApplicationTcp(res.items)
      }
    })
  }, [])

  const handleUpload = val => {
    const text = JSON.stringify(val);
    setBody(JSON.parse(text));
  };

  const handleSend = () => {
    if (!url) {
      message.error('请求地址不能为空');
    } else {
      // toolsMockery({
      //   method,
      //   url,
      //   body
      // }).then(res => {
      //   console.log('res==', res)
      //   setResponse(res);
      // }).catch(err => {
      //   console.log('err==', err)
      //   setError({
      //     message: `请求错误 ${err.response.status}`,
      //     errorUrl: `${err.response.url}`,
      //     description: err.message,
      //   });
      //   setResponse({});
      // });

      test(urlRequest, {
        method: 'POST',
        body: {
          method,
          url,
          body,
        },
      })
        .then(res => {
          if (res && res.data && typeof res.data === "object") {
            setResponse(res.data);
          } else {
            console.log('===res===', res)
            setResponse(res);
          }
          setStatus(res.code)
          setError({});
        })
        .catch(err => {
          setError({
            message: `请求错误 ${err.response.status}`,
            errorUrl: `${err.response.url}`,
            description: err.message,
          });
          setResponse({});
        });
    }

  };

  // 切换类型
  const onSelect = (id) => {
    getTcpDetail({ id }).then(res => {
      if (res && res.data_example) {
        setBody(res.data_example)
      }else {
        setBody({})
      }
    })
  }

  return (
    <>
      <Card>
        <Row justify="center" align="middle" gutter={16}>
          <Col span={2}>
            <Select
              defaultValue="POST"
              onChange={value => setMethod(value)}
              style={{ width: "100%" }}
            >
              <Option value="POST">POST</Option>
              <Option value="GET">GET</Option>
              <Option value="DELETE">DELETE</Option>
              <Option value="PUT">PUT</Option>
            </Select>
          </Col>
          <Col span={12}>
            {/*<Select onChange={value => setUrl(value)} style={{width: '100%'}}>*/}
            {/*<Option value="1">1400标准</Option>*/}
            {/*</Select>*/}
            <Input onChange={e => setUrl(e.target.value)} />
          </Col>
          <Col span={2}>
            <Button type="primary" onClick={() => handleSend()}>
              请求
            </Button>
          </Col>
        </Row>
        <Row align="middle" justify="center" gutter={16} style={{ marginTop: 10 }}>
          <Col span={2} style={{ textAlign: "left" }}>
            请求信息:
          </Col>
          <Col span={14}>
            下载示例:
            {applicationTcp && applicationTcp.map((m: any, i) => <a key={i} style={{ marginLeft: 20 }} onClick={() => onSelect(m.id)}>{m.name}</a>)}
          </Col>
        </Row>
        <Row justify="center">
          <Col span={16}>
            <Card bordered className={styles.card}>
              <div style={{ height: "50vh" }}>
                <Tabs>
                  <TabPane tab="编辑" key={1}>
                    <JSONInput
                      locale={locale}
                      height="43vh"
                      width='100%'
                      colors={{
                        background: "#191f2a",
                        default: "#848585",
                      }}
                      style={{
                        contentBox: {
                          fontSize: "16px",
                          color: "#848585",
                        },
                        labelColumn: {
                          fontSize: "16px",
                        },
                      }}
                      placeholder={body}
                      onChange={value => setBody((value && value.jsObject) || {})}
                    />
                  </TabPane>
                  {/* <TabPane tab="上传" key={2}>
                  <UploadForm onEmit={() => {}} />
                </TabPane> */}
                </Tabs>
              </div>
            </Card>
          </Col>
        </Row>
        <Row justify="center" gutter={16} style={{ marginTop: 10 }}>
          <Col span={8}>
            返回信息 {status ? `（状态：${status}）` : ''}
            <Card>
              <JSONInput
                locale={locale}
                height="50vh"
                width="100%"
                colors={{
                  background: "#191f2a",
                  default: "#848585",
                }}
                style={{
                  contentBox: {
                    color: "#848585",
                  },
                }}
                viewOnly
                placeholder={response}
              />
            </Card>
          </Col>
          <Col span={8}>
            诊断信息
            <Card>
              <JSONInput
                locale={locale}
                height="50vh"
                width="100%"
                colors={{
                  background: "#191f2a",
                  default: "#848585",
                  string: "red",
                }}
                style={{
                  contentBox: {
                    color: "#848585",
                  },
                }}
                viewOnly
                placeholder={error}
              />
            </Card>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default AccessTest;
