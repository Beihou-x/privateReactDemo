import React, { useEffect, useRef, useState } from "react";
import { Card, Button, Divider, Image, Row, Col, Descriptions } from "antd";
import VForm from "@components/VForm";
import styles from "./index.less";
import { relationImage } from "@/services/v1";
import { getUrlProps, getUrl } from "@/utils/utils";

const Plate = () => {
  const childRef: any = useRef(null);
  const columns = [{ name: "ImageUID", label: "图片唯一标识" }];
  const [data, setData]: any = useState({});
  const [imageData1, setImageData1]: any = useState([]);
  const [imageData2, setImageData2]: any = useState([]);
  const [imageData3, setImageData3]: any = useState([]);
  const [dataObj, setObj]: any = useState({});
  const [type, setType]: any = useState("");

  useEffect(() => {
    getImgUrl();
  }, []);

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };

  const onSearch = () => {
    // useEffect(()=>{
    //   const {id}
    //   relationImageDetail({id}).then(res =>{

    //   })
    // },[id])

    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        console.log("valid---", valid);
        relationImage({
          ImageUID: valid.ImageUID,
        }).then((res) => {
          if (res) {
            if (res && res.main_image) {
              if (res.main_image.face) {
                setData(res.main_image.face);
                setType("face");
              } else if (res.main_image.motor) {
                setData(res.main_image.motor);
                setType("motor");
              } else if (res.main_image.image) {
                setData(res.main_image.image);
                setType("image");
              } else {
                setData({});
                setType("");
              }
            }
            setImageData1(
              (res && res.relation_images && res.relation_images.face) || []
            );
            setImageData2(
              (res && res.relation_images && res.relation_images.motor) || []
            );
            setImageData3(
              (res && res.relation_images && res.relation_images.other) || []
            );
          }
        });
      })
      .catch((e) => {});
  };

  const onReset = async () => {
    const form = childRef.current.getForm();
    await form.resetFields();
    setData({});
    setType("");
    setImageData1([]);
    setImageData2([]);
    setImageData3([]);
  };

  return (
    <Card bordered={false} className={styles.pic}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "40%", marginRight: 50 }}>
          <VForm columns={columns} ref={childRef} span={24} />
        </div>
        <Button type="primary" onClick={() => onSearch()}>
          查询
        </Button>
        <Button style={{ marginLeft: 20 }} onClick={() => onReset()}>
          重置
        </Button>
      </div>
      <p>图片信息</p>
      <div className={styles.img1}>
        {data.StoragePath ? (
          <div>
            <Row justify="center">
              <Col span={8}>
                <Image
                  key={data.StoragePath}
                  src={data.StoragePath}
                  width={300}
                  style={{ maxHeight: 250 }}
                ></Image>
              </Col>
              <Col span={16}>
                {type === "face" ? (
                  <Descriptions title="基本信息">
                    <Descriptions.Item label="姓名">
                      {data.Name}
                    </Descriptions.Item>
                    <Descriptions.Item label="性别">
                      {data.GenderCode}
                    </Descriptions.Item>
                    <Descriptions.Item label="年龄段">
                      {data.AgeLowerLimit}~{data.AgeUpLimit}
                    </Descriptions.Item>
                    <Descriptions.Item label="证件类型">
                      {data.IDType}
                    </Descriptions.Item>
                    <Descriptions.Item label="证件号码">
                      {data.IDNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="戴帽子">
                      {data.WearHat}
                    </Descriptions.Item>
                    <Descriptions.Item label="戴眼镜">
                      {data.WearGlasses}
                    </Descriptions.Item>
                    <Descriptions.Item label="戴口罩">
                      {data.WearMask}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  ""
                )}
                {type === "motor" ? (
                  <Descriptions title="车辆基本信息">
                    <Descriptions.Item label="车牌号">
                      {data.PlateNo}
                    </Descriptions.Item>
                    <Descriptions.Item label="车牌颜色">
                      {data.PlateColor}
                    </Descriptions.Item>
                    <Descriptions.Item label="号牌种类">
                      {data.PlateClass}
                    </Descriptions.Item>
                    <Descriptions.Item label="车辆类型">
                      {data.VehicleClass}
                    </Descriptions.Item>
                    <Descriptions.Item label="车辆品牌">
                      {data.VehicleBrand}
                    </Descriptions.Item>
                    <Descriptions.Item label="车身颜色">
                      {data.VehicleColor}
                    </Descriptions.Item>
                    <Descriptions.Item label="车辆使用性质代码">
                      {data.UsingPropertiesCode}
                    </Descriptions.Item>
                  </Descriptions>
                ) : (
                  ""
                )}
              </Col>
            </Row>
          </div>
        ) : (
          ""
        )}
      </div>
      <Divider />
      <p>关联图片</p>
      <div className={styles.img2}>
        <Row>
          {imageData1.map((m: any, index) => (
            <Col key={index} span={6}>
              <Image
                src={m.StoragePath}
                key={m.StoragePath}
                width={150}
                height={130}
              ></Image>
              <p></p>
              {m.Name && m.IDNumber !== "" ? (
                <div>
                  <p>姓名：{m.Name}</p>
                  <p>证件号码: {m.IDNumber}</p>
                </div>
              ) : (
                <></>
              )}
            </Col>
          ))}
        </Row>
        <Divider />
        <Row>
          {imageData2.map((m: any, index) => (
            <Col key={index} span={6}>
              <Image
                src={m.StoragePath}
                key={m.StoragePath}
                width={150}
                height={130}
              ></Image>
            </Col>
          ))}
        </Row>
        <Divider />
        <Row>
          {imageData3.map((m: any, index) => (
            <Col key={index} span={6}>
              <Image
                src={m.StoragePath}
                key={m.StoragePath}
                width={150}
                height={130}
              ></Image>
            </Col>
          ))}
        </Row>
      </div>
    </Card>
  );
};

export default Plate;
