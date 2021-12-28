import React, { useRef, useState, useEffect } from "react";
import { Modal, List,Button } from "antd";
import { formatDate,getCodeValue,filterCategory } from "@/utils/utils";

const Detail = (props) => {
  const { detailShow, handleDetailShow, detailData } = props;
  const [detail, setDeatail]: any = useState({});
  const secretLevel = filterCategory("密级") || [];
  const industry = filterCategory("行业属性") || [];
  const administrative = filterCategory("行政属性") || [];
  const categorys = filterCategory("应用类型") || [];

  useEffect(() => {
    const obj = {
      ...detailData,
      // created_at: formatDate(detailData && detailData.created_at, "YYYY-MM-DD"),
      // expired_at: formatDate(detailData && detailData.expired_at, "YYYY-MM-DD"),
    };
    setDeatail(obj);
  }, [detailData]);
  const handleCancel = () => {
    handleDetailShow(false);
  };
  const colums = [
    {
      title: "应用编码",
      data: detail.name,
    },
    {
      title: "类型",
      data: getCodeValue(categorys,detail.category),
    },
    {
      title: "运维单位名称代码",
      data: detail.maintenance_code,
    },
    {
      title: "管理单位名称",
      data: detail.management,
    },
    {
      title: "管理单位联系方式",
      data: detail.management_contact,
    },
    {
      title: "授权信息",
      data: detail.authorization,
    },
    {
      title: "密级",
      data: getCodeValue(secretLevel, detail.secret_level),
    },
    {
      title: "行政属性",
      data: getCodeValue(administrative,detail.administrative),
    },
    {
      title: "状态",
      data: detail.status==="DEFAULT"? "正常": "删除",
    },
    {
      title: "标签",
      data: detail.tag_name&&detail.tag_name.toString()
    },
    {
      title: "应用描述",
      data: detail.description,
    },
    {
      title: "创建人",
      data: detail.creator,
    },
    {
      title: "应用名称",
      data: detail.name,
    },
    {
      title: "运维单位名称",
      data: detail.maintenance,
    },
    {
      title: "运维单位联系方式",
      data: detail.maintenance_contact,
    },
    {
      title: "管理单位名称代码",
      data: detail.management_code,
    },
    {
      title: "授权有效期",
      data: detail.expired_at,
    },
    {
      title: "行业属性",
      data: getCodeValue(industry,detail.industry),
    },
    {
      title: "版本",
      data: detail.version,
    },
    {
      title: "创建时间",
      data: detail.created_at,
    },
  ];

  return (
    <Modal
      title="详情"
      width={800}
      visible={detailShow}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <List
        grid={{ gutter: 16, column: 2 }}
        dataSource={colums}
        renderItem={(item) => (
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
