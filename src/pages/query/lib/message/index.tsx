import React, { useRef, useEffect, useState } from "react";
import { Spin, Input, Card, Radio, DatePicker, TimePicker, Form, Table, Button, Modal } from "antd";
import { cacheList, cacheDetail } from "@/services/v2";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";

import { formatDate } from "@/utils/utils";
import moment from 'moment'
const Cache = (props) => {
  const { location: { query } } = props
  console.log('query==', query)
  const { device_id, start, end, type } = query || {}

  const [tableData, setTableData]: any = useState([]);
  const [dataDetail, setDataDetail]: any = useState(null);
  const [page_num, setPage_num] = useState(1);
  const [page_size, setPage_size] = useState(20);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false);
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (query && Object.keys(query).length) {
      handleSearch()
    }
  }, [query])

  const getDateTime = (date, time) => {
    return moment(date).format('YYYYMMDD') + moment(time).format('HHmmss');
  }
  const handleSearch = () => {
    const val = form.getFieldsValue() || {};
    const { date, type, startTime, endTime } = val;
    const start = getDateTime(date, startTime);
    const end = getDateTime(date, endTime);
    let obj: any = {}

    if (type === '1') {
      obj.start = start
      obj.end = end
    } else {
      obj.capture_start = start
      obj.capture_end = end
    }

    setLoading(true)

    cacheList({ device_id: val.device_id, ...obj, page_num: page_num, page_size: page_size }).then(res => {
      setLoading(false)
      if (Array.isArray(res)) {
        setTableData(res);
      } else {
        setTableData([]);
      }
    })
  };
  const handleReset = () => {
    form.setFieldsValue({
      device_id: '',
      date: moment(new Date()),
      startTime: moment('00:00:00', 'HH:mm:ss'),
      endTime: moment('23:59:59', 'HH:mm:ss'),
      type: '2'
    })
    setTableData([]);
  };

  const columns: any = [
    {
      title: "设备编号",
      dataIndex: ["device_id"],
      align: "center",
    },
    {
      title: "抓拍时间",
      dataIndex: ["captured"],
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.captured, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "上传时间",
      dataIndex: ["created"],
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.created, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => {
        const obj = form.getFieldsValue();
        const params = {
          start: getDateTime(obj.date, obj.startTime),
          end: getDateTime(obj.date, obj.endTime),
          device_id: val.device_id,
          request_id: val.request_id
        }
        return <>
          {/* <Link to={`/gather/data/cache-detail/${val.device_id}/${val.request_id}/${params.start}/${params.end}/${params.type}`}>
            详情
          </Link> */}
          <a onClick={() => onMessage(params)}>查看报文</a>
        </>
      },
    },
  ];
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };


  // 查看报文
  const onMessage = (params) => {
    setVisible(true)
    setLoading1(true)
    cacheDetail({ ...params }).then(res => {
      if (res && res.data) {
        setDataDetail(res.data)
      }
      setLoading1(false)
    })
  }


  // 弹框取消
  const handleCancel = () => {
    setVisible(false)
    setDataDetail(null)
  }

  return (
    <>
      <Card bordered={false}>
        <Form
          form={form}
          {...layout}
          onFinish={handleSearch}
          layout="inline"
          initialValues={{
            device_id: device_id || '',
            date: start ? moment(start, 'YYYY-MM-DD') : moment(new Date()),
            startTime: start ? moment(start.substr(-6, 6), 'HH:mm:ss') : moment('00:00:00', 'HH:mm:ss'),
            endTime: end ? moment(end.substr(-6, 6), 'HH:mm:ss') : moment('23:59:59', 'HH:mm:ss'),
            type: type || '2'
          }}
        >
          <Form.Item label="设备编号" name="device_id" rules={[{ required: true }]}>
            <Input></Input>
          </Form.Item>
          <Form.Item label="时间" name="date" rules={[{ required: true }]}>
            <DatePicker allowClear={false}></DatePicker >
          </Form.Item>
          <Form.Item name="startTime" rules={[{ required: true }]}>
            <TimePicker allowClear={false}></TimePicker>
          </Form.Item>
          <Form.Item name="endTime" rules={[{ required: true }]}>
            <TimePicker allowClear={false}></TimePicker>
          </Form.Item>
          <Form.Item label="时间类型" name="type" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={'1'}>上传</Radio>
              <Radio value={'2'}>抓拍</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginRight: 20, marginLeft: 0, marginBottom: 20 }}
            >
              查询
            </Button>
            <Button onClick={handleReset}>重置</Button>
          </Form.Item>
        </Form>
        <Table
          rowKey='id'
          bordered
          columns={columns}
          dataSource={tableData}
          loading={loading}
        />

        <Modal
          maskClosable={false}
          destroyOnClose
          width={800}
          title={'报文信息'}
          visible={visible}
          footer={[
            <Button key="back" onClick={handleCancel}>
              取消
            </Button>,
          ]}
        >
          <Spin tip="Loading..." spinning={loading1}>
            <JSONInput
              locale={locale}
              height={'60vh'}
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
              placeholder={dataDetail}
              viewOnly
            />
          </Spin>

        </Modal>

      </Card>
    </>
  );
};

export default Cache;
