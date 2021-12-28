import React, { useState, useRef, useEffect } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@/components/SearchForm";
import { Row, Card, Collapse, Input, Form, InputNumber, Select, Tooltip } from "antd";
import { unitDeviceTotalSearch, dataIntegralSearch, dataIntegralHead } from "@/services/v2";
import { Link } from "react-router-dom";
import VTree from "../device_detect/components/VTree";
import ExpandedRow from "../device_detect/components/expandedRow";
import { format, toSmallNumStr, filterCategory, getLabelCategory } from "@/utils/utils";
import { QuestionCircleOutlined } from '@ant-design/icons';
import styles from "./index.less";

const { Panel } = Collapse;

const Detect = () => {
  const treeRef: any = useRef();
  const tableRef: any = useRef();
  const [groupId, setGroupId] = useState("-1");
  const [expandedRowKeys, setRowKeys]: any = useState([]);
  const [headData, setHeadData]: any = useState({});

  const handleRowExpand = (id) => {
    const index = expandedRowKeys.findIndex((q) => q === id);

    if (index > -1) {
      setRowKeys([]);
    } else {
      setRowKeys([id]);
    }
  };

  const onSelect = async (id) => {
    await setGroupId(id);
    getTableData(id);
    getHead(id)
  };

  const getTableData = (id) => {
    const tableR = tableRef;
    tableR.current.handleSearch({ id: id });
  };

  const getHead = async (id) => {
    const res = await dataIntegralHead({ id: id })
    setHeadData(res)
  }

  const callback = () => { };

  const handleChange = (parmas, type) => {
  };

  const columns1 = [
    {
      title: "设备编码",
      dataIndex: "device_id",
      align: 'center'
    },
    {
      title: "设备名称",
      dataIndex: "name",
      align: 'center'
    },
    {
      title: "设备类型",
      dataIndex: "function_type",
      align: 'center'
    },
    {
      title: "是否注册一机一档",
      dataIndex: "is_online",
      align: 'center'
    },
    {
      title: "检查总数",
      dataIndex: "all_num",
      align: 'center',
      render: val => (
        <span>{val || 0}</span>
      )
    },
    {
      title: "完整数",
      dataIndex: "complete_num",
      align: 'center',
      render: val => (
        <span>{val || 0}</span>
      )
    },
    // {
    //   title: "不完整数",
    //   dataIndex: "un_complete_num",
    //   align: 'center'
    // },
    {
      title: <><Tooltip title="当日接收完整报文数/当日接收报文总数"><QuestionCircleOutlined /></Tooltip> 完整率</>,
      dataIndex: "complete_quality",
      align: 'center',
      render: (val) => format(val) + "%",
    },
    // {
    //   title: "操作",
    //   align: 'center',
    //   render: (val, record) => (
    //     <>
    //       <Link to={`/device/detect/wx_small_pic_qualified_detect_detail/${val && val.device_id}`}>
    //         <a>查看明细</a>
    //       </Link>
    //     </>
    //   ),
    // },
  ];

  return (
    <>
      <Row gutter={16}>
        <Card
          bordered={false}
          style={{ height: "77vh", overflowY: "auto", width: 350 }}
        >
          <VTree
            ref={treeRef}
            onSelect={onSelect}
            services={async (params) => {
              const response = await unitDeviceTotalSearch({
                ...params,
                parent_id: "0",
                orderBy: "sequence",
              });
              if (response && response.items) {
                return response.items;
              } else {
                return [];
              }
            }}
          />
        </Card>
        <Card
          bordered={false}
          style={{ width: "calc(100% - 370px)", marginLeft: 20 }}
        >
          <SearchForm
            formList={[
              {
                label: "数据完整率",
                // name: 'valid_quality',
                renderFormItem: () => (
                  <div className="inputRange">
                    <Input.Group>
                      <Form.Item name={["valid_quality", "min"]}>
                        <InputNumber
                          style={{ width: 80, textAlign: "center" }}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value: any) => value.replace("%", "")}
                        />
                      </Form.Item>
                      <Input
                        className="site-input-split"
                        style={{
                          width: 30,
                          borderLeft: 0,
                          borderRight: 0,
                          pointerEvents: "none",
                        }}
                        placeholder="~"
                        disabled
                      />
                      <Form.Item name={["valid_quality", "max"]}>
                        <InputNumber
                          className="site-input-right"
                          style={{
                            width: 80,
                            textAlign: "center",
                          }}
                          min={0}
                          max={100}
                          formatter={(value) => `${value}%`}
                          parser={(value: any) => value.replace("%", "")}
                        />
                      </Form.Item>
                    </Input.Group>
                  </div>
                ),
              },
              {
                label: "设备类型",
                name: "function_type",
                renderFormItem: () => (
                  <Select options={getLabelCategory("摄像机功能类型")}>
                    {/* <Select.Option></Select.Option> */}
                  </Select>
                ),
              },
            ]}
            onChange={handleChange}
          />

          <div className={styles.flex}>
            <div>检测设备数：{(headData && headData.check_num) || 0}</div>
            <div style={{ marginLeft: 30 }}>
              完整率小于90%设备占比：
              <span>{(headData && headData.complete_little_quality && format(headData.complete_little_quality)) || 0}%</span>
            </div>
          </div>
          <StandardTable
            rowKey="device_id"
            ref={tableRef}
            columns={columns1}
            rowSelection={false}
            services={async (params: any) => {
              const { valid_quality } = params;
              let started =
                valid_quality && toSmallNumStr(valid_quality.min || 0);
              let ended =
                valid_quality && toSmallNumStr(valid_quality.max || 100);
              const response = await dataIntegralSearch({
                ...params,
                id: groupId,
                started,
                ended,
              });
              if (response) {
                return response;
              } else {
                return {};
              }
            }}
            tableProps={{
              expandedRowRender: (record) => <ExpandedRow values={record} />,
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
          />
        </Card>
      </Row>
    </>
  );
};

export default Detect;
