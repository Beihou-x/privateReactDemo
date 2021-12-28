import React, { useEffect, useState } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Button, Divider } from "antd";
import {
  forwardManageSearch,
  applicationSearch,
  forwardManageExport,
} from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { formatDate } from "@/utils/utils";

const { Option } = Select;

type ApproveAccessProps = {};

const getValue = (val) => {
  if (val === "DRAFT") {
    return "草稿";
  } else if (val === "APPLYING") {
    return "申请中";
  } else if (val === "APPROVED") {
    return "同意";
  } else if (val === "REFUSE") {
    return "拒绝";
  } else {
    return "";
  }
};

const ApproveAccess = () => {
  const [applications, setApplication] = useState([]);

  useEffect(() => {
    applicationSearch({}).then((res) => {
      const { items = [] } = res;
      if (items && items.length) {
        const arr = items.map((m) => {
          return { label: m.name, value: m.id };
        });
        setApplication(arr);
      }
    });
  }, []);

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
      title: "设备数",
      dataIndex: ["DeviceMap"],
      align: "center",
      render: (val) =>
        Object.entries(val).map((item: any, index) => {
          return (
            <div key={index}>
              <span>{item[0]} : </span>
              <span>{item[1]}</span>
            </div>
          );
        }),
    },
    {
      title: "开始转发时间",
      dataIndex: ["begin"],
      align: "center",
      render: (val, record) => (
        <span>{formatDate(record && record.begin, "YYYY-MM-DD")}</span>
      ),
    },
    // {
    //   title: "最后转发时间",
    //   dataIndex: ["end"],
    //   align: "center",
    //   render: (val, record) => (
    //     <span>{formatDate(record && record.end, "YYYY-MM-DD")}</span>
    //   ),
    // },

    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <Link to={`/service/share/ApproveManagement/${val.id}`}>
            进度查询
          </Link>
          {/* <Divider type="vertical" />
          <a onClick={() => { }}>转发调度</a> */}
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
              renderFormItem: () => <Input />,
            },
            {
              label: "申请标题",
              name: "title",
              renderFormItem: () => <Input />,
            },
            // 暂不支持国标ID搜索
            // {
            //   label: "国标ID",
            //   name: "traffic",
            //   renderFormItem: () => <Input></Input>,
            // },
          ]}
          onChange={() => { }}
        />
        <DownLoadFile
          services={() => forwardManageExport()}
          style={{ marginBottom: 18 }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={forwardManageSearch}
          rowSelection={false}
        />
      </Card>
    </>
  );
};

export default ApproveAccess;
