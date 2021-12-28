import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Divider, Row, Col, Button} from "antd";
import { Link } from 'react-router-dom';
import {
  serviceSearch,
  serviceConfigDownLoad,
  serviceDiscription,
} from "@/services/v1";
import DownloadTemplate from "@/components/DownloadTemplate";
import DownLoadFile from "@/components/DownLoadFile";
import { formatDate } from "@/utils/utils";

const { Option } = Select;

const Hotel = props => {
  const refTable: any = useRef(null);
  const [modalValue, setModalValue] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [discriptions, setDiscriptions]: any = useState([]);

  useEffect(() => {
    serviceDiscription({
      name: "all",
    }).then(res => {
      setDiscriptions(res || []);
    });
  }, []);

  

  //重启 停用弹框
  const handleModalVisible = (visible, title, name, id) => {
    if (visible) {
      setModalValue({
        title,
        name,
        id,
      });
    } else {
      setModalValue({});
    }
    setModalVisible(visible);
  };

  // search
  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  //详情
  const handleRow = id => {
    const index = expandedRowKeys.findIndex(q => q === id);
    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };
  const renderTable = ({ record }) => {
    const obj = {
      ...record,
      created_at: formatDate(record && record.created_at, "YYYY-MM-DD"),
      updated: formatDate(record && record.updated, "YYYY-MM-DD"),
    };
    return (
      <Row>
        {(discriptions || []).map(item => (
          <Col span={4} key={JSON.stringify(item)}>
            <div style={{ padding: "2px 10px" }}>
              <span>{item.display}：</span>
              <span>{obj[item.name]}</span>
            </div>
          </Col>
        ))}
      </Row>
    );
  };
  const columns = [
    {
      dataIndex: "1",
      title: "旅客编号",
      align: "center",
    },
    {
      dataIndex: "b",
      title: "旅馆序号",
      align: "center"
    },
    {
      dataIndex: "c",
      title: "入住时间",
      align: "center",
    },
    {
      dataIndex: "g",
      title: "行政区划代码",
      align: "center",
    },
    {
      dataIndex: "e",
      title: "住址",
      align: "center",
    },
    {
      title: "操作",
      align: "center",
      // render: val => (
      //   <>
      //     <a onClick={() => handleModalVisible(true, "停用", "stop", [val.id])}>
      //       编辑
      //     </a>
      //     <Divider type="vertical" />
      //     <Link to={`/maintenance/service/info/${val && val.id}`}>详情</Link>
      //     <Divider type="vertical" />
      //     <a onClick={() => handleModalVisible(true, "停用", "stop", [val.id])}>
      //       删除
      //     </a>
      //   </>
      // ),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "旅客编号",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "行政区划代码",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            }
          ]}
          onChange={() => {}}
        />
        <StandardTable
          ref={refTable}
          columns={columns}
          services={serviceSearch}
          rowSelection={false}
          tableProps={{
            expandedRowKeys: expandedRowKeys,
            expandIcon: () => false,
            expandIconColumnIndex: -1,
            expandedRowRender: record => renderTable({ record }),
          }}
        />
      </Card>
    </>
  );
};

export default Hotel;
