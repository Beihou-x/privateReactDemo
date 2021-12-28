import React, { useContext, useEffect, useState } from "react";
import { Row, Col, Select, Card, Button, Tabs, Input, message, List } from "antd";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import UploadForm from "@components/DraggerByLocal";
import { test } from "@/utils/request";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import styles from './index.less'
import { formatDate } from "@/utils/utils";
import { getTcpDetail, toolsMockery } from "@/services/v1";
import { reqResponse,forwardTestGetInfo,getIP } from "@/services/v2";

const { Option } = Select;
const { TabPane } = Tabs;

const ApproveTest = () => {
  const [method, setMethod]: any = useState("POST");
  const [url, setUrl]: any = useState("");
  const [status, setStatus]: any = useState();
  const [urlRequest, setUrlRequest]: any = useState("krakatoa/api/v2/req_response/search");
  const [body, setBody] = useState({});
  const [response, setResponse] = useState({});
  const [error, setError] = useState({});
  const { subscribe, unsubscribe }: any = useContext(DefaultPubSubContext);
  const [active, setActive] = useState(0);
  const [urlPart, setUrlPart] = useState("");
  const [listInfo, setListInfo]:any = useState([]);

  useEffect(() => {
    // reqResponse().then(res => {
    //   console.log('=', res)
    //   if (res && res.url) {
    //     setUrlPart(res.url)
    //   }
    // })
    getIP().then(res => {
      setUrlPart(res)
    })
  }, [])

  useEffect(() => {
    subscribe("dragger:jsonresult", handleUpload);

    return () => unsubscribe("dragger:jsonresult", handleUpload);
  }, []);


  const handleUpload = val => {
    const text = JSON.stringify(val);
    setBody(JSON.parse(text));
  };

  const handleSend = () => {
    if (!url) {
      message.error('请求地址不能为空');
    } else {
      forwardTestGetInfo({
        method,
        url
      }).then(res => {
        setListInfo( Array.isArray(res) ? res : []);
      }).catch(err => {
        setError({
          message: `请求错误 ${err.response.status}`,
          errorUrl: `${err.response.url}`,
          description: err.message,
        });
        setListInfo([]);
      });
    }

  };

  // 切换信息
  const onChangeUrl = (item, index) => {
    reqResponse(item.id).then(res => {
      if (res && res.data && typeof res.data === "object") {
        setResponse(res.data);
      } else {
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
    setActive(index)

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
          <Col span={3}>
            <Input value={urlPart} readOnly />
          </Col>
          <Col span={10}>
            <Input onChange={e => setUrl(e.target.value)} />
          </Col>
          <Col span={1}>
            <Button type="primary" onClick={() => handleSend()}>
              拉 取
            </Button>
          </Col>
        </Row>
        <Row align="middle" justify="center" gutter={16} style={{ marginTop: 10 }}>
          <Col span={16} style={{ textAlign: "left" }}>
            请求信息:
          </Col>
        </Row>
        <Row gutter={24}>
          <Col span={4}>
            <Card>
              <div style={{ height: "50vh", width: '100%', background: "#191f2a", padding: '0 20px' }}>
                <List
                  split={false}
                  itemLayout="horizontal"
                  dataSource={listInfo}
                  renderItem={(item:any, index) => (
                    <List.Item>
                      <List.Item.Meta
                        title={<a onClick={() => onChangeUrl(item, index)} style={{ color: active === index ? '#1890ff' : '#fff' }}>{item.request_at && formatDate(item.request_at,"YYYY-MM-DD HH:mm:ss")}</a>}
                      />
                    </List.Item>
                  )}
                />
              </div>
            </Card>
          </Col>
          <Col span={16}>
            <Row>
              <Col span={24}>
                <Card>
                  <div style={{ height: "50vh" }}>

                    <JSONInput
                      locale={locale}
                      height="50vh"
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
                  </div>
                </Card>
              </Col>
            </Row>
            <Row gutter={16} style={{ marginTop: 10 }}>
              <Col span={12}>
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
              <Col span={12}>
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
          </Col>
        </Row>

      </Card>
    </>
  );
};

export default ApproveTest;
