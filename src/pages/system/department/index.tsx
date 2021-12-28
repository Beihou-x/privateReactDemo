import React, { useRef, useState,useEffect } from "react";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import StandardTable from "@components/Table";
import { Card, Input, Select, Button, Table,Divider,Form,Popconfirm, message } from "antd";
import { departmentSearch,departmentAndUnitDelete } from "@/services/v1";
import SearchForm from "@components/SearchForm";
import ModalAdd from "./Modal";
import moment from "moment";
import _ from 'lodash';
import Edit from "./Edit";

const { Option } = Select;

const Department = () => {
  const refTable: any = useRef(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [tableData, setTableData]:any = useState([]);
  const [departmentList,setDepartmentList] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTableData({});
  },[])

  const edit = (val,isShow) => {
    setEditData(val);
    setEditShow(isShow);
  };

  const handleDelete = async (val) => {
    const res = await departmentAndUnitDelete(val.id)
    if (res === undefined) {
      message.success('删除成功')
      getTableData({})
    }else {
      message.error(JSON.parse(res).message)
    }
  };
  const [form] = Form.useForm();
  const getTableData = async (params) => {
    setLoading(true);
    const res = await departmentSearch({...params})
    const list = res.items.map(item => {
      return {
        label: item.name,
        value: item.id
      }
    })
    setDepartmentList(list);
    // 根据parent_id进行分类
    // const treeData:any[]
    const loop = _.groupBy(res.items, 'parent_id')

    const forIn = (tmp, key) => {
      tmp.children = loop[key] || []
      tmp.key = tmp.id
      tmp.children.map(item => {
        forIn(item, item.id)
      })
    }
    const treeData = res.items.map(item => {
        forIn(item, item.id)
        return item
    })
    const data:any = [];
    
    const index = treeData.findIndex(item => item.parent_id === '0')
    data.push(treeData[index]);
    setTableData(data);
    setLoading(false)
  }

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

  const handleSearch = (val) => {
    getTableData(val)
  }

  const handleReset = () => {
    form.resetFields();
    getTableData({})
  }

  const columns: any = [
    {
      dataIndex: "name",
      title: "组织名称",
      align: "center",
      width: "25%",
    },
    {
      dataIndex: "description",
      title: "组织描述",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      render: (text, record) => (
        <span>
          {(record&&record.creator)||"-"}/
          {record &&
            record.created_at &&
            moment(record.created_at * 1000).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <a onClick={() => edit(val, true)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该组织?"
            onConfirm={() => handleDelete(val)}
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <Card bordered={false}>
        <Form {...layout} layout="inline" form={form} onFinish={handleSearch}>
          <Form.Item label="组织名称" name="name">
            <Input autoComplete="off"></Input>
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20, marginLeft: 24 }}
          >
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Form>
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          新增
        </Button>
        <Table
          loading={loading}
          bordered
          columns={columns}
          dataSource={tableData}
          indentSize={30}
          rowKey={"id"}
          defaultExpandedRowKeys={[(tableData[0] && tableData[0].id) || "1"]}
        ></Table>
      </Card>
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearch}
          departmentList={departmentList}
        />
      ) : (
        ""
      )}
      {editShow ? (
        <Edit
          modalVisible={editShow}
          handleModalVisible={edit}
          handleSearch={handleSearch}
          departmentList={departmentList}
          editData={editData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Department;
