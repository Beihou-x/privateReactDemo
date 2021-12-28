import React, { useEffect, useState } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider } from "antd";
import { forwardSearch, forwardRequestExport, applicationSearch } from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";

import ExpandedRow from "./expandRow";
const { Option } = Select;

const ApproveAccess = () => {

  // 申请应用
  const [appList, setAppList] = useState([]);
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});
  useEffect(() => {
    applicationSearch({ limit:99 }).then(res => {
      let arr = res.items.map(item => {
        return {
          label: item.name,
          value: item.id
        }
      })
      setAppList(arr)
    })
  }, [])
  const status = filterCategory("申请状态") || [];
  const getCategory = (val) => {
    if (val === 'SUBSCRIBE') {
      return '订阅'
    } else if (val === 'FORWARD') {
      return '转发'
    } else {
      return val
    }
  }
  const handleRowExpand = id => {
    const index = expandedRowKeys.findIndex(q => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };

  const onSearchChange = (params) => {
    setSearchParams(params);
  }

  const columns = [
    {
      title: "申请ID",
      dataIndex: ["id"],
      align: "center",

    },
    {
      title: "应用ID",
      dataIndex: ["application_name"],
      align: "center",
    },
    {
      title: "申请标题",
      dataIndex: ["title"],
      align: "center",
    },
    {
      title: "申请类型",
      dataIndex: ["category"],
      render: val => (
        <span>{getCategory(val)}</span>
      ),
      align: "center",
    },
    {
      title: "订阅标题",
      dataIndex: "subscribe_content_type",
      align: "center"
    },
    {
      title: "数据类型",
      dataIndex: "data_types",
      align: "center",
      render: val => (
        <>
          {
            val.map((item,key) =>(
              getCodeValue(filterCategory("转发申请数据类型"),item)
            )).toString()
          }
        </>
      )
    },
    {
      title: "申请联系人",
      dataIndex: ["creator"],
      render: (val, record) => (
        <span>
          {record && record.maintenance_contact ? record.maintenance_contact : "-"}
        </span>
      ),
      align: "center",
    },
    {
      title: "申请状态",
      dataIndex: ["status"],
      align: "center",
      render: (val, record) => <>{getCodeValue(status, val.toString())}</>,

    },
    {
      title: "创建人/创建时间",
      dataIndex: ["creator"],
      render: (val, record) => (
        <span>
          {record && record.creator ? record.creator : "-"}/
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
      align: "center",
    },
    {
      title: "处理人/处理时间",
      dataIndex: ["updator"],
      render: (val, record) => (
        <span>
          {record && record.updator ? record.updator : "-"}/
          {formatDate(record && record.updated_at, "YYYY-MM-DD")}
        </span>
      ),
      align: "center",
    },
    {
      title: "操作",
      render: val => (
        <>
          <Link to={`/service/share/ApproveAccess/update/${val && val.id}`}>
            配置
          </Link>
          <Divider type="vertical" />
          <Link
            to={`/service/share/ApproveAccess/distribution/${val && val.id}`}
          >
            调度
          </Link>
          <Divider type="vertical" />
          <Link to={`/service/share/wx_approve_access_data_filter/${val.id}`}>数据过滤</Link>
          <Divider type="vertical" />
          <Link to={`/service/share/ApproveAccess/detail/${val && val.id}`}>
            详情
          </Link>
          <Divider type="vertical" />
          <a onClick={() => handleRowExpand(val.id)}>对账</a>
          <Divider type="vertical" />
          <Link to={`/monitor/${val && val.id}/forward`}>实时监控</Link>
        </>
      ),
      align: "center",
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "申请ID",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "申请标题",
              name: "title",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "申请类型",
              name: "category",
              renderFormItem: () => (
                <Select allowClear>
                  <Option value="SUBSCRIBE">订阅</Option>
                  <Option value="FORWARD">转发</Option>
                </Select>
              ),
            },
            {
              label: "申请应用",
              name: "application_id",
              renderFormItem: () => <Select allowClear options={appList}>

              </Select>,
            },
            {
              label: "申请状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear options={status}>
                </Select>
              ),
            },
          ]}
          onChange={(params) => onSearchChange(params)}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18 }}
        >
          <Link to="/service/share/ApproveAccess/add">申请</Link>
        </Button>
        <DownLoadFile
          services={() => forwardRequestExport({
            ...searchParams
          })}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={(params: any) => {
            return forwardSearch({ 
              category: "FORWARD", 
              ...params 
            })
          }}
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
    </>
  );
};

export default ApproveAccess;
