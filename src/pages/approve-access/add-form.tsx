import React, { useEffect, useState } from 'react';
import {
  Form,
  message,
  Button,
  Card,
  Row,
  Col,
  Select,
  Tabs,
  Transfer,
  notification,
} from 'antd';
import { useHistory } from 'react-router-dom';
import { searchBySourceId, deviceWithTotal, applicationSearch, forwardTemplate, forwardUpload, accessSearch, forwardRequestAdd, deviceSearchByGroup, deviceGroupSearch } from '@/services/v1';
import DownloadTemplate from '@components/DownloadTemplate';
import Upload from '@components/Upload';

import VForm from '@components/VForm'
import DeivceList from './components/DeviceList';
import TagDimensionList from './components/TagDimensionList';

const { Option } = Select;
const { TabPane } = Tabs;

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  const form = Form.useForm();
  const [initialValues, setInitial] = useState({});
  const history = useHistory();
  const { match: { params: { id } } }: any = props;
  const [type, setType] = useState('');
  const [devices, setDevices] = useState([]);
  const [sources, setSources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false)
  const [applications, setApplication] = useState([])

  useEffect(() => {
    applicationSearch({}).then(res => {
      const { items = [] } = res
      if (items && items.length) {
        setApplication(items.map(m => { return { label: m.name, value: m.id } }))
      }
    })
  }, [])

  const columns = [
    { name: 'no', label: '申请编号' },
    { name: 'title', label: '申请标题' },
    { name: 'forward_begin', label: '开始时间', type: 'datePicker', format: 'YYYY-MM-DD', rules: [{ required: true }] },
    { name: 'forward_end', label: '结束时间', type: 'datePicker', format: 'YYYY-MM-DD', rules: [{ required: true }] },
    { name: 'vendor', label: '申请转发单位' },
    { name: 'application_id', type: 'select', label: '申请应用', list: applications },
    { name: 'protocol', label: '转发协议', rules: [{ required: true }], type: 'select', list: [{ value: 'HTTP协议', label: 'HTTP协议' }, { value: 'HTTPS协议', label: 'HTTPS协议' }] },
    { name: 'contact', label: '申请联系人' },
    { name: 'telephone', label: '联系人手机号' },
  ]

  const columns1 = [
    {
      name: 'type', label: '选择设备', rules: [{ required: true }], type: 'select', list: [{ value: '1', label: '全部设备' }, { value: '2', label: '选择设备' }],
      onChange: (e) => {
        setType(e)
        if (e === '1') {
          setDevices([]);
          setGroups([]);
          setSources([]);
        }
      }
    },
  ]

  //新增
  const handleOk = () => {
    const vform = form[0]
    //可以在验证后再获取值
    vform.validateFields().then(valid => {
      setLoading(true)
      const start: any = new Date(valid.forward_begin);
      const end: any = new Date(valid.forward_end);
      let params: any = {
        ...valid,
        forward_begin: Date.parse(start) / 1000,
        forward_end: Date.parse(end) / 1000
      }

      if (devices.length) {
        params.device = devices
      }
      if (sources.length) {
        params.source = sources.map((d: any) => d.id)
      }
      if (groups.length) {
        params.source = groups.map((d: any) => d.id)
      }

      forwardRequestAdd({
        ...params,
      }).then(res => {
        setLoading(false)
        if (res && res.length === 0) {
          history.goBack()
        }
      })
      console.log('params', params)
    }).catch((error) => {
      console.log('error', error)
      notification.error({
        message: '有必填项没填'
      })
    })
  };

  // 切换tab
  const onChange = (key) => {
    // setDevices([])
  }

  // 更改选中设备
  const onChangeDevice = (nextTargetKeys) => {
    setDevices(nextTargetKeys)
  }

  // 更改选中来源
  const onChangeSources = (nextTarget: any) => {
    setSources(nextTarget)
  }

  // 更改选中标签
  const onChangeGroups = (nextTarget: any) => {
    setGroups(nextTarget)
  }

  return (
    <Card bordered={false}>
      <p>填写信息</p>
      <VForm columns={columns} form={form} span={8} />
      <p>选择设备</p>
      <VForm columns={columns1} form={form} span={8} />
      {/* 选择设备 */}
      {type === '2' ?
        <Tabs defaultActiveKey="1" onChange={onChange}>
          {/* <TabPane tab="导入" key="1">
            <>
              <DownloadTemplate
                services={() => {
                  return forwardTemplate({})
                }}
                type="link"
              >
                下载模板
              </DownloadTemplate>
              <Upload
                services={({ formData }) => {
                  return forwardUpload({
                    file: formData
                  })
                }}
              />
            </>
          </TabPane> */}
          <TabPane tab="设备" key="2">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DeivceList
                services={(params) => accessSearch(params)}
                onChange={onChangeDevice}
                values={devices}
              />
            </div>
          </TabPane>
          <TabPane tab="标签" key="3">
            <TagDimensionList
              active='3'
              values={groups}
              onChange={onChangeGroups}
              deviceServices={async (params) => {
                return deviceSearchByGroup(params);
              }}
              services={async (params) => {
                return deviceGroupSearch({
                  ...params,
                  parent_id: '0',
                  orderBy: 'sequence'
                })
              }}
            />
          </TabPane>
          <TabPane tab="来源" key="4">
            <TagDimensionList
              active='4'
              values={sources}
              onChange={onChangeSources}
              deviceServices={async (params) => {
                return searchBySourceId(params);
              }}
              services={async (params) => {
                return deviceWithTotal(params)
                  .then(res => {
                    return res;
                  })
              }}
            />
          </TabPane>
        </Tabs> : ''}

      <div style={{ background: '#2B3748', textAlign: 'right', marginTop: 10 }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};

export default AddForm;