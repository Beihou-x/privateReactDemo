import React, { useEffect, useState, useContext } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider, Popconfirm, message, DatePicker } from "antd";
import { subscribeSearch } from "@/services/v2";
import { subscribeExport, subscribeDelete, viewSearch, subscribeStatusEdit } from "@/services/v2";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { formatDate, getCounts, formatStartData, formatEndData } from "@/utils/utils";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import ExpandedRow from "./expandRow";

const { Option } = Select;
const { RangePicker } = DatePicker;

const ApproveAccess = () => {
  const { pushlist }: any = useContext(DefaultPubSubContext);
  const [data, setData]: any = useState([])
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  useEffect(() => {
    viewSearch({
      limit: 999,
      offset: 0
    }).then(res => {
      if (res && res.items) {
        setData(res.items)
      }
    })
  }, [])
  const status = [
    {
      name: 0,
      value: '订阅中'
    },
    {
      name: 1,
      value: '已取消'
    }
  ]

  const handleDelete = id => {
    subscribeDelete(id).then(res => {
      console.log(res);
      if (res === undefined) {
        message.success('删除成功!');
        pushlist('table:delete')
      }
    })
  }

  const changeStatus = (id, status) => {
    subscribeStatusEdit({ id, status }).then(res => {
      if (res === undefined) {
        message.success('状态修改成功')
        pushlist('table:search')
      }
    })
  }

  const handleRowExpand = id => {
    const index = expandedRowKeys.findIndex(q => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };

  const columns = [
    {
      title: "订阅标题",
      dataIndex: ["title"],
      align: "center"
    },
    {
      title: "订阅视图库",
      dataIndex: ["view_lib_name"],
      align: "center",
    },
    {
      title: "开始时间",
      dataIndex: "begin",
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(val, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "结束时间",
      dataIndex: "end",
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(val, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: '数据类型',
      dataIndex: ['suber_type'],
      align: "center",
    },
    {
      title: "订阅状态",
      dataIndex: ["status"],
      align: "center",
      render: (val, record) => <>{getCounts(status, val)}</>,
    },
    {
      title:"协议名称",
      dataIndex: "protocol",
      align: "center",
      render: val => (
        <span>{val&&val.toString()}</span>
      )
    },

    {
      title: "操作",
      align: "center",
      render: (val, record) => (
        <>
          <Link to={`/subscribe-manage/subscribe-manage/edit/${record.id}`}>
            编辑
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(record.id)}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Link to={`/subscribe-manage/subscribe-manage/detail/${record.id}`}>
            订阅详情
          </Link>
          <Divider type="vertical" />
          {
            record.status === 0 ? <a onClick={() => changeStatus(record.id, '1')}>取消订阅</a> : <a onClick={() => changeStatus(record.id, '0')}>启用订阅</a>
          }
          <Divider type="vertical" />
          <a onClick={() => handleRowExpand(val.id)}>对账</a>
          <Divider type="vertical" />
          <Link to={`/monitor/${record.id}/subscribe`}>
            多维监控
          </Link>
          <Divider type="vertical" />
          <Link to={`/subscribe-manage/wx_approve_protocol_report/${record.id}`}>协议报告</Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "订阅标题",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "订阅视图库",
              name: "view_lib_id",
              renderFormItem: () => (<Select allowClear options={data.map(m => { return { label: m.name, value: m.id } })}>
              </Select>),
            },
            {
              label: "开始时间",
              name: "begin",
              renderFormItem: () => <DatePicker allowClear />,
            },
            {
              label: "结束时间",
              name: "end",
              renderFormItem: () => <DatePicker allowClear />,
            },
            {
              label: "订阅状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value={'0'}>订阅中</Option>
                  <Option value={'1'}>已取消</Option>
                </Select>
              ),
            },
          ]}
          onChange={() => { }}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18, marginTop: 18 }}
        >
          <Link to="/subscribe-manage/subscribe-manage/add">新增</Link>
        </Button>
        <DownLoadFile
          services={() => subscribeExport({})}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={(params: any) => {
            const { begin, end } = params
            const obj = { ...params }
            if (begin) {
              obj.begin = [Number(formatStartData(begin)), Number(formatEndData(begin))]
            }
            if (end) {
              obj.end = [Number(formatStartData(end)), Number(formatEndData(end))]
            }
            return subscribeSearch({ ...obj })
          }
          }
          rowSelection={false}
          tableProps={{
            expandable: {
              expandedRowRender: record => <ExpandedRow values={record} />,
              expandIcon: () => { },
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
    </>
  );
};

export default ApproveAccess;
