import React, { useEffect, useState } from 'react';
import {
  Form,
  message,
  Button,
  Card,
  Select,
  Tabs,
  notification,
} from 'antd';
import { useHistory } from 'react-router-dom';
import {
  searchBySourceId,
  deviceWithTotal,
  applicationSearch,
  forwardTemplate,
  forwardUpload,
  accessSearch,
  forwardRequestAdd,
  deviceSearchByGroup,
  forwardApplyAddDeviceTag,
  forwardSearch,
  protocolSearch,
  forwardRequestUpdate,
  
} from "@/services/v1";
import { subscribeSearch,forwardDataFilter} from "@/services/v2"
import DownloadTemplate from '@components/DownloadTemplate';
import Upload from '@components/Upload';
import VForm from '@components/VForm';
import DeivceList from './components/DeviceList';
import TagDimensionList from './components/TagDimensionList';
import { filterCategory, formatStartData, formatEndData } from "@/utils/utils";
import moment from 'moment';

const { TabPane } = Tabs;

type AddFormProps = {};

// 此页面将原来新增和编辑中的选择设备功能单独抽离


const AddForm: React.FC<AddFormProps> = (props) => {
  const form = Form.useForm();
  const [initial, setInitial] = useState({});

  const history = useHistory();
  const [type, setType] = useState('');
  const [device, setDevice] = useState([]);
  const [sources, setSources] = useState([]);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false)

  const { match: { params: { id } } }: any = props;


  useEffect(() => {
    if (id) {
      forwardSearch({ id }).then(res => {
        if (res && res.items) {

          setDevice(res.items[0].devices ? res.items[0].devices.map(item => item.device_id) : []);
          setSources(res.items[0].sources ? res.items[0].sources.map(item => item.source_name) : []);
          setGroups(res.items[0].tags ? res.items[0].tags.map(item => item.tag_id) : []);
          if (res.items[0].devices || res.items[0].sources || res.items[0].groups) {
            setType('2')
          }
        }
      })
    }
  }, [id])


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
        ...valid
      }
      if (device.length) {
        params.device = device;
      }
      if (sources.length) {
        params.sources = sources;
      }
      if (groups.length) {
        params.tags = groups;
      }

      if (id) {
        forwardDataFilter({
          id,
          ...params,
          type: undefined
        }).then(res => {
          setLoading(false)
          if (res === undefined) {
            message.success('编辑成功!')
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
    <Card bordered={false} bodyStyle={{height: "108vh"}}>
      <p>选择设备</p>
      <VForm columns={columns1} form={form} span={8} data={{ type: type }} />
      {/* 选择设备 */}
      {type === '2' ?
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
        </Tabs> : ''}

      <div style={{ background: '#2B3748', textAlign: 'right', marginTop: 10 }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
      </div>
    </Card>
  );
};

export default AddForm;