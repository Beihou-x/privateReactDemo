import React, { useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, message, notification, Divider } from "antd";
import VForm from "@components/VForm";
import { protocolAdd, protocolUpdate, getTcpDetail } from "@/services/v1";
import { filterCategory, parseConfig } from "@/utils/utils";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";
import ProtocolConfig from "./protocolConfig";
import schemaData from '../access-tcp/schema.json'

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  const form: any = useRef();
  const history = useHistory();
  const configRef: any = useRef();
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData]: any = useState({});
  const [tcpEditData, setTcpEditData]: any = useState({});
  const [formData, setFormData]: any = useState({});

  useEffect(() => {
    if (id) {
      getTcpDetail({ id }).then(res => {
        setTcpEditData({ ...res, category: res.category.split(',') });
        setFormData(res && res.config && parseConfig(res.config))
        setProfileData(res.data_example ? res.data_example : {});
      })
    }
  }, [id]);

  //新增或修改
  const handleOk = () => {
    const formRef = form.current.getForm();
    try {
      const data_example: any = profileData;
      const config = JSON.stringify(configRef.current.getFormValue());

      formRef
        .validateFields()
        .then((valid) => {
          setLoading(true);
          if (id) {
            protocolUpdate({
              id: id,
              ...valid,
              category: valid.category.join(),
              data_example,
              config,
              type: 'FORWARD'
            }).then((res) => {
              setLoading(false);
              if (res === undefined) {
                message.success("编辑协议成功!");
                history.goBack();
              }
            });
          } else {
            protocolAdd({
              ...valid,
              category: valid.category.join(),
              data_example,
              config,
              type: 'FORWARD'
            }).then((res) => {
              setLoading(false);
              if (res === undefined) {
                message.success("新增协议成功!");
                history.goBack();
              }
            });
          }
        })
        .catch((error) => {
          notification.error({
            message: "有必填项没填",
          });
        });
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const columns = [
    { name: "name", label: "名称", rules: [{ required: true }] },
    {
      name: "category",
      label: "协议类型",
      rules: [{ required: true }],
      type: "select",
      mode: 'multiple',
      list: filterCategory("协议类型"),
    },
  ];

  const layoutCol = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
  };

  return (
    <Card bordered={false}>
      <Divider orientation="left" plain>
        基本信息
      </Divider>
      <VForm columns={columns} ref={form} span={12} layoutCol={layoutCol} data={tcpEditData} />
      <Divider orientation="left" plain>
        配置
      </Divider>
      <ProtocolConfig ref={configRef} data={formData} />
      <Divider orientation="left" plain>
        Schema配置
      </Divider>
      <JSONInput
        locale={locale}
        height={600}
        width={'100%'}
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
        onChange={(value) => setProfileData((value && value.jsObject) || {})}
      />
      <Divider orientation="left" plain>
        Schema示例
      </Divider>
      <JSONInput
        locale={locale}
        height={600}
        width={'100%'}
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
        placeholder={schemaData}
        viewOnly
      />
      <div style={{ background: "#2B3748", textAlign: "right", marginTop: 20 }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          保存
        </Button>
      </div>
    </Card>
  );
};
export default AddForm;
