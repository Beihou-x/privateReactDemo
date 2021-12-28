import React, { useContext, useEffect, useRef, useState } from 'react';
import StandardTable from '@components/Table';
import SearchForm from '@components/SearchForm';
import {
  Card,
  Input,
  Button,
  Divider,
} from 'antd';
import { deviceFeedbackSearch, deviceFeedbackTotal } from '@/services/v1';
import styles from './index.less'
import Detail from './Detail'
import Modal from './Modal'
import { WarningOutlined, StopOutlined } from '@ant-design/icons';
import { formatDate } from '@/utils/utils';

interface DataType {

}

const Suspension = (props) => {
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [selectedKeys, setSelectedKeys]: any = useState([]);
  const [repairAndStop, setRepairAndStop]:any = useState({})
  // const [stop, setStop] = useState(0)
  const [modalValue, setModalValue] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

  const refTable: any = useRef(null)

  useEffect(() => {
    getCount()
  }, [])

  const getCount = () => {
    // 维修 & 停用
    deviceFeedbackTotal({
    }).then(res => {
      setRepairAndStop(res)
    })
    // 停用
    // deviceFeedbackTotal({
    //   action: 'STOP'
    // }).then(res => {
    //   const { total } = res
    //   setStop(total)
    // })
  }

  const handleRowExpand = (id) => {
    const index = expandedRowKeys.findIndex(q => q === id);
    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id])
    }
  };


  // 弹框
  const handleModalVisible = (visible, title, action, ids) => {
    if (visible) {
      setModalValue({
        title,
        action,
        ids
      })
    } else {
      setModalValue({})
    }

    setModalVisible(visible)
  }

  // search
  const handleSearchReset = () => {
    const tableR = refTable
    tableR && tableR.current && tableR.current.handleSearch()
    getCount()
    setSelectedKeys([])
  }
  const getStatus = val => {
    if(val === 'REPAIR') {
      return '维修'
    }else if (val === 'STOP') {
      return '停用'
    }else {
      return '在用'
    }
  }
  const columns = [
    {
      title: '设备所属类型',
      dataIndex: ['function_type']
    },
    {
      title: '设备编号',
      dataIndex: ['id']
    },
    {
      title: '设备名称',
      dataIndex: ['name']
    },
    {
      title: '设备厂商',
      dataIndex: ['source_type']
    },
    {
      title: '设备状态',
      dataIndex: ['action'],
      render: val => (
        <span>{getStatus(val)}</span>
      )
    },
    {
      title: '行政区域',
      dataIndex: ['place_name']
    },
    {
      title: '安装区域',
      dataIndex: ['sync_name']
    },
    {
      title: '经度',
      dataIndex: ['longitude']
    },
    {
      title: '纬度',
      dataIndex: ['latitude']
    },
    {
      title: '处置人/处置时间',
      render: (text, record) => (
        <span>
          {record && record.creator_name ? record.creator_name : '-'}/{formatDate(record && record.created_at, 'YYYY-MM-DD')}
        </span>
      )
    },
    {
      title: '操作',
      align: 'center',
      render: val => (
        <div style={{ textAlign: 'center' }}>
          {
            val.status === '维修' || val.status === '停用' ?
              <>
                <a onClick={() => handleModalVisible(true, '恢复使用', 'RESUME', [val.id])}>恢复使用</a>
                <Divider type="vertical" />
                <a onClick={() => handleModalVisible(true, '反馈', 'FEEDBACK', [val.id])}>反馈</a>
                <Divider type="vertical" />
              </> : ''
          }
          {
            val.status === '在用' ?
              <>
                <a onClick={() => handleModalVisible(true, '报修', 'REPAIR', [val.id])}>报修</a>
                <Divider type="vertical" />
                <a onClick={() => handleModalVisible(true, '停用', 'STOP', [val.id])}>停用</a>
                <Divider type="vertical" />
              </> : ''
          }
          <a onClick={() => handleRowExpand(val.id)}>详情</a>

        </div>
      )
    }
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      setSelectedKeys(selectedRowKeys)
    },
    selectedRowKeys: selectedKeys,
    getCheckboxProps: (record: DataType) => ({
      id: record['id'],
    }),
  };

  const renderTable = ({ record }) => {
    return <Detail record={record} />
  }

  return (
    <div className={styles.containers}>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: '设备编号',
              name: 'id',
              renderFormItem: () => (
                <Input />
              )
            },
            {
              label: '设备名称',
              name: 'name',
              renderFormItem: () => (
                <Input />
              )
            }
          ]}
          onChange={() => { }}
        />
        <div className={styles.flex}>
          <div>
            <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }} disabled={!selectedKeys.length} onClick={() => handleModalVisible(true, '报修', 'REPAIR', selectedKeys)}>报修</Button>
            <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }} disabled={!selectedKeys.length} onClick={() => handleModalVisible(true, '停用', 'STOP', selectedKeys)}>停用</Button>
            <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }} disabled={!selectedKeys.length} onClick={() => handleModalVisible(true, '反馈', 'FEEDBACK', selectedKeys)}>反馈</Button>
            <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }} disabled={!selectedKeys.length} onClick={() => handleModalVisible(true, '恢复使用', 'RESUME', selectedKeys)}>恢复使用</Button>
          </div>
          <div className={styles.flex}>
            <div><WarningOutlined /> 报修设备数：{repairAndStop && repairAndStop.repair_total || 0}</div>
            <div style={{ marginLeft: 30 }}><StopOutlined /> 停用设备数：{repairAndStop && repairAndStop.stop_total || 0}</div>
          </div>
        </div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={deviceFeedbackSearch}
          rowSelection={{
            type: 'checkbox',
            ...rowSelection,
          }}
          tableProps={
            {
              expandedRowKeys: expandedRowKeys,
              expandIcon: () => false,
              expandIconColumnIndex: -1,
              expandedRowRender: (record) => renderTable({ record })
            }
          }
          
        />
        {modalVisible ? <Modal modalVisible={modalVisible} {...modalValue} handleModalVisible={handleModalVisible} handleSearch={handleSearchReset} /> : ''}

      </Card>
    </div>
  );
};

export default Suspension;