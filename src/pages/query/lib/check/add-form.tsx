import React, { useEffect, useState } from 'react';
import {
  Card,
  Button,
  notification,
  Form,
  message
} from 'antd';
import { useHistory } from 'react-router-dom';
import VForm from '@components/VForm'

import { deviceSyncAdd, deviceSyncDetail, deviceSyncUpdate, applicationTcpSearch } from '@/services/v1';
import { filterCategory } from '@/utils/utils'
import moment from 'moment';

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props: any) => {
  const { match = {} } = props
  const { params = {} } = match
  const { id } = params
  const history = useHistory();
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({})
  const [data1, setData1] = useState([])
  const form = Form.useForm()

  useEffect(() => {
    // 协议
    applicationTcpSearch({
      limit: 999,
      offset: 0,
      type: 'ACCESS'
    }).then(res => {
      setData1(res && res.items || [])
    })
    if (id) {
      deviceSyncDetail({ id }).then(res => {
        setData({ ...res, equipped_time: moment(res.equipped_time), inst_time: moment(res.inst_time), active_time: moment(res.active_time) })
      })
    }
  }, [id])

  //新增或修改
  const handleOk = () => {
    const vform = form[0]
    //可以在验证后再获取值
    vform.validateFields().then(valid => {
      setLoading(true)
      const params = {
        ...valid,
        // inst_time: moment(valid.inst_time).format('YYYY-MM-DD'),
        // equipped_time: moment(valid.equipped_time).format('YYYY-MM-DD'),
        // active_time: moment(valid.active_time).format('YYYY-MM-DD'),
      }

      if (id) {
        deviceSyncUpdate({ ...params, id }).then(res => {
          setLoading(false)
          if (res === undefined) {
            message.success('编辑成功')
            history.goBack()
          }
        })

        return
      }
      deviceSyncAdd(params).then(res => {
        setLoading(false)
        if (res === undefined) {
          message.success('新增成功')
          history.goBack()
        }
      })

    }).catch((error) => {
      console.log('error', error)
      notification.error({
        message: '有必填项没填'
      })
    })
  };

  const columns1 = [
    { name: 'id', label: '设备编码', rules: [{ required: true }] },
    { name: 'source', label: '接入来源', type: 'select', list: filterCategory('接入来源') },
    { name: 'name', label: '设备名称' },
    { name: 'alias', label: '点位俗称' },
    // { name: 'status', type: 'select', label: '设备状态', rules: [{ required: true }], list: filterCategory('设备状态') },
    { name: 'longitude', type: 'inputNumber', label: '经度', rules: [{ required: true }], tooltip: '经纬度的精度必须精确到小数点后六位' },
    { name: 'latitude', type: 'inputNumber', label: '纬度', rules: [{ required: true }], tooltip: '经纬度的精度必须精确到小数点后六位' },
    { name: 'model', label: '设备型号' },
    { name: 'protocol_id', type: 'select', label: '模型', rules: [{ required: true }], list: data1.map((m: any) => { return { label: m.name, value: m.id } }) },
    { name: 'manufactor_code', type: 'select', label: '设备厂商', list: filterCategory('设备厂商') },
    { name: 'function_type', type: 'select', label: '摄像机功能类型', rules: [{ required: true }], list: filterCategory('摄像机功能类型') },
    { name: 'location_type', type: 'select', label: '摄像机位置类型', rules: [{ required: true }], list: filterCategory('摄像机位置类型') },
    { name: 'project_type', type: 'select', label: '设备建设类型', rules: [{ required: true }], list: filterCategory('设备建设类型') },
    { name: 'police_class', type: 'select', label: '所属警种', rules: [{ required: true }], list: filterCategory('所属警种') },
    { name: 'area_type', type: 'select', label: '监控区域类型', rules: [{ required: true }], list: filterCategory('监控区域类型') },
    { name: 'ipv4', label: 'IPV4' },
    { name: 'ipv6', label: 'IPV6' },
    { name: 'port', label: '设备端口' },
    { name: 'mac', label: '摄像机MAC地址' },
    { name: 'login', label: '登陆用户名' },
    { name: 'password', label: '登陆密码' },
    { name: 'tollgate_id', label: '车道编号' },
    { name: 'lane_id', label: '卡口编号' },
    { name: 'networking', label: '承载网络', type: 'select', list: filterCategory('所属网络') },
    { name: 'place_code', label: '安装地点行政区编号' },
    { name: 'jurisdiction', label: '所属辖区公安机关' },
    { name: 'management', label: '管理单位' },
    { name: 'management_contact', label: '管理单位联系方式', },
    { name: 'maintenance', label: '运维单位' },
    { name: 'maintenance_contact', label: '运维单位联系方式' },
    { name: 'alarm', label: '预警下发单位' },
  ]

  return (
    <Card bordered={false}>
      <VForm columns={columns1} form={form} data={data} />
      <div style={{ background: '#2B3748', textAlign: 'right' }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};

export default AddForm;