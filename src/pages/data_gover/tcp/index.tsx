import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Divider, Select, Button, Row, Col } from "antd";
import { protocolSearch, getTcpDetail, downloadProtocol } from "@/services/v1";
import SearchForm from "@components/SearchForm";
import EditTcp from "./Edit";
import { formatDate, filterCategory } from "@/utils/utils";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import TagModal from "./Tag";

const { Option } = Select;

const TCPManagement = () => {
  const category = filterCategory("协议类型") || [];
  const refTable: any = useRef(null);

  const [tcpShow, setTcpShow] = useState(false);
  const [tcpEditData, setTcpEditData] = useState({});
  const [detailInfo, setDetailInfo]: any = useState([]);
  const [expandedRowKeys, setRowKeys]: any = useState([]);

  // 标签信息
  const [tagShow, setTagShow] = useState(false);
  const [tagData, setTagData] = useState({});

  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  // 编辑
  const handleTcpEdit = (val, isShow) => {
    setTcpEditData(val);
    setTcpShow(isShow);
  };

  //详情
  const handleExpand = async (id) => {
    const response = await getTcpDetail({ id });
    setDetailInfo(response || []);
    const index = expandedRowKeys.findIndex((q) => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };
  // 标签modal显示隐藏
  const tagAdd = (val, isShow) => {
    setTagShow(isShow);
    setTagData(val);
  };

  const syntaxHighlight = (jsonData) => {
    let json = jsonData;
    if (typeof json !== "string") {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, "&").replace(/</g, "<").replace(/>/g, ">");
    return json.replace(
      /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
      (match) => {
        let cls = "darkorange";
        if (/^"/.test(match)) {
          if (/:$/.test(match)) {
            cls = "#ccc";
          } else {
            cls = "green";
          }
        } else if (/true|false/.test(match)) {
          cls = "blue";
        } else if (/null/.test(match)) {
          cls = "magenta";
        }
        return `<span style="color:${cls}">${match}</span>`;
      }
    );
  };

  const columns = [
    {
      dataIndex: "name",
      title: "协议名称",
      align: "center",
    },
    {
      dataIndex: "category",
      title: "协议类型",
      align: "center",
    },
    {
      dataIndex: "tag_name",
      title: "标签",
      align: "center",
      render: (val) => <span>{val && val.toString()}</span>,
    },
    {
      title: "创建人/创建时间",
      dataIndex: ["creator"],
      align: "center",
      render: (val, record) => (
        <span>
          {(record && record.creator) || "-"} /{" "}
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <Link to={`/system/wx_basic_config/tcpEdit/${val.id}`}>编辑</Link>
          <Divider type="vertical" />
          <a onClick={() => tagAdd(val, true)}>标签</a>
          <Divider type="vertical" />
          <a onClick={() => handleExpand(val.id)}>详情</a>
        </>
      ),
    },
  ];

  const expandedRow = () => {
    return (
      <>
        <Row justify="center">
          <Col span={5}>
            <span>名称：</span>
            <span>{detailInfo.name}</span>
          </Col>
          <Col span={4}>
            <span>协议类型：</span>
            <span>{detailInfo.category}</span>
          </Col>
          <Col span={5}>
            <span>配置：</span>
            <span>{detailInfo.config}</span>
          </Col>
          <Col span={5}>
            <span>创建人/创建时间：</span>
            <span>
              {(detailInfo && detailInfo.creator) || "-"} /{" "}
              {formatDate(detailInfo && detailInfo.created_at, "YYYY-MM-DD")}
            </span>
          </Col>
          <Col span={5}>
            <span>版本：</span>
            <span>{detailInfo.version}</span>
          </Col>
        </Row>
        <div style={{width: "100%"}}>
          <p>协议内容</p>
          <div>
            {detailInfo.data_example ? (
              <div style={{ height: 400,overflow: "auto",width: 1800}}>
                <pre style={{ margin: 0, display: "inline-block" }}>
                  <div
                    dangerouslySetInnerHTML={{ __html: syntaxHighlight(detailInfo.data_example) }}
                  />
                </pre>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "协议名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "协议类型",
              name: "category",
              renderFormItem: () => <Select options={category} allowClear />,
            },
          ]}
          onChange={() => {}}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => {
            // handleModalVisible(true);
          }}
        >
          <Link to="/system/wx_basic_config/tcpAdd">新增</Link>
        </Button>
        {/* <DownLoadFile
          style={{ marginRight: 18, marginLeft: 20 }}
          services={() => {
            return downloadProtocol({
              name: "protocol",
            });
          }}
        >
          导出
        </DownLoadFile> */}
        <StandardTable
          ref={refTable}
          columns={columns}
          services={protocolSearch}
          rowSelection={false}
          tableProps={{
            expandable: {
              expandedRowRender: expandedRow,
              expandIcon: () => {},
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
      {tcpShow ? (
        <EditTcp
          tcpShow={tcpShow}
          handleTcpEdit={handleTcpEdit}
          tcpEditData={tcpEditData}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
      {tagShow ? (
        <TagModal
          modalVisible={tagShow}
          handleModalVisible={tagAdd}
          handleSearch={handleSearchReset}
          tagData={tagData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default TCPManagement;
