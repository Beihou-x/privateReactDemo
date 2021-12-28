import React, { useEffect, useState, useRef } from "react";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import { Card,Button,message } from "antd";
import { serviceSearchOnce } from "@/services/v1";
import {serviceConfig} from "@/services/v2";
import { useHistory } from "react-router-dom";
const XConfig = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const [profileData, setProfileData]: any = useState({});

  useEffect(() => {
    if (id) {
      serviceSearchOnce({ id }).then((res) => {
        if (res) {
          // setData(res);
          setProfileData(res.xconfig||{});
        }
      });
    }
  }, []);

  const saveHandel = () => {
    serviceConfig(id,{
      xconfig: profileData
    }).then(res => {
      message.success('配置成功')!
      history.goBack();
    })
  }

  const history = useHistory();
  return (
    <Card bordered={false}>
      <div style={{ marginBottom: 10 }}>配置文件信息</div>
      {/* <Monaco code={profileData} ref={monacoRef} /> */}
      <JSONInput
        locale={locale}
        height={600}
        width={1000}
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
          setProfileData((value && value.jsObject) || {});
        }}
      />

      <div style={{ textAlign: "right" }}>
        <Button style={{ marginRight: 10 }} onClick={() => history.goBack()}>
          取消
        </Button>
        <Button type="primary" onClick={() => saveHandel()}>
          保存
        </Button>
      </div>
    </Card>
  );
};

export default XConfig;
