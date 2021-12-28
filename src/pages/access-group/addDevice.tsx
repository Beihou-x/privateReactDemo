import React, { Component, Fragment } from 'react';
import {
  Row,
  Col,
  Input,
  Card,
  message,
  Popconfirm,
  Button
} from 'antd';
import { deviceGroupSearch, deviceSearchByGroup, deviceDeleteByGroup, deviceAddByGroup } from '@/services/v1';
import { formatObject } from '@/utils/utils';
import SearchForm from '@/components/SearchForm';
import Table from '@/components/Table';

type AddDeviceGroupProps = {
  onCancel: any;
  id: string;
};

class AddDeviceGroup extends Component<AddDeviceGroupProps> {


  state: any = {
    searchValues: {},
    refs: React.createRef(),
    selectedKeys: []
  };

  //表头
  columns = [
    {
      title: '设备编码',
      dataIndex: 'id',
      width: 200,
    },
    {
      title: '设备名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      title: '点位俗称',
      dataIndex: 'alias',
      width: 200,
    },
    {
      title: '设备厂商',
      dataIndex: 'manufactor',
      width: 120,
    },
    {
      title: '行政区域',
      dataIndex: 'unit',
      width: 120,
    },
    {
      title: '区域名称',
      dataIndex: 'unit_name',
      width: 120,
    },
    {
      title: '安装地址',
      dataIndex: 'address',
      width: 200,
    },
    {
      title: '(经)纬度',
      dataIndex: 'longitude',
      render: (val, record) => `${val} \n ${record && record.latitude || ""}`,
      width: 140,
    },
    {
      title: '摄像机功能类型',
      dataIndex: 'func_type',
      width: 200,
    },
    {
      title: '摄像机位置类型',
      dataIndex: 'location_type',
      width: 200,
    },
  ];

  //查询条件查询
  handleFormSearch = (values = {}, type) => {
    const { refs }: any = this.state;
    this.setState({
      searchValues: values
    }, () => {
      refs && refs.current && refs.current.handleSearch();
    });
  };

  //表格checkbox选中
  onChange = (selectedRowKeys, selectedRows) => {
    this.setState({
      selectedKeys: selectedRowKeys
    });
  };

  //保存
  handleSave = () => {
    const { selectedKeys } = this.state;
    const { onCancel, id }: any = this.props;

    deviceAddByGroup({
      ape_ids: selectedKeys,
      id: id || 0
    })
      .then(res => {
        if (res && res.code === 200) {
          onCancel();
        }
      })
  };

  //取消
  onCancel = () => {
    const { onCancel }: any = this.props;
    onCancel();
  };

  render() {
    const { searchValues, refs, selectedKeys } = this.state;

    return (
      <Card>
        <SearchForm
          formList={[
            {
              name: 'name',
              label: '设备名称',
              renderFormItem: () => (
                <Input />
              )
            },
            {
              name: 'id',
              label: '设备编码',
              renderFormItem: () => (
                <Input />
              )
            }
          ]}
          formLayout={{
            layout: "inline"
          }}
          onChange={this.handleFormSearch}
        />
        <Table
          ref={refs}
          columns={this.columns}
          services={(params) => {
            return deviceSearchByGroup({
              ...params,
              ...searchValues,
              exclude: ["id", "ape_id", "groups_ape"]
            });
          }}
          rowSelection={{
            selectedKeys: selectedKeys,
            onChange: this.onChange
          }}
        />
        <div>
          <Button style={{ marginRight: 20 }} onClick={() => this.onCancel()}>取消</Button>
          <Button type="primary" onClick={() => this.handleSave()}>保存</Button>
        </div>
      </Card>
    )
  }
}


export default AddDeviceGroup;
