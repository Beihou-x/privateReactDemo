import React, { useRef, useState } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Divider, Select, Button, Row, Col, Tag, Descriptions, Modal, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { protocolSearch, getTcpDetail, downloadProtocol, protocolUpdate } from "@/services/v1";
import { forwardAndShouldForward } from "@/services/v2";
import SearchForm from "@components/SearchForm";
// import EditTcp from "./Edit";
import { formatDate, filterCategory, format } from "@/utils/utils";
import DownLoadFile from "@components/DownLoadFile";
import { Link, useParams } from "react-router-dom";
import TagModal from "./Tag";

const { Option } = Select;

const TCPManagement = () => {
  const category = filterCategory("协议类型") || [];
  const refTable: any = useRef(null);

  const [tcpEditData, setTcpEditData] = useState({});
  const [detailInfo, setDetailInfo]: any = useState([]);
  const [recordInfo, setRecordInfo]: any = useState({});
  const [expandedRowKeys, setRowKeys]: any = useState([]);

  // 标签信息
  const [tagShow, setTagShow] = useState(false);
  const [tagData, setTagData] = useState({});
  const [actionName, setActionName] = useState('');

  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  //详情
  const handleExpand = async (id, name) => {
    setActionName(name)
    if (name === '详情') {
      const response = await getTcpDetail({ id });
      setDetailInfo(response || []);
    } else {
      const response = await forwardAndShouldForward({ type: 'protocol', protocol_id: id });
      setRecordInfo(response || {});
    }
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

  const startOrStop = (title, val) => {
    Modal.confirm({
      title: title,
      content: `是否确认${title}名称为:"${val.name}"的协议`,
      icon: <ExclamationCircleOutlined />,
      bodyStyle: { color: "#fff" },
      onOk() {
        protocolUpdate({
          id: val.id,
          status: title
        }).then(res => {
          handleSearchReset()
        })
      },
      onCancel() { },
    });
  }

  const downloadConfig = (config, name) => {
    if (!config) {
      message.error("此协议无配置文件")
      return
    }
    let Link = document.createElement('a');
    Link.download = `${name}.json`;
    Link.style.display = 'none';
    // 字符内容转变成blob地址
    var blob = new Blob([config]);
    Link.href = URL.createObjectURL(blob);
    // 触发点击
    document.body.appendChild(Link);
    Link.click();
    // 然后移除
    document.body.removeChild(Link);
  }


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
      dataIndex: "type",
      title: "标签",
      align: "center",
      render: val => (
        val ? <Tag color="#108ee9">{val === "ACCESS" ? "接入协议" : "转发协议"}</Tag>
          : ''
      )
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
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
      render: (val, row) => (
        <>
          {
            row.status === '启用' ?
              <>
                <a onClick={() => startOrStop('停用', val)}>停用</a>
                <Divider type="vertical" />
              </> :
              <>
                <a onClick={() => startOrStop('启用', val)}>启用</a>
                <Divider type="vertical" />
              </>
          }
          <Link to={`/service/share/wx_approve_tcp_edit/${val.id}`}>更新</Link>
          <Divider type="vertical" />
          <a onClick={() => handleExpand(val.id, '详情')}>详情</a>
          <Divider type="vertical" />
          <a onClick={() => tagAdd(val, true)}>选择厂商</a>
          <Divider type="vertical" />
          <Link to={`/service/share/wx_approve_tcp_report/${val.id}`}>服务结果报告</Link>
          <Divider type="vertical" />
          <a onClick={() => downloadConfig(val.config, val.name)}>模型更新</a>
          <Divider type="vertical" />
          <Link to={`/monitor/${val && val.id}/forward_protocol`}>监控</Link>
          <Divider type="vertical" />
          <a onClick={() => handleExpand(val.id, '对账')}>对账</a>

        </>
      ),
    },
  ];
  const getManufacturerType = (arr, type) => {
    let arr1: string[] = []
    arr.forEach(item => {
      if (item.category === type) {
        arr1.push(item.manufacturer)
      }
    })
    return arr1
  }
  // 对账
  const expandedRowRecord = (record) => {
    return <Descriptions title="" column={2}>
      <Descriptions.Item label="协议名称">{record.name}</Descriptions.Item>
      <Descriptions.Item label="转发设备数">{recordInfo.forward_device_num}</Descriptions.Item>
      <Descriptions.Item label="应转发数">{recordInfo.should_forward_total}</Descriptions.Item>
      <Descriptions.Item label="实转发数">{recordInfo.real_forward_total}</Descriptions.Item>
      <Descriptions.Item label="转发成功率">{recordInfo.forward_success_rec ? `${format(recordInfo.forward_success_rec)}%` : '-'}</Descriptions.Item>
      <Descriptions.Item label="转发失败率">{recordInfo.forward_failed_rec ? `${format(recordInfo.forward_failed_rec)}%` : '-'}</Descriptions.Item>
      <Descriptions.Item label="完整性过滤数">{recordInfo.complete_filter_num}</Descriptions.Item>
      <Descriptions.Item label="图片可用性过滤总数">{recordInfo.image_vail_filter_num}</Descriptions.Item>
      <Descriptions.Item label="图片可用性过滤报文数">{recordInfo.image_vail_filter_message_num}</Descriptions.Item>
      <Descriptions.Item label="转发响应总数">{recordInfo.sub_respond_num}</Descriptions.Item>
      <Descriptions.Item label="对应code响应数">{recordInfo.code_respond_num}</Descriptions.Item>
      <Descriptions.Item label="人卡人像图片数">{recordInfo.person_image_num}</Descriptions.Item>
    </Descriptions>
  }

  // 详情
  const expandedRow = () => {
    return (
      <>
        <Row>
          <Col span={6}>
            <span>名称：</span>
            <span>{detailInfo.name}</span>
          </Col>
          <Col span={6}>
            <span>协议类型：</span>
            <span>{detailInfo.category}</span>
          </Col>
          <Col span={6}>
            <span>配置：</span>
            <span>{detailInfo.config}</span>
          </Col>
          <Col span={6}>
            <span>设备厂商：</span>
            <span>{detailInfo.manufacturer ? getManufacturerType(detailInfo.manufacturer, "设备厂商").toString() : ''}</span>
          </Col>
          <Col span={6}>
            <span>引擎厂商：</span>
            <span>{detailInfo.manufacturer ? getManufacturerType(detailInfo.manufacturer, "引擎厂商").toString() : ''}</span>
          </Col>
          <Col span={6}>
            <span>创建人/创建时间：</span>
            <span>
              {(detailInfo && detailInfo.creator) || "-"} /{" "}
              {formatDate(detailInfo && detailInfo.created_at, "YYYY-MM-DD")}
            </span>
          </Col>
          <Col span={6}>
            <span>版本：</span>
            <span>{detailInfo.version}</span>
          </Col>
        </Row>
        <div style={{ width: "100%" }}>
          <p>协议内容</p>
          <div>
            {detailInfo.data_example ? (
              <div style={{ height: 400, overflow: "auto", maxWidth: 1800, minWidth: 1000 }}>
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
          onChange={() => { }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => {
            // handleModalVisible(true);
          }}
        >
          <Link to="/service/share/wx_approve_tcp_add">新增</Link>
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
          services={(params: any) => {
            return protocolSearch({ ...params, type: "FORWARD" })
          }}
          rowSelection={false}
          tableProps={{
            expandable: {
              expandedRowRender: actionName === '详情' ? expandedRow : expandedRowRecord,
              expandIcon: () => { },
              expandIconColumnIndex: -1,
              expandedRowKeys: expandedRowKeys,
            },
          }}
        />
      </Card>
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
