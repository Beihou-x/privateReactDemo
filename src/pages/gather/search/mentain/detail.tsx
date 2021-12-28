import React, { useRef, useState, useEffect } from "react";
import { Modal, List } from "antd";

const Detail = props => {
  const { detailShow, handleDetailShow, detailData } = props;

  const handleCancel = () => {
    handleDetailShow(false);
  };
  const colums = [
    {
      title: "服务名称",
      data: detailData.name,
    },
    {
      title: "服务图标",
      data: detailData.icon_url,
    },
    {
      title: "服务IP",
      data: detailData.ip,
    },
    {
      title: "密级",
      data: detailData.secret_level,
    },
    {
      title: "行政",
      data: detailData.administrative,
    },
    {
      title: "配置文件",
      data: detailData.config,
    },
    {
      title: "状态",
      data: detailData.status,
    },
    {
      title: "创建人",
      data: detailData.creator,
    },
    {
      title: "创建时间",
      data: detailData.created_at,
    },
    {
      title: "服务类型",
      data: detailData.category,
    },
    {
      title: "服务描述",
      data: detailData.description,
    },
    {
      title: "承载网络",
      data: detailData.networking,
    },
    {
      title: "行业",
      data: detailData.industry,
    },
    {
      title: "驱动名称",
      data: detailData.driver_name,
    },
    {
      title: "版本",
      data: detailData.version,
    },
    {
      title: "更新人",
      data: detailData.updator,
    },
    {
      title: "更新时间",
      data: detailData.updated_at,
    },
  ];

  return (
    <Modal
      title="详情"
      width={800}
      visible={detailShow}
      onCancel={handleCancel}
    >
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={colums}
        renderItem={item => (
          <List.Item>
            <div style={{ color: "#c1c5ca" }}>
              <span>{item.title} :</span>
              <span>{item.data}</span>
            </div>
          </List.Item>
        )}
      ></List>
    </Modal>
  );
};

export default Detail;
