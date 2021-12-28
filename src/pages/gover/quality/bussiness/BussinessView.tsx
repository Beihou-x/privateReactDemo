import React, { useEffect, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import SearchForm from "@components/SearchForm";
import { Input, Select, Card, Row, Col } from "antd";
import {
  businessAndCustomizeHead,
  businessAndCustomizeList,
} from "@/services/v2";
import { areaManagement } from "@/services/v1";
import { WarningOutlined, GoldOutlined } from "@ant-design/icons";
import styles from "./index.less";
import CheckDate from "../component/todayAndYesterday";
import { formatStartData, formatEndData, format } from "@/utils/utils";

const { Option } = Select;

const BussinessView = props => {
  const refTable: any = useRef(null);
  const [data, setData]: any = useState({});
  const [units, setUnits]: any = useState([]);

  useEffect(() => {
    getData();
    areaManagement({}).then(res => {
      setUnits(
        res &&
          res.items &&
          res.items.map(m => {
            return { label: m.name, value: m.id };
          })
      );
    });
  }, []);

  const getData = async (params: any = {}) => {
    businessAndCustomizeHead({
      ...params,
      type: "business",
    }).then(res => {
      if (res) {
        setData(res);
      }
    });
  };

  const columns = [
    {
      dataIndex: "tag_name",
      title: "业务标签",
      align: "center",
    },
    {
      dataIndex: "total",
      title: "超级卡口设备数",
      align: "center",
    },
    {
      dataIndex: "total_cover",
      title: "超级卡口设备覆盖率",
      align: "center",
      render: val => (
        <span>{format(val)+'%'}</span>
      )
    },
    {
      dataIndex: "total1",
      title: "人像卡口设备数",
      align: "center",
    },
    {
      dataIndex: "total1_cover",
      title: "人像卡口设备覆盖率",
      align: "center",
      render: val => (
        <span>{format(val)+'%'}</span>
      )
    },
    {
      dataIndex: "total2",
      title: "普通卡口设备数",
      align: "center",
    },
    {
      dataIndex: "total2_cover",
      title: "普通卡口设备覆盖率",
      align: "center",
      render: val => (
        <span>{format(val)+'%'}</span>
      )
    },
  ];
  // 切换btn
  const radioChange = async e => {
    if (e.target.value === "a") {
      await refTable.current.handleSearch({});
      await getData({});
    } else {
      let time = new Date().getTime() - 24 * 60 * 60 * 1000;
      let start = formatStartData(time);
      let end = formatEndData(time);
      await refTable.current.handleSearch({ start, end });
      await getData({ start, end });
    }
  };
  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <CheckDate radioChange={radioChange} />
        <Row gutter={[10, 10]}>
          <Col span={8}>超级卡口设备数: {data.total || 0}</Col>
          <Col span={8}>人像卡口设备数: {data.total1 || 0}</Col>
          <Col span={8}>普通卡口设备数: {data.total2 || 0}</Col>
          <Col span={8}>
            超级卡口设备覆盖率不达标签数:{" "}
            {data.super_device_copy_notstandard_total || 0}
          </Col>
          <Col span={8}>
            人像卡口设备覆盖率不达标签数:{" "}
            {data.face_device_copy_notstandard_total || 0}
          </Col>
          <Col span={8}>
            普通卡口设备覆盖率不达标签数:{" "}
            {data.normal_device_copy_notstandard_total || 0}
          </Col>
        </Row>
      </Card>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "组织区域",
              name: "place_code",
              renderFormItem: () => <Select options={units || []} allowClear />,
            },
          ]}
          onChange={() => {}}
          subscribeName="tagBussiness"
        />
        {/* <DownLoadFile
          services={() => {
            return accessExports({
              name: 'access_request'
            })
          }}
        >
          导出
        </DownLoadFile> */}
        <div style={{ marginBottom: 18 }}></div>
        <StandardTable
          ref={refTable}
          columns={columns}
          services={params =>
            businessAndCustomizeList({
              ...params,
              type: "business",
              tag_ids: ["11301", "11302"],
            })
          }
          rowSelection={false}
          subscribeName="tagBussiness"
        />
      </Card>
    </>
  );
};

export default BussinessView;
