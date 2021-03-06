import React, { useState, useEffect } from "react";
import { Drawer, Divider, Descriptions, Image, Radio, Space } from "antd";
import styles from "./index.less";
import { getUrl } from "@/utils/utils";

const Detail = props => {
  const {
    visible,
    type,
    onClose,
    data = {},
    leftImageData,
    rightImageData,
  } = props;

  const [dataObj, setObj]: any = useState({});

  useEffect(() => {
    getImgUrl();
  }, []);

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };

  // const error =
  //   "data:image/png;base64,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";

  const error = "null";
  const renderLeftPerson = obj => {
    return (
      <>
        {obj.FaceLeftStoragePath ? (
          <>
            <Descriptions column={1}>
              <Descriptions.Item label="????????????">
                <Image
                  fallback={error}
                  src={
                    obj.FaceLeftStoragePath === "" ? (
                      <div>????????????</div>
                    ) : (
                      obj.FaceLeftStoragePath
                    )
                  }
                  key={obj.FaceLeftStoragePath}
                  style={{ width: "70%", minHeight: "100px" }}
                />
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={2}>
              <Descriptions.Item label="??????">{obj.Name}</Descriptions.Item>
              <Descriptions.Item label="??????">
                {obj.GenderCode}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">
                {obj.AgeLowerLimit}-{obj.AgeUpLimit}
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                {obj.IDType}
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                {obj.IDNumber}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearHat}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearGlasses}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearMask}
              </Descriptions.Item>
              {/* <Descriptions.Item label="????????????">
            <Radio.Group value={1}>
              <Space direction="vertical">
                <Radio value={1}>??????</Radio>
                <Radio value={2}>??????</Radio>
                <Radio value={3}>??????</Radio>
              </Space>
            </Radio.Group>
          </Descriptions.Item> */}
            </Descriptions>
          </>
        ) : (
          <Descriptions.Item label="????????????">
            <Image
              fallback={error}
              src={obj.FaceLeftStoragePath || leftImageData}
              key={obj.FaceLeftStoragePath || leftImageData}
              style={{ width: "70%", minHeight: "100px" }}
            />
          </Descriptions.Item>
        )}
      </>
    );
  };
  const renderRightPerson = obj => {
    return (
      <>
        {obj.FaceRightStoragePath ? (
          <>
            <Descriptions column={1}>
              <Descriptions.Item label="????????????">
                <Image
                  fallback={error}
                  src={
                    obj.FaceRightStoragePath === "" ? (
                      <div>????????????</div>
                    ) : (
                      obj.FaceRightStoragePath
                    )
                  }
                  key={obj.FaceRightStoragePath}
                  style={{ width: "70%", minHeight: "100px" }}
                />
              </Descriptions.Item>
            </Descriptions>
            <Descriptions column={2}>
              <Descriptions.Item label="??????">{obj.Name}</Descriptions.Item>
              <Descriptions.Item label="??????">
                {obj.GenderCode}
              </Descriptions.Item>
              <Descriptions.Item label="?????????">
                {obj.AgeLowerLimit}-{obj.AgeUpLimit}
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                {obj.IDType}
              </Descriptions.Item>
              <Descriptions.Item label="????????????">
                {obj.IDNumber}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearHat}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearGlasses}
              </Descriptions.Item>
              <Descriptions.Item label="???????????????">
                {obj.WearMask}
              </Descriptions.Item>
              {/* <Descriptions.Item label="????????????">
            <Radio.Group value={1}>
              <Space direction="vertical">
                <Radio value={1}>??????</Radio>
                <Radio value={2}>??????</Radio>
                <Radio value={3}>??????</Radio>
              </Space>
            </Radio.Group>
          </Descriptions.Item> */}
            </Descriptions>
          </>
        ) : (
          <Descriptions.Item label="????????????">
            <Image
              fallback={error}
              src={obj.FaceRightStoragePath || rightImageData}
              key={obj.FaceRightStoragePath || rightImageData}
              style={{ width: "70%", minHeight: "100px" }}
            />
          </Descriptions.Item>
        )}
      </>
    );
  };

  const renderCar = obj => {
    return (
      <>
        <Descriptions column={2}>
          <Descriptions.Item label="?????????">{obj.PlateNo}</Descriptions.Item>
          <Descriptions.Item label="????????????">
            {obj.PlateColor}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {obj.PlateClass}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {obj.VehicleClass}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {obj.VehicleBrand}
          </Descriptions.Item>
          <Descriptions.Item label="????????????">
            {obj.VehicleColor}
          </Descriptions.Item>
          <Descriptions.Item label="????????????????????????">
            {obj.UsingPropertiesCode}
          </Descriptions.Item>
        </Descriptions>
        <Descriptions column={1}>
          <Descriptions.Item label="????????????">
            <Image
              fallback={error}
              src={obj.StoragePath}
              key={obj.StoragePath}
              style={{ width: "70%", minHeight: "100px" }}
            />
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  };

  return (
    <Drawer
      width={600}
      placement="right"
      closable={false}
      onClose={onClose}
      visible={visible}
      className={styles.drawerDetail}
      destroyOnClose={false}
    >
      {type === "personLeft" ? (
        <>
          <Divider orientation="left" plain>
            ???????????????
          </Divider>
          {renderLeftPerson(data)}
        </>
      ) : (
        ""
      )}
      {type === "personRight" ? (
        <>
          <Divider orientation="left" plain>
            ???????????????
          </Divider>
          {renderRightPerson(data)}
        </>
      ) : (
        ""
      )}
      {type === "car" ? (
        <>
          <Divider orientation="left" plain>
            ??????????????????
          </Divider>
          {renderCar(data)}
        </>
      ) : (
        ""
      )}
    </Drawer>
  );
};

export default Detail;
