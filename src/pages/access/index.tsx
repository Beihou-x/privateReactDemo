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
  const sources = filterCategory("接入来源") || [];
  const status = filterCategory("申请状态") || [];
  const categorys = filterCategory("接入申请类型") || [];
  const [accessId, setAccessId] = useState('')
  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});

  const { pushlist }: any = useContext(DefaultPubSubContext);
  const refTable: any = useRef(null);

  const importData = (id) => {
    setAccessId(id);
    pushlist("modalForm", true);
  }
  const importEmit = (val, res) => {
    if (val === 'error') {
      message.error('导入失败')
    } else if (val === 'submit') {
      if (res) {
        message.success(`一共读取${res.read_row}条数据, 成功插入${res.insert_row}条, 失败${res.failed_row}条`, 6);
      }
      pushlist('modalForm', false);
    }
  }

  const onSearchChange = (params) => {
    setSearchParams(params);
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
      title: "接入来源",
      dataIndex: "source",
      align: "center",
    },
    {
      title: "申请状态",
      dataIndex: ["status"],
      align: "center",
      // render: (val) => getCodeValue(status, val)
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
          <a
            onClick={() => {
              importData(val.id)
            }}
          >
            导入数据
          </a>
          <Divider type="vertical" />
          {/* <Link to={"/gather/data/access/check/" + `${val.id}`}>校验</Link>
          <Divider type="vertical" /> */}
          <Link to={"/gather/data/access/assign/" + `${val.id}`}>分配服务</Link>
          <Divider type="vertical" />
          <Link to={"/gather/data/access/detail/" + `${val.id}`}>详情</Link>
          <Divider type="vertical" />
          <Link to={`/monitor/${val && val.id}/access`}>指标监控</Link>
          <Divider type="vertical" />
          <Link to={`/gather/data/access_record/${val && val.id}`}>申请记录</Link>
          <Divider type="vertical" />
          <Link to={`/gather/data/wx_access_log/${val.id}`}>日志</Link>
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
              label: "申请状态",
              name: "status",
              renderFormItem: () => (
                <Select allowClear options={status}></Select>
              ),
            },
            {
              label: "接入来源",
              name: "source",
              renderFormItem: () => <Select allowClear options={sources} />,
            },
          ]}
          onChange={(params, type) => onSearchChange(params)}
        />
        <Button
          type="primary"
          style={{ marginRight: 20, marginBottom: 18 }}
        >
          <Link to="/gather/data/access/add">申请</Link>
        </Button>
        <DownLoadFile
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
      <Modal subscribeName="modalForm" title="设备注册">
        <DownloadTemplate
          services={() => {
            return accessApplyDownloadTemplate();
          }}
          type="link"
        >
          下载模板
        </DownloadTemplate>
        <Upload
          services={({ formData }) => {
            return accessDeviceUpload({
              file: formData,
            }, accessId);
          }}
          onEmit={importEmit}
        />
      </Modal>
    </>
  );
};

export default Access;
