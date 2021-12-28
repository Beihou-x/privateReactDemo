import React, { useEffect, useState, useRef } from "react";
import { Card, Button, Form, Checkbox, message, Divider } from "antd";
import { useHistory } from "react-router-dom";
import {
  serviceSearchOnce,
  serviceAdd,
  serviceUpdate,
  protocolSearch,
} from "@/services/v1";
import { getServiceConfig, serviceConfig } from "@/services/v2";
import styles from "./index.less";
import AccessConfig from "./child/accessConfig";
import ServerConfig from "./child/serverConfig";
import TransConfig from "./child/transConfig";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";

const addService = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;

  const history = useHistory();
  const childRef: any = Form.useForm();
  const configRef: any = useRef();
  const [data, setData]: any = useState({});
  const [profileData, setProfileData]: any = useState({});
  const [formData, setFormData]: any = useState({});

  const [changeValue, setChangeValue] = useState("");
  useEffect(() => {
    if (id) {
      serviceSearchOnce({ id }).then((res) => {
        if (res) {
          setData(res);
          setProfileData(res.xconfig);
          setFormData(res && res.xconfig && res.xconfig.page)
          setChangeValue(res.category);
        }
      });
    }
  }, []);

  // 配置文件预览信息
  useEffect(() => {
    if (changeValue && !id) {
      getXconfig(changeValue);
    }
  }, [changeValue]);

  const getXconfig = (val) => {
    getServiceConfig({ category: val }).then((res) => {
      setProfileData(res || {});
    });
  };

  // 保存服务

  const saveHandel = () => {
    const vform = childRef[0];
    //可以在验证后再获取值
    // const configJson = monacoRef.current.handelChange();
    try {
      // const Obj = JSON.parse(profileData);
      let xconfig: any = null;
      if (
        changeValue === "INTERFACE_GATEWAY" ||
        changeValue === "SERVICE_GATEWAY" ||
        changeValue === "可信网关" ||
        changeValue === "FTP"
      ) {
        const values = configRef.current.getFormValue();
        xconfig = { ...profileData, ...values };
      } else {
        xconfig = profileData;
      }
      serviceConfig(id, {
        xconfig,
      }).then((res) => {
        message.success("编辑成功");
        history.goBack();
      });
    } catch (err) {
      message.error("配置文件格式错误");
    }
  };

  return (
    <>
      <Card bordered={false}>
        <div className={styles.addService}>
          <div>
            <Divider orientation="left" plain>
              配置文件信息
            </Divider>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ width: "45%" }}>
                <JSONInput
                  locale={locale}
                  height={600}
                  width={"100%"}
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
                  placeholder={profileData}
                  onChange={(value) => {
                    console.log(value);

                    setProfileData((value && value.jsObject) || {});
                  }}
                />
              </div>
              <div style={{ width: "50%" }}>
                {/* 接口网关 */}
                {changeValue === "INTERFACE_GATEWAY" ? (
                  <AccessConfig
                    ref={configRef}
                    data={formData}
                  />
                ) : (
                  ""
                )}
                {/* 服务网关 */}
                {changeValue === "SERVICE_GATEWAY" ? (
                  <ServerConfig
                    ref={configRef}
                    data={formData}
                  />
                ) : (
                  ""
                )}
                {/* 文件压缩算法 */}
                {changeValue === "可信网关" || changeValue === "FTP" ? (
                  <TransConfig
                    ref={configRef}
                    data={formData}
                  />
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 10 }} onClick={() => history.goBack()}>
            取消
          </Button>
          <Button type="primary" onClick={() => saveHandel()}>
            保存
          </Button>
        </div>
      </Card>
    </>
  );
};

export default addService;
