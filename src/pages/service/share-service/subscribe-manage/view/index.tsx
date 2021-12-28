import React, { useRef, useState, useContext } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider, Popconfirm, message, Modal } from "antd";
import { viewExport, viewDel, viewSearch, viewDetail } from "@/services/v2";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { getCounts } from "@/utils/utils";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import DetailInfo from './detail'
const { Option } = Select;

const View = () => {
  const { pushlist }: any = useContext(DefaultPubSubContext);
  const tableRef: any = useRef();
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState({});
  const [title, setTitle] = useState('');
  const handleDelete = id => {
    viewDel(id).then(res => {
      console.log(res);
      if (res === undefined) {
        message.success('删除成功!');
        pushlist('table:delete')
      }
    })
  }
  const relations = [
    {
      name: 0,
      value: '上级'
    },
    {
      name: 1,
      value: '下级'
    }
  ]
  const status = [
    {
      name: '0',
      value: '未注册'
    },
    {
      name: '1',
      value: '已注册'
    }
  ]
  const columns = [
    {
      title: "视图库编码",
      dataIndex: ["code"],
      align: "center"
    },
    {
      title: "视图库名称",
      dataIndex: ["name"],
      align: "center"
    },
    {
      title: "上下级",
      dataIndex: ["relation"],
      align: "center",
      render: val => getCounts(relations, val)
    },
    {
      title: "IP地址",
      dataIndex: ["address"],
      align: "center",
    },
    {
      title: "端口",
      dataIndex: "port",
      align: "center"
    },
    {
      title: "厂商",
      dataIndex: "vendor",
      align: "center",
    },
    {
      title: "域状态",
      dataIndex: "status",
      align: "center",
      render: val => getCounts(status, val)
    },
    {
      title: "操作",
      align: "center",
      render: (val, record) => (
        <>
          <a onClick={() => modalVisible(true, '编辑视图库', record.id)}>
            编辑
          </a>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => modalVisible(true, '视图库详情', record.id)}>
            详情
          </a>
        </>
      ),
    },
  ];

  // 模态框状态更改
  const modalVisible = (flag, title = '', id = 0) => {
    if (id && flag) {
      viewDetail({ id }).then(res => {
        if (res) {
          setData(res)
        }
      })
    }
    setVisible(flag)
    setTitle(title)
  }

  // 新增或编辑
  const onOk = () => {
    modalVisible(false)
    setData({})
    pushlist('table:search')
  }
  // 取消
  const onCancel = () => {
    setData({})
    modalVisible(false)
  }
  const detailProps = {
    visible,
    title,
    onOk,
    onCancel,
    data
  }
  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "视图库编码",
              name: "code",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "视图库名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "域状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value={'0'}>未注册</Option>
                  <Option value={'1'}>已注册</Option>
                </Select>
              ),
            },
          ]}
          onChange={() => { }}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18, marginTop: 18 }}
          onClick={() => modalVisible(true, '新增视图库')}
        >
          新增
        </Button>
        <DownLoadFile
          services={() => viewExport({})}
        >
          导出
        </DownLoadFile>
        <StandardTable
          ref={tableRef}
          columns={columns}
          services={(params) => viewSearch({ ...params })}
          rowSelection={false}

        />
      </Card>
      {visible ? <DetailInfo {...detailProps} /> : ''}
    </>
  );
};

export default View;
