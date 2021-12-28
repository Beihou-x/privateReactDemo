import React, { Component, useEffect, useState } from "react";
import { Checkbox, Divider, Card } from "antd";
import DataBar from "./children/bar";
import PicBar from "./children/picBar";
import styles from "./index.less";
import Title from "@/components/Title";
const CheckboxGroup = Checkbox.Group;

const State = () => {
  // 全选,半选样式状态
  const [indeterminate, setIndeterminate] = React.useState(true);
  const [IDindeterminate, setIDIndeterminate] = useState(false);
  const [uploadIndeterminate, setUploadIndeterminate] = useState(false);
  const [picIndeterminate, setPicIndeterminate] = useState(false);
  // 全选change事件
  const onCheckAllChange =(e) => {
    if(e.target.checked) {
      const idList = IDdata.map((item) => item.value);
      setIdCheckedList(idList);
      const uploadList = uploadData.map((item) => item.value);
      setUploadCheckedList(uploadList);
      const imgList = imgData.map((item) => item.value);
      setImgCheckedList(imgList);
    }else {
      setIdCheckedList([]);
      setUploadCheckedList([]);
      setImgCheckedList([]);

    }
    setCheckAll(e.target.checked);
    setIndeterminate(false);
  }
  const idAllChange = (e) => {
    const list = IDdata.map((item) => item.value);
    setIdCheckedList(e.target.checked ? list : []);
    setIDIndeterminate(false);
    setIdChecked(e.target.checked);
  };
  const uploadAllChange = (e) => {
    const list = uploadData.map((item) => item.value);
    setUploadCheckedList(e.target.checked ? list : []);
    setUploadIndeterminate(false);
    setUploadCheck(e.target.checked);
  };
  const imgAllChange = (e) => {
    const list = imgData.map((item) => item.value);
    setImgCheckedList(e.target.checked ? list : []);
    setPicIndeterminate(false);
    setPicChecked(e.target.checked);
  };
  // 是否全选
  const [checkAll, setCheckAll] = React.useState(false);
  const [idCheck, setIdChecked] = useState(false);
  const [uploadCheck, setUploadCheck] = useState(false);
  const [picCheck, setPicChecked] = useState(false);


  // group选择
  const [idCheckedList, setIdCheckedList]: any = useState([]);
  const [uploadCheckedList, setUploadCheckedList]: any = useState([]);
  const [imgCheckedList, setImgCheckedList]: any = useState([]);
  const onIdGroupChange = (list) => {
    setIdCheckedList(list);
    setIDIndeterminate(!!list.length && list.length < IDdata.length);
    setIdChecked(list.length === IDdata.length);
  };
  const onUploadGroupChange = (list) => {
    setUploadCheckedList(list);
    setUploadIndeterminate(!!list.length && list.length < uploadData.length);
    setUploadCheck(list.length === uploadData.length);
  };
  const onImgGroupChange = (list) => {
    setImgCheckedList(list);
    setPicIndeterminate(!!list.length && list.length < imgData.length);
    setPicChecked(list.length === imgData.length);
  };
  const IDdata = [
    { label: "设备ID", value: "deviceId" },
    { label: "人脸ID", value: "faceId" },
    { label: "人员ID", value: "memberId" },
    { label: "车辆ID", value: "carId" },
  ];

  const uploadData = [
    { label: "人像卡口", value: "humanFace" },
    { label: "超级卡口", value: "super" },
  ];
  const imgData = [
    { label: "车辆大图", value: "carPic" },
    { label: "车辆", value: "car" },
    { label: "车辆型号", value: "carModel" },
    { label: "车牌", value: "carLicense" },
    { label: "主驾", value: "mainDriver" },
    { label: "副驾", value: "Co-pilot" },
    { label: "车型", value: "carType" },
    { label: "人脸", value: "face" },
    { label: "人员", value: "person" },
  ];
  return (
    <>
      <Card bordered={false} title="各版块数据抽检情况">
        {/* <Title title="各版块数据抽检情况" /> */}
        <div className={styles.check}>
          <span style={{ margin: "0 20px" }}>检测项:</span>
          <Checkbox indeterminate={indeterminate} checked={checkAll} onChange={onCheckAllChange}>
            全选
          </Checkbox>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "62%",
              paddingLeft: 100,
              margin: "20px 0",
            }}
          >
            <Checkbox
              indeterminate={IDindeterminate}
              onChange={idAllChange}
              checked={idCheck}
            >
              ID是否标准
            </Checkbox>
            <Checkbox
              indeterminate={uploadIndeterminate}
              onChange={uploadAllChange}
              checked={uploadCheck}
            >
              上传图片
            </Checkbox>
            <Checkbox
              indeterminate={picIndeterminate}
              onChange={imgAllChange}
              checked={picCheck}
            >
              图片是否存在
            </Checkbox>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <CheckboxGroup
              options={IDdata}
              value={idCheckedList}
              onChange={onIdGroupChange}
            />
            <CheckboxGroup
              options={uploadData}
              value={uploadCheckedList}
              onChange={onUploadGroupChange}
            />
            <CheckboxGroup
              options={imgData}
              value={imgCheckedList}
              onChange={onImgGroupChange}
            />
          </div>

          {/* <Tree checkable treeData={treeData}></Tree> */}
        </div>

        <div className={styles.bar}>
          <DataBar />
        </div>
      </Card>
      <Card
        bordered={false}
        title="各版块图片质量情况"
        style={{ marginTop: 24 }}
      >
        <div className={styles.bar}>
          <PicBar />
        </div>
      </Card>
    </>
  );
};
export default State;
