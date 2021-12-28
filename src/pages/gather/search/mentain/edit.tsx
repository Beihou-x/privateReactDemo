import React, { useRef, useState, useEffect } from "react";
import { Modal,Form,Select,Input } from "antd";
import VForm from "@components/VForm";
import { serviceUpdate } from "@/services/v1";
import { filterCategory } from "@/utils/utils"
import { filter } from "lodash";

const Edit = (props) => {
  const { modalVisible, handleModalVisible, handleSearch, category,editData } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [sources, setSources] = useState([]);
  const industry = filterCategory("行业属性") || [];
  const administrative = filterCategory("行政属性") || [];
  const secretLevel = filterCategory("密级") || []
 
  const handleCancel = () => {
    handleModalVisible && handleModalVisible({},false);
  };
  const handleOk = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        setLoading(true);
        serviceUpdate(editData.id,{
          ...valid,
          category:category
        }).then((res) => {
          setLoading(false);
           if (res === undefined) {
            handleCancel();
            handleSearch && handleSearch();
          }
        });
      })
      .catch((e) => {});
  };

  const columns = [
    { name: "name", label: "服务名称", rules: [{ required: true }] },
    { name: "icon_url", label: "服务图标", type:"upload" },
    { name: "ip", label: "服务IP", rules: [{ required: true }] },
    { name: "networking", label: "承载网络", rules: [{ required: true }] },
    {
      name: "industry",
      label: "行业",
      type: "select",
      list: industry,
      rules: [{ required: true }]
    },
    { name: "driver_name", label: "驱动名称", rules: [{ required: true }] },
    { name: "port", label: "服务端口", rules: [{ required: true }] },
    { name: "secret_level", label: "密级", type: "select",list: secretLevel,rules: [{ required: true }] },
    { name: "administrative", label: "行政",type: "select", list: administrative, rules: [{ required: true }] },
    { name: "connection_string", label: "连接地址", rules: [{ required: true }] },
    { name: "description", label: "服务描述", type: "textarea" },
    { name: "config", label: "配置文件", type: "textarea" },
  ];


  return (
    <Modal
      title="新增汇聚任务"
      width={900}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <VForm columns={columns} ref={childRef} span={12} data={editData}  />
      
    </Modal>
  );
};

export default Edit;
