import React,{useEffect,useState} from 'react'
import { Row, Col,Table } from 'antd'
import moment from 'moment'
import StandardTable from '@components/Table';
import { deviceFeedbackDetail } from '@/services/v1';

const Detail = (props) => {
  const { record } = props
  const [tableData, setTableData]:any = useState([]);
  useEffect(() => {
    if(record && record.id) {
      deviceFeedbackDetail(record.id).then(res => {
        // console.log(res);
        setTableData(res.feedbacks)
      })
    }
  },[record.id])

  const getStatus = val => {
    if(val === 'REPAIR') {
      return '维修'
    }else if (val === 'STOP') {
      return '停用'
    }else if (val === 'FEEDBACK') {
      return '反馈'
    } else if (val === 'RESUME') {
      return '恢复使用'
    } else {
      return ''
    }
  }

  const columns:any = [
    {

      title: '操作类型',
      dataIndex: 'action',
      align: 'center',
      render: (val) => {
        if (val === 'REPAIR') {
          return '报修'
        } else if (val === 'STOP') {
          return '停用'
        } else if (val === 'FEEDBACK') {
          return '反馈'
        } else if (val === 'RESUME') {
          return '恢复使用'
        } else {
          return ''
        }
      }
    },
    {
      title: '操作人',
      dataIndex: 'creator',
    },
    {
      title: '操作时间',
      dataIndex: 'created_at',
      render: (val) => moment(parseInt(val, 0) * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      title: '描述',
      dataIndex: 'content',
      align: 'center',
    }
  ]
  return (
    <>
      <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}>
          设备所属类型：{record["source_type"]}
        </Col>
        <Col md={4} sm={24}>
          设备厂商：{record["source_type"]}
        </Col>
        <Col md={4} sm={24}>
          设备状态：{getStatus(record["action"])}
        </Col>
      </Row>
      <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}>
          设备编号：{record["id"]}
        </Col>
        <Col md={4} sm={24}>
          行政区域：{record["place_name"]}
        </Col>
        <Col md={4} sm={24}>
          安装区域：{record["sync_name"]}
        </Col>
      </Row>
      <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}>
          设备名称：{record["name"]}
        </Col>
        <Col md={4} sm={24}>
          经度：{record["longitude"]}
        </Col>
        <Col md={4} sm={24}>
          纬度：{record["latitude"]}
        </Col>
      </Row>
      <div style={{ height: 10 }}></div>
      {/* <StandardTable
        tableProps={{ size: 'small' }}
        rowSelection={false}
        columns={columns}
        services={() => deviceFeedbackDetail({ id: record.id })}
      /> */}
      <Table columns={columns} dataSource={tableData} bordered>

      </Table>
    </>
  )
}

export default Detail