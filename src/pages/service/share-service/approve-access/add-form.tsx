import React, { useEffect, useState } from 'react';
import {
  Form,
  message,
  Button,
  Card,
  Select,
  Tabs,
  notification,
  Spin
} from 'antd';
import { useHistory } from 'react-router-dom';
import {
  applicationSearch,
  forwardRequestAdd,
  forwardSearch,
  protocolSearch,
  forwardRequestUpdate,
} from "@/services/v1";
import { subscribeSearch } from "@/services/v2"
import VForm from '@components/VForm';
import { filterCategory, formatStartData, formatEndData } from "@/utils/utils";
import moment from 'moment';

const { Option } = Select;
const { TabPane } = Tabs;

type AddFormProps = {};

const AddForm: React.FC<AddFormProps> = (props) => {
  const form = Form.useForm();
  const [initial, setInitial] = useState({});

  const history = useHistory();
  const [type, setType] = useState('');
  const [device, setDevice] = useState([]);
  const [sources, setSources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)

  const [applications, setApplication] = useState([])
  const [protocol, setProtocol] = useState([]);
  const [subscribe, setSubscribe] = useState([]);

  const { match: { params: { id } } }: any = props;

  useEffect(() => {

  }, [])

  useEffect(() => {
    if (id) {
      getData(id)
    }
  }, [id])

  // 获取数据
  const getData = async (id) => {
    setLoading1(true)
    // 申请应用
    await applicationSearch({
      limit: 999
    }).then(res => {
      const { items = [] } = res
      if (items && items.length) {
        setApplication(items.map(m => { return { label: m.name, value: m.id } }))
      } else {
        setApplication([])
      }
    })
    // 转发协议
    await protocolSearch({
      type: "FORWARD",
      limit: 999
    }).then(res => {
      const { items = [] } = res;
      if (items && items.length) {
        setProtocol(items.map(m => { return { label: m.name, value: m.id } }))
      } else {
        setProtocol([])
      }
    })
    // 订阅
    await subscribeSearch({ limit: 10, offset: 0 }).then(res => {
      const { items = [] } = res;
      setSubscribe(items ? items.map(m => { return { label: m.name, value: m.id } }) : []);
    })

    forwardSearch({ id }).then(res => {
      setLoading1(false)
      if (res && res.items) {
        //编辑初始化,保存数据
        let begin = moment(res.items[0].begin * 1000)
        let end = moment(res.items[0].end * 1000);
        setInitial({ ...res.items[0], begin, end, maintenance: res.items[0].maintenance_code });

        setDevice(res.items[0].devices ? res.items[0].devices.map(item => item.device_id) : []);
        setSources(res.items[0].sources ? res.items[0].sources.map(item => item.source_name) : []);
        setGroups(res.items[0].tags ? res.items[0].tags.map(item => item.tag_id) : []);
        if (res.items[0].devices || res.items[0].sources || res.items[0].groups) {
          setType('2')
        }
      }
    })
  }

  const columns = [
    { name: 'title', label: '申请标题', rules: [{ required: true }] },
    { name: 'begin', label: '开始时间', type: 'datePicker', format: 'YYYY-MM-DD', rules: [{ required: true }] },
    { name: 'end', label: '结束时间', type: 'datePicker', format: 'YYYY-MM-DD', rules: [{ required: true }] },
    { name: 'application_id', type: 'select', label: '申请应用', list: applications, rules: [{ required: true }] },
    { name: 'protocol_id', type: 'select', label: '转发协议', rules: [{ required: true }], list: protocol },
    { name: "data_types", type: "select", label: "数据类型", rules: [{ required: true }], list: filterCategory('转发申请数据类型'), mode: "multiple" },
    { name: 'maintenance', type: 'select', label: '运维单位名称', rules: [{ required: true }], list: filterCategory('运维单位') },
    { name: "subscribe_id", type: "select", label: "订阅", list: subscribe },
    { name: 'maintenance_contact', label: '运维单位联系方式' },

    { name: 'description', type: 'textarea', label: '申请描述' },
  ]

  const columns1 = [
    {
      name: 'type', label: '选择设备', rules: [{ required: true }], type: 'select', list: [{ value: '1', label: '全部设备' }, { value: '2', label: '选择设备' }],
      onChange: (e) => {
        setType(e)
        if (e === '1') {
          setDevice([]);
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
      let params: any = {
        ...valid,
        begin: formatStartData(valid.begin),
        end: formatEndData(valid.end)
      }
      if (device.length) {
        params.devices = device;
      }
      if (sources.length) {
        params.sources = sources;
      }
      if (groups.length) {
        params.tags = groups;
      }

      if (id) {
        forwardRequestUpdate({
          id,
          ...params,
        }).then(res => {
          setLoading(false)
          if (res === undefined){
            message.success('编辑成功!')
            setInitial({})
            history.goBack()
          }
        })
      } else {
        forwardRequestAdd({
          ...params,
        }).then(res => {
          setLoading(false)
          if (res === undefined) {
            message.success('新增申请成功!')
            setInitial({})
            history.goBack()
          }
        })
      }

    }).catch((error) => {
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
    setDevice(nextTargetKeys)
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
    <Card bordered={false} bodyStyle={{ height: "108vh" }}>
      <p>填写信息</p>
      <Spin spinning={loading1}>
        <VForm columns={columns} form={form} span={8} data={initial} />
      </Spin>
      {/* <p>选择设备</p>
      <VForm columns={columns1} form={form} span={8} data={{ type: type }} /> */}
      {/* 选择设备 */}
      {/* {type === '2' ?
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab="导入" key="1">
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
          </TabPane>
          <TabPane tab="设备" key="2">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <DeivceList
                services={(params) => accessSearch(params)}
                onChange={onChangeDevice}
                values={device}
              />
            </div>
          </TabPane>
          <TabPane tab="标签" key="3">
            <TagDimensionList
              active='3'
              values={groups}
              onChange={onChangeGroups}
              deviceServices={(params) => {
                return deviceSearchByGroup(params);
              }}
              services={(params) => {
                return forwardApplyAddDeviceTag({
                })
              }}
            // services={async (params) => {
            //   return forwardApplyAddDeviceTag({
            //     ...params,
            //     parent_id: '0',
            //     orderBy: 'sequence'
            //   })
            // }}
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
              }}
            />
          </TabPane>
        </Tabs> : ''} */}

      <div style={{ background: '#2B3748', textAlign: 'right', marginTop: 10 }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};

export default AddForm;