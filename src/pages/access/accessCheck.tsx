import React, { useContext, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Card, Button, Divider, Select, message } from "antd";
import {
  accessApply,
  accessExports,
  accessDeviceUpload,
} from "@/services/v1";
import { accessApplyDownloadTemplate } from "@/services/v2";
import DownLoadFile from "@components/DownLoadFile";
import DownloadTemplate from "@components/DownloadTemplate";
import { Link } from "react-router-dom";
import Modal from "@components/Modal";
import Upload from "@components/Upload";
import { DefaultPubSubContext } from "@components/PubSubscribe";

import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";

const Access = props => {
  const status = filterCategory("审核状态") || [];
  const categorys = filterCategory("接入申请类型") || [];
  const [accessId, setAccessId] = useState('')
  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});

  const refTable: any = useRef(null);

  const onSearchChange = (params) => {
    setSearchParams(params);
  }
  const getCheckStatus = val  => {
    if(val ==="已申请") {
      return "同意"
    }else if(val ==="申请中") {
      return "待审核"
    }else if(val ==="申请失败") {
      return "拒绝"
    }else {
      return val
    }
  }
  const columns = [
    {
      title: "申请编号",
      dataIndex: ["id"],
      align: "center",
    },
    {
      title: "申请标题",
      dataIndex: ["title"],
      align: "center",
    },
    {
      title: "类型",
      dataIndex: ["category"],
      align: "center",
    },
    {
      title: "设备数",
      dataIndex: ["device_counter"],
      align: "center",
    },
    {
      title: "审核状态",
      dataIndex: ["status"],
      align: "center",
      render: val=> (
        <span>{getCheckStatus(val)}</span>
      )
    },
    {
      title: "申请人/申请时间",
      dataIndex: ["creator"],
      align: "center",
      render: (val, record) => (
        <span>
          {(record && record.creator) || "-"} /{" "}
          {formatDate(record && record.created_at, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "处理人/处理时间",
      dataIndex: ["processor"],
      align: "center",
      render: (val, record) => (
        <span>
          {(record && record.processor) || "-"} /{" "}
          {formatDate(record && record.processed_at, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: val => (
        <>
          {
            val && val.status == "已申请" ? "" :
              <>
                <Link to={"/gather/data/access/audit/" + `${val.id}`}>审核</Link>
                <Divider type="vertical" />
              </>
          }
          <Link to={`/gather/data/approval-record/${val && val.id}`}>审批记录</Link>
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
              label: "申请编号",
              name: "id",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "类型",
              name: "category",
              renderFormItem: () => (
                <Select allowClear options={categorys}></Select>
              ),
            },
            {
              label: "审核状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear options={status}></Select>
              ),
            },
          ]}
          onChange={(params) => onSearchChange(params)}
        />
        <DownLoadFile
          style={{ marginBottom: 18 }}
          services={() => {
            return accessExports({
              name: "access_request",
            }, {
              ...searchParams
            });
          }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={accessApply}
          rowSelection={false}
        />
      </Card>
    </>
  );
};

export default Access;
