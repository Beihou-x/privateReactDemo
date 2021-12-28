
import React, { useRef, useState, useEffect } from "react";
import { useHistory } from 'react-router-dom';
import { Card,Button,message,notification } from "antd";
import VForm from "@components/VForm";
import { accessApplyAdd, applicationTcpSearch } from "@/services/v1";
import { filterCategory, getCodeValue } from "@/utils/utils";


type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  const categorys = filterCategory("接入申请类型") || [];
  const maintenances = filterCategory("运维单位") || [];
  const sources = filterCategory("接入来源") || [];

  const form: any = useRef();
  const history = useHistory();
  const { match: { params: { id } } }: any = props;
  const [loading, setLoading] = useState(false)

  const [protocols, setProtocol] = useState([]);

  useEffect(() => {
    applicationTcpSearch({
      type: "ACCESS",
      limit: 999
    }).then((res) => {
      if (res && res.items && res.items.length) {
        setProtocol(
          res.items.map((m) => {
            return { label: m.name, value: m.id };
          })
        );
      }
    });
  }, []);



  //新增或修改
  const handleOk = () => {

    const formRef = form.current.getForm()
    try {
      formRef.validateFields()
        .then((valid) => {
          setLoading(true);
          accessApplyAdd({
            ...valid,
            maintenance: getCodeValue(maintenances, valid.maintenance_code),
          }).then((res) => {
            setLoading(false);
            if (res===undefined) {
              message.success('新增接入成功!');
              history.goBack();
            }
          });
        }).catch((error) => {
          notification.error({
            message: '有必填项没填'
          })
        })
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const columns = [
    { name: "title", label: "申请标题", rules: [{ required: true }] },
    {
      name: "category",
      label: "类型",
      type: "select",
      list: categorys,
      rules: [{ required: true }],
    },
    {
      name: "maintenance_code",
      label: "运维单位名称",
      type: "select",
      list: maintenances,
      rules: [{ required: true }],
    },
    {
      name: "maintenance_contact",
      label: "运维单位联系方式",
    },
    {
      name: "protocol_id",
      label: "接入协议",
      type: "select",
      list: protocols,
      rules: [{ required: true }],
    },
    {
      name: "source",
      label: "接入来源",
      type: "select",
      list: sources,
      rules: [{ required: true }],
    },
    {
      name: "description",
      label: "描述信息",
      type: "textarea",
    },
  ];

  return (
    <Card bordered={false}>
      <VForm columns={columns} ref={form} />
      <div style={{ background: '#2B3748', textAlign: 'right' }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};
export default AddForm;