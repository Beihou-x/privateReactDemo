import React from 'react'
import { Row, Col } from 'antd'
import moment from 'moment'
import StandardTable from '@components/Table';
// import { searchByCreatedAt } from '@/services/v1';

const Detail = (props) => {
  const { record } = props
  const columns = [
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
      dataIndex: 'name',
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
          设备状态：{record["action"]}
        </Col>
      </Row>
      <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
        <Col md={4} sm={24}>
          设备编号：{record["id"]}
        </Col>
        <Col md={4} sm={24}>
          行政区域：{record["unit"]}
        </Col>
        <Col md={4} sm={24}>
          安装区域：{record["address"]}
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
      <StandardTable
        tableProps={{ size: 'small' }}
        rowSelection={false}
        columns={columns}
        // services={() => searchByCreatedAt({ ape_id: record.id })}
      />
    </>
  )
}

export default Detail