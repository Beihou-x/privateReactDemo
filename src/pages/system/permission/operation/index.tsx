import React, { useRef, useState } from 'react';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import StandardTable from '@components/Table';
import {
  Card,
  Input,
  Select,
  Button,
  Divider,
  Popconfirm
} from 'antd';
import { getOperationPermission, operationDelete } from '@/services/v1';
import { formatDate } from '@/utils/utils';
import SearchForm from '@components/SearchForm';
import ModalAdd from './Add';
import Edit from './Edit'
import moment from 'moment'
const { Option } = Select;

const Operation = () => {
    const refTable: any = useRef(null)
    const [modalVisible, setModalVisible] = useState(false)
    const [editShow, setEditShow] = useState(false);
    const [editData, setEditData] = useState({});

    const handleModalVisible = (flag) => {
      setModalVisible(flag)
    }

    const handleSearchReset = () => {
      const tableR = refTable
      tableR && tableR.current && tableR.current.handleSearch()
    }
    
    
    const editPermission = (val,isShow) => {
      setEditData(val);
      setEditShow(isShow);
    }

    const deletePermission = async (val) => {
      const res = await operationDelete(val.id)
      console.log(res);
      
      handleSearchReset()
    }

    const columns = [
      {
        dataIndex: "name",
        title: "权限名称",
        align: "center"
      },
      {
        dataIndex: "description",
        title: "权限描述",
        align: 'center'
      },
      {
        dataIndex: "category",
        title: "权限种类",
        align: 'center'
      },
      {
        title: "创建人/创建时间",
        align: 'center',
        render: (val, record) => (
          <span>
            {(record && record.creator) || "-"} /{" "}
            {formatDate(record && record.created_at, "YYYY-MM-DD")}
          </span>
        ),
      },
      {
        title: "更新人/更新时间",
        align: 'center',
        render: (val, record) => (
          <span>
            {(record && record.updator) || "-"} /{" "}
            {formatDate(record && record.updated_at, "YYYY-MM-DD")}
          </span>
        ),
      },
      {
        title: '操作',
        align: 'center',
        render: val => (
          <>
            <a onClick={() => editPermission(val,true)}>编辑</a>
            <Divider type="vertical" />
            <Popconfirm title="确认删除该权限?" onConfirm={() =>deletePermission(val)}>
              <a>删除</a>
            </Popconfirm>
          </>
        )
      }
    ];

    return (
      <>
        <Card bordered={false}>
          <SearchForm
            formList={[
              {
                label: '权限名称',
                name: 'name',
                renderFormItem: () => (
                    <Input autoComplete="off" />
                )
              }
            ]}
            onChange={() => { }}
          />
          <Button type="primary" style={{ marginBottom: 18 }} onClick={() => {handleModalVisible(true)}}>新增</Button>
          <StandardTable
            ref={refTable}
            columns={columns}
            services={ getOperationPermission }
            rowSelection={false}
            
          />
        </Card>
        { modalVisible ? <ModalAdd modalVisible={modalVisible} handleModalVisible={ handleModalVisible} handleSearch={handleSearchReset} /> : ''}
        { editShow ? <Edit modalVisible={editShow} handleModalVisible={editPermission} handleSearch={handleSearchReset} editData={editData} /> : '' }
      </>
    );
  };

export default Operation;