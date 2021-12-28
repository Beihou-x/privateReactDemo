import React, { useState, useEffect } from "react";
import { Input, DatePicker, Image, Divider, Descriptions } from "antd";
import StandardTable from "../../../components/Table";
import SearchForm from "../../../components/SearchForm";
import DrawerDetail from "./drawerDetail";

const { RangePicker } = DatePicker;
import { getTrackInfoMotorvehicle, trackinfofaceDetail } from "@/services/v1";
import moment from "moment";
import { formatTimestamp, getUrl } from "@/utils/utils";
import { registerCoordinateSystem } from "echarts";

const carForPerson = props => {
  const [visible, setVisible] = useState(false);
  const [type, setType] = useState("");
  const [data, setData]: any = useState({});
  const [carData, setCar]: any = useState({});
  const [dataObj, setObj]: any = useState({});
  const [leftImg, setLeftImg]: any = useState({});
  const [rightImg, setRightImg]: any = useState({});

  useEffect(() => {
    getImgUrl();
  }, []);

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };

  const onShow = (type, flag, id = "") => {
    setVisible(flag);
    setType(type);
    if (flag) {
      trackinfofaceDetail({ id }).then(res => {
        console.log("res===>", res);
        if (res) {
          setData(res);
        }
      });
    } else {
      setData({});
    }
  };
  const test = (val, record) => {
    console.log(val, record, "record");
  };
  // const error =
  //   "data:image/png;base64,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";
  const error = "暂无图片";
  const columns = [
    {
      dataIndex: "ShotTime",
      title: "抓拍时间",
      render: val =>
        moment(parseInt(val, 0) * 1000).format("YYYY-MM-DD HH:mm:ss"),
      align: "center",
    },
    {
      dataIndex: "DeviceID",
      title: "抓拍设备",
      align: "center",
    },
    // {
    //   dataIndex: "PlateNo",
    //   title: "车牌",
    // },
    {
      dataIndex: "FaceLeftStoragePath",
      title: "主驾驶",
      align: "center",
      render: (val, record) =>
        val ? (
          record.FaceLeftStoragePath ? (
            <img
              src={val}
              key={val}
              width={50}
              height={50}
              onClick={() => {
                onShow("personLeft", true, record.FaceLeftImageUID);
                setLeftImg(val);
              }}
              // onClick={() => test(val,record)}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        ),
    },
    {
      dataIndex: "FaceRightStoragePath",
      title: "副驾驶",
      align: "center",
      render: (val, record) =>
        val ? (
          record.FaceRightStoragePath ? (
            <img
              src={val}
              width={50}
              key={val}
              height={50}
              onClick={() => {
                onShow("personRight", true, record.FaceRightImageUID);
                setRightImg(val);
              }}
            />
          ) : (
            <></>
          )
        ) : (
          <></>
        ),
    },
    {
      dataIndex: "StoragePath",
      title: "车辆照片",
      align: "center",
      render: val =>
        val ? (
          <Image key={val} src={val} fallback={error} width={50} height={50} />
        ) : (
          <></>
        ),
    },
    {
      dataIndex: "PlateStoragepath",
      title: "车牌图片",
      align: "center",
      render: val =>
        val ? (
          <Image key={val} src={val} fallback={error} width={50} height={50} />
        ) : (
          <></>
        ),
    },
  ];

  const dateFormat = "YYYY-MM-DD HH:mm";
  return (
    <>
      <SearchForm
        initialValues={{
          ShotTimes: [moment().startOf("day"), moment(new Date(), dateFormat)],
        }}
        formList={[
          {
            label: "图片唯一标识",
            name: "ImageUID",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          // {
          //   label: "车牌号",
          //   name: "PlateNo",
          //   renderFormItem: () => <Input autoComplete="off" />,
          // },
          {
            label: "抓拍时间",
            name: "ShotTimes",
            renderFormItem: () => <RangePicker format={dateFormat} showTime />,
          },
        ]}
        onChange={() => {}}
      />
      {/* <Divider orientation="left" plain>
        车辆信息
      </Divider>
      <Descriptions column={5}>
        <Descriptions.Item label="车牌号">{carData.PlateNo}</Descriptions.Item>
        <Descriptions.Item label="车牌颜色">
          {carData.PlateColor}
        </Descriptions.Item>
        <Descriptions.Item label="号牌种类">
          {carData.PlateClass}
        </Descriptions.Item>
        <Descriptions.Item label="车辆类型">
          {carData.VehicleClass}
        </Descriptions.Item>
        <Descriptions.Item label="车辆品牌">
          {carData.VehicleBrand}
        </Descriptions.Item>
        <Descriptions.Item label="车身颜色">
          {carData.VehicleColor}
        </Descriptions.Item>
        <Descriptions.Item label="车辆使用性质代码">
          {carData.UsingPropertiesCode}
        </Descriptions.Item>
      </Descriptions> */}
      <Divider orientation="left" plain>
        车辆轨迹
      </Divider>

      <StandardTable
        columns={columns}
        services={async (params: any) => {
          const {
            ShotTimes = [
              moment(moment().startOf("day"), dateFormat),
              moment(new Date(), dateFormat),
            ],
          } = params;
          let date: any = null;
          if (ShotTimes && ShotTimes.length) {
            date = [
              formatTimestamp(ShotTimes[0]),
              formatTimestamp(ShotTimes[1]),
            ];
          }
          const response = await getTrackInfoMotorvehicle({
            ...params,
            ShotTimes: date,
          });

          if (response && response.obj) {
            setCar(response.obj);
          }

          return response;
        }}
        rowSelection={false}
      />
      {visible ? (
        <DrawerDetail
          visible={visible}
          type={type}
          onClose={() => onShow("", false)}
          data={data}
          leftImageData={leftImg}
          rightImageData={rightImg}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default carForPerson;
