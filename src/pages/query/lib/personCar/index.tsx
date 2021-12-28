import React, { useState, useEffect, useRef } from "react";
import { Input, Card, DatePicker, Button, Image } from "antd";
import { motorvehicleSearch } from "@/services/v2";
import {
  formatDate,
  formatStartData,
  formatEndData,
} from "@/utils/utils";
import moment from "moment";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import styles from "./index.less";

const { RangePicker } = DatePicker;

const PersonCar = () => {
  const [type, setType] = useState('motor')
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const refTable: any = useRef(null);

  // 返回首页
  const handleFormReset = async () => {
    await setCurrent(0);
  }

  const dateFormat = "YYYY-MM-DD HH:mm";
  const columns = [
    {
      title: "抓拍时间",
      dataIndex: "ShotTime",
      width: 200,
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.ShotTime, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "抓拍设备编码",
      dataIndex: "DeviceID",
      width: 200,
      align: "center",
    },
    {
      title: "抓拍设备点位",
      dataIndex: "DeviceName",
      width: 200,
      align: "center",
    },
    {
      title: "车辆图片",
      dataIndex: "StoragePath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
    {
      title: "车牌号",
      dataIndex: "PlateNo",
      width: 200,
      align: "center",
    },
    {
      title: "车牌图片",
      dataIndex: "PlateStoragepath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
    {
      title: "主驾图片",
      dataIndex: "FaceLeftStoragePath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
    {
      title: "副驾图片",
      dataIndex: "FaceRightStoragePath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
  ]
  const columns1 = [
    {
      title: "抓拍时间",
      dataIndex: "ShotTime",
      width: 200,
      align: "center",
      render: (val, record) => (
        <span>
          {formatDate(record && record.ShotTime, "YYYY-MM-DD HH:mm:ss")}
        </span>
      ),
    },
    {
      title: "抓拍设备编码",
      dataIndex: "DeviceID",
      width: 200,
      align: "center",
    },
    {
      title: "抓拍设备点位",
      dataIndex: "DeviceName",
      width: 200,
      align: "center",
    },
    {
      title: "人像图片",
      dataIndex: "StoragePath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
    {
      title: "车辆图片",
      dataIndex: "MotorvehicleStoragePath",
      width: 100,
      align: "center",
      render: val => val ? <Image key={val} src={val} style={{ width: 80, height: 80 }} /> : ''
    },
    {
      title: "是否主驾",
      dataIndex: "IsFaceLeft",
      width: 100,
      align: "center",
    },
    {
      title: "是否副驾",
      dataIndex: "IsFaceRight",
      width: 100,
      align: "center",
    },
  ]

  // 查询
  const handleSearchChangeCurrent = (pageNum = 0) => {
    setCurrent(pageNum);
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch({ limit: 10, offset: pageNum });
  }
  return (
    <Card bordered={false}>
      <SearchForm
        initialValues={{
          ShotTimes: [
            moment().startOf("day"),
            moment().endOf("day"),
          ],
        }}
        formList={[
          {
            label: "图片ID",
            name: "ImageUID",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "车牌号",
            name: "PlateNo",
            renderFormItem: () => <Input autoComplete="off" />,
          },
          {
            label: "抓拍时间",
            name: "ShotTimes",
            renderFormItem: () => <RangePicker format={'YYYY-MM-DD'} showTime={false} />,
          }
        ]}
        onChange={() => { }}
      />
      <div style={{ marginTop: 18 }}></div>
      <StandardTable
        ref={refTable}
        columns={type === 'motor' ? columns : columns1}
        rowSelection={false}

        services={async (params: any) => {
          const {
            ShotTimes = [
              moment(moment().startOf("day"), dateFormat),
              moment(moment().endOf("day"), dateFormat),
            ],
          } = params;
          let date: any = null;
          if (ShotTimes && ShotTimes.length) {
            date = [
              formatStartData(ShotTimes[0]),
              formatEndData(ShotTimes[1]),
            ];
          }
          const response = await motorvehicleSearch({
            ...params,
            ShotTimes: date,
          });
          if (response) {
            setType(response.obj)
            setNextPage(response.hasNext)
          }
          console.log('response==', response)
          return response;
        }}
        tableProps={{
          pagination: false,
        }}
      />
      <div className={styles.pageButtons}>
        {/* <span>共{total || 0}条</span> */}
        <Button type="primary" onClick={() => handleSearchChangeCurrent()}>
          返回首页
        </Button>
        <Button
          type="primary"
          disabled={current === 0}
          onClick={() => { handleSearchChangeCurrent(current - 1) }
          }
        >
          上一页
        </Button>

        <Button
          type="primary"
          disabled={!nextPage}
          onClick={() => { handleSearchChangeCurrent(current + 1) }
          }
        >
          下一页
        </Button>
      </div>
    </Card>
  );
};

export default PersonCar;
