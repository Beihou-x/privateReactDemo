import React, { useContext, useState } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Card, Button, Popconfirm, message, Divider } from "antd";
import { serverSearch, serverDelete, serverExport } from "@/services/v1";
import { Link } from "react-router-dom";
import moment from "moment";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import ExpandedRow from "./components/expandedRow";
import DownLoadFile from "@components/DownLoadFile";

const Server = props => {
  const [expandedRowKeys, setRowKeys]: any = useState([]);

  const { pushlist }: any = useContext(DefaultPubSubContext);

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
      title: '服务器ID',
      ellipsis: true,
      dataIndex: 'id'
    },
    {
      title: "服务器名称",
      ellipsis: true,
      dataIndex: ["name"],
    },
    {
      title: '服务器种类',
      ellipsis: true,
      dataIndex: 'category'
    },
    {
      title: "IP",
      ellipsis: true,
      dataIndex: ["ip"],
    },
    {
      title: 'agent端口',
      ellipsis: true,
      dataIndex: 'port'
    },
    {
      title: "服务器所在区域",
      ellipsis: true,
      dataIndex: ["area"],
    },
    {
      title: "供应商",
      ellipsis: true,
      dataIndex: ["vendor"],
    },
    {
      title: "ssh用户名",
      ellipsis: true,
      dataIndex: ["ssh_username"],
    },
    {
      title: "ssh 端口",
      ellipsis: true,
      dataIndex: ["ssh_port"],
    },
    {
      title: 'cpu核数',
      ellipsis: true,
      dataIndex: 'cpu_cores'
    },
    {
      title: '内存总数',
      ellipsis: true,
      dataIndex: 'mem_total'
    },
    {
      title: '硬盘容量',
      ellipsis: true,
      dataIndex: 'disk_capacity'
    },
    {
      title: '网卡数量',
      ellipsis: true,
      dataIndex: 'nic_amount'
    },
    {
      title: '网卡类型',
      ellipsis: true,
      dataIndex: 'nic_type'
    },
    {
      title: '服务器描述',
      ellipsis: true,
      dataIndex: 'description'
    },
    {
      title: "创建人/创建时间",
      ellipsis: true,
      render: (text, record) => (
        <span>
          {(record && record.creator) || ""}/
          {record &&
            record.created_at &&
            moment(record.created_at * 1000).format("YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      ellipsis: true,
      fixed: "right",
      render: val => (
        <>
          <Link to={`/system/wx_cluster/server/update/${val && val.id}`}>编辑</Link>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val.id)}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <a onClick={() => handleRowExpand(val.id)}>详情</a>
          <Divider type="vertical" />
          <Link
            to={`/system/wx_cluster/wx_server_monitor_visualization/${val && val.id}`}>
            服务器监控
          </Link>
        </>
      ),
    },
  ];
  //删除
  const handleDelete = async id => {
    try {
      serverDelete({ id });

      pushlist("table:delete");
    } catch (e) {
      message.error(`${e}`);
    }
  };

  return (
    <PageHeaderWrapper>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
          ]}
          onChange={() => { }}
        />
        <Button type="primary" style={{ marginRight: 20, marginBottom: 18 }}>
          <Link to="/system/wx_cluster/server/add">新增</Link>
        </Button>
        <DownLoadFile
          services={() => {
            return serverExport({
              name: "server",
            });
          }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={serverSearch}
          rowSelection={false}

          tableProps={{
            tableLayout: "fixed",
            scroll: {
              x: "auto",
            },
            expandable: {
              expandedRowRender: record => <ExpandedRow values={record} />,
              expandIcon: () => { },
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
    </PageHeaderWrapper>
  );
};

export default Server;
