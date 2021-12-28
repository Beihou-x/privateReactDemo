import React, { useRef, useState,useEffect } from "react";
import { Modal, message,Checkbox,Divider,Row, Col } from "antd";
import VForm from "@components/VForm";
import { protocolManufactureAdd,protocolSelectedManufacture } from "@/services/v2";
import {filterCategoryId} from "@/utils/utils";

const VModal = (props) => {
  const { modalVisible, handleModalVisible, handleSearch, tagData } = props;
  const childRef: any = useRef(null);
  const [loading, setLoading] = useState(false);

  const [deviceIds, setDeviceIds]:any = useState([]);
  const [engineIds, setEngineIds]:any = useState([]);

  const deviceList = filterCategoryId("设备厂商") || [];
  const engineList = filterCategoryId("引擎厂商") || [];


  useEffect(() => {
    protocolSelectedManufacture({ protocol_id: tagData.id }).then(res => {
      let deviceArr:string[] = [];
      let enginArr:string[] = [];
      if(Array.isArray(res)) {
        res.forEach(item => {
          if(item.category === "设备厂商") {
            deviceArr.push(item.id)
          }else {
            enginArr.push(item.id)
          }
        })
      }
      setDeviceIds(deviceArr);
      setEngineIds(enginArr);
    
  })
}, [])
  const handleCancel = () => {
    handleModalVisible && handleModalVisible({}, false);
  };
  const handleOk = () => {
    setLoading(true);
        protocolManufactureAdd({
          protocol_id: tagData.id,
          device_manufacturer_id: [...deviceIds],
          engine_device_manufacturer_id:[...engineIds]
        }).then((res) => {
          setLoading(false);
          if (res === undefined) {
            message.success("添加成功!");
            handleCancel();
            handleSearch && handleSearch();
          }
        });
  };


  const deviceChange = val => {
    setDeviceIds(val)
  }

  const engineChange = val => {
    setEngineIds(val);
  }

  return (
    <Modal
      title={"选择厂商"}
      width={800}
      visible={modalVisible}
      onCancel={handleCancel}
      onOk={handleOk}
      confirmLoading={loading}
    >
      <div style={{color: "#fff",lineHeight: "30px"}}>设备厂商:</div>
        <Checkbox.Group onChange={deviceChange} value={deviceIds}>
          <Row style={{paddingLeft: 70}}>
            {
              deviceList.map(item => (
                <Col style={{lineHeight: "30px"}} span={8} key={item.value}>
                  <Checkbox style={{width: 100}} value={item.value}>{item.label}</Checkbox>
                </Col>
              ))
            }
          </Row>
        </Checkbox.Group>
      <Divider />
      <div style={{color: "#fff",lineHeight: "30px"}}>引擎厂商:</div>
      <Checkbox.Group onChange={engineChange} value={engineIds}>
        <Row style={{paddingLeft: 70}}>
          {
            engineList.map(item => (
              <Col style={{lineHeight: "30px"}} span={8} key={item.value}>
                <Checkbox style={{width: 100}} value={item.value}>{item.label}</Checkbox>
              </Col>
            ))
          }
        </Row>
      </Checkbox.Group>
    </Modal>
  );
};

export default VModal;
