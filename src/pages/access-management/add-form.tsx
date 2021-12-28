import React, { useEffect, useRef, useState } from 'react';
import {
  message,
  Button,
  Card,
  notification
} from 'antd';
import { useHistory } from 'react-router-dom';
import VForm from '@components/VForm';
import { applicationTcpSearch, accessSearchOnce, accessAdd } from '@/services/v1';
import { accessManageUpdate } from '@/services/v2';
import { filterCategory } from "@/utils/utils"

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  const form: any = useRef();
  const [initialValues, setInitial] = useState({});
  const history = useHistory();
  const { match: { params: { id } } }: any = props;
  const [loading, setLoading] = useState(false);
  const sources = filterCategory("接入来源") || [];
  const [data1, setData1] = useState([]);
  useEffect(() => {
    getData()
  }, []);

  const getData = async () => {
    // 协议
    await applicationTcpSearch({
      limit: 999,
      offset: 0,
      type: 'ACCESS'
    }).then(res => {
      setData1(res && res.items || [])
    })
    if (!!id) {
      //执行查询操作
      accessSearchOnce({
        id
      }).then(res => {
        setInitial(res || {})
      })
    }
  }

  //新增或修改
  const handleOk = () => {

    const formRef = form.current.getForm()
    try {
      formRef.validateFields()
        .then(async (fieldsValue: any) => {
          setLoading(true)
          if (id) {
            accessManageUpdate(id, { ...fieldsValue }).then(res => {
              setLoading(false)
              message.success("配置成功")
              history.goBack()
            })
          } else {
            accessAdd({ ...fieldsValue }).then(res => {
              setLoading(false)
              message.success("登记成功")
              history.goBack()
            })
          }

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
    { name: 'device_id', label: '设备编码', rules: [{ required: true }], tooltip: '长度要为20位' },
    { name: 'alias', label: '设备名称', rules: [{ required: true }] },
    { name: 'protocol_id', type: 'select', label: '模型', rules: [{ required: true }], list: data1.map((m: any) => { return { label: m.name, value: m.id } }) },
    // { name: 'is_online', label: '设备是否在线',type: "select", list: [{label: '在线',value: 'online'},{label: "离线", value: "offline"}] ,rules: [{ required: true }]},
    { name: 'longitude', label: '经度', type: 'inputNumber', tooltip: '小数点后精度位6位' },
    { name: 'latitude', label: '纬度', type: 'inputNumber', tooltip: '小数点后精度位6位' },
    { name: 'place', label: '地点' },
    { name: 'place_code', label: '地点编号', tooltip: '设备编码前6位' },
    { name: 'ipv4', label: '设备IP' },
    { name: 'port', label: '设备端口' },
    { name: 'manufactor', label: '设备厂商' },
    { name: 'model', label: '设备型号' },
    // { name: 'tags', label: '设备标签' },
    // { name: 'source_id', label: '设备来源', type: 'select', list: sources },
    // { name: 'device_name', label: '设备用户名' },
    // { name: 'device_pwd', label: '设备密码' },
    // { name: 'date', label: '设备安装时间', type: 'datePicker' },
  ]

  return (
    <Card bordered={false}>
      <VForm columns={columns} ref={form} data={initialValues} />
      <div style={{ background: '#2B3748', textAlign: 'right' }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};
export default AddForm;