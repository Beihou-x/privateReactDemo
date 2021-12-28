import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, Form, notification, message, Table } from 'antd';
import { subscribeAdd, subscribeEdit, viewSearch, subscribeDetail, deviceUpload, deviceDownloadTemplate } from '@/services/v2';
import { applicationTcpSearch } from '@/services/v1';
import VForm from '@components/VForm'
import { useHistory } from 'react-router-dom';
import moment from "moment";
import { formatDate, formatTimestamp, filterCategory } from "@/utils/utils";
import ModalForm from "@components/Modal";
import DownLoadFile from "@components/DownLoadFile";
import Upload from "@components/Upload";
import { DefaultPubSubContext } from "@components/PubSubscribe";

const AddForm = (props) => {
  const history = useHistory();
  const form = Form.useForm();
  const { match: { params: { id } } }: any = props;
  const { pushlist } = useContext(DefaultPubSubContext);

  const [loading, setLoading] = useState(false);
  const [initial, setInitial]: any = useState({});
  const [data, setData]: any = useState([]);
  const [data1, setData1]: any = useState([]);
  const [device_list, setDeviceList]: any = useState([]);
  const dataType = filterCategory("数据类型") || []
  useEffect(() => {
    // 视图库
    viewSearch({
      limit: 999,
      offset: 0
    }).then(res => {
      setData(res && res.items || [])
    })

    // 协议
    applicationTcpSearch({
      limit: 999,
      offset: 0,
      type: 'SUBSCRIBE'
    }).then(res => {
      setData1(res && res.items || [])
    })
  }, [])

  useEffect(() => {
    if (id) {
      subscribeDetail({ id }).then(res => {
        if (res) {
          setInitial({ ...res, begin: moment(formatDate(res.begin), 'YYYY-MM-DD'), end: moment(formatDate(res.end), 'YYYY-MM-DD') })
          setDeviceList(res.device_list);
        }
      })
    }
  }, [id])

  const handleOk = () => {
    const vform = form[0];
    vform.validateFields().then(valid => {
      const begin = formatTimestamp(valid.begin, 'number');
      const end = formatTimestamp(valid.end, 'number');
      setLoading(true);
      if (id) {
        subscribeEdit({ ...valid, begin, end, id, device_list: device_list.toString() }).then(res => {
          if (res === undefined) {
            message.success('编辑成功!');
            console.log('res===', res);
          }
        })
      } else {
        subscribeAdd({ ...valid, begin, end, device_list: device_list.toString() }).then(res => {
          if (res === undefined) {
            message.success('新增成功!')
            console.log('res===', res);
            
          }
        })
      }
      setLoading(false);
      history.goBack()
    }).catch(err => {
      console.log(err);

      notification.error({
        message: '有必填项没填'
      })
    })
  }
  const columnsTable = [
    {
      title: '设备编号',
      dataIndex: 'device_code',
      key: 'device_code',
    },
    {
      title: '设备名称',
      dataIndex: 'device_name',
      key: 'device_name',
    },
  ];

  const columns = [
    { name: 'title', label: '订阅标题', rules: [{ required: true }] },
    { name: 'name', label: '订阅名称', rules: [{ required: true }] },
  ]
  const columns2 = [
    { name: 'begin', label: '开始时间', type: 'datePicker', rules: [{ required: true }] },
    { name: 'end', label: '结束时间', type: 'datePicker', rules: [{ required: true }] },
    { name: "view_lib_id", label: "订阅视图库", type: 'select', list: data.map(m => { return { label: m.code + '-' + m.name, value: m.id } }), rules: [{ required: true }], },
    { name: "protocol_id", label: "订阅协议", type: 'select', list: data1.map(m => { return { label: m.name, value: m.id } }), rules: [{ required: true }], },
  ]
  const columns3 = [
    { name: "quality_flag",label: "低质量数据过滤",type:"switch"},
    { name: 'suber_type', label: '数据类型', type: 'select', list: dataType },
    { name: 'description', label: '描述', type: 'textarea' },
    {
      name: "deviceList", label: "订阅范围", type: 'render', render: () => <div><div style={{ marginTop: 5, marginBottom: 10 }}><a onClick={() => pushlist("deviceImport", true)} > 上传设备列表</a></div>
        {(device_list || []).length || (initial.device_list || []).length ?
          <Table bordered rowKey='device_code' dataSource={(device_list || []).map(m => { return { device_code: m } })} columns={columnsTable} scroll={{ y: 200 }} pagination={false} /> : ''}
      </div>
    }
  ]

  const layoutCol = {
    labelCol: { span: 3 },
    wrapperCol: { span: 20 },
  }
  const layoutCol1 = {
    labelCol: { span: 6 },
    wrapperCol: { span: 15 },
  }

  const checkEmit = (type, res) => {
    if (type === 'submit') {
      if (res) {
        setDeviceList(res)
        pushlist("deviceImport", false)
        message.success('上传成功');
      }
    } else {
      message.error('上传失败');
    }
  }

  return (
    <Card bordered={false}>
      <div style={{ width: '50%', minWidth: 930, margin: '0 auto' }}>
        <VForm columns={columns} form={form} data={initial} span={24} layoutCol={layoutCol} />
        <VForm columns={columns2} form={form} data={initial} span={12} layoutCol={layoutCol1} />
        <VForm columns={columns3} form={form} data={initial} span={24} layoutCol={layoutCol} />

        <div style={{ background: '#2B3748', textAlign: 'right', marginTop: 10, paddingRight: 40 }}>
          <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
          <Button type="primary" loading={loading} onClick={handleOk}>保存</Button>
        </div>
      </div>
      <ModalForm subscribeName="deviceImport" title="导入">
        <DownLoadFile
          services={() => deviceDownloadTemplate({})}
          type='link'
        >
          下载模板
        </DownLoadFile>

        <Upload
          services={({ formData }) => {
            return deviceUpload({
              file: formData,
            });
          }}
          onEmit={checkEmit}
        />
      </ModalForm>
    </Card>
  )
}


export default AddForm