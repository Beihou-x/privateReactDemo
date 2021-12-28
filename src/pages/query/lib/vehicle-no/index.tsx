import React, { useState, useEffect, useRef } from "react";
import {
  List,
  Card,
  Divider,
  Drawer,
  Row,
  Col,
  Button,
  Spin,
  Image,
} from "antd";
import { motorvehicleSearch, motorvehicleDetail } from "@/services/v1";
import {
  formatDate,
  getUrl,
  formatTime,
  formatEndData,
  filterCategory,
} from "@/utils/utils";
import styles from "./index.less";
import VForm from "@components/VForm";
import moment from "moment";

const Vehicle = () => {
  const [visible, setVisible] = useState(false);
  const [list, setList]: any = useState([]);
  const [detail, setDetail]: any = useState([]);
  const [imageData, setImageData]: any = useState([]);
  const childRef: any = useRef(null);
  const [dataObj, setObj]: any = useState({});
  const [pagination, setPagination]: any = useState({
    total: 0,
    pageSize: 10,
    pageNumber: 1,
    showSizeChanger: true,
    showQuickJumper: true,
    current: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImgUrl();
    initSearch();
  }, []);

  useEffect(() => {
    onSearch("page");
  }, [pagination.current, pagination.pageSize]);

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };

  //分页
  const onChange = (page, pageSize) => {
    // console.log(pagination);
    setPagination({ ...pagination, current: page, pageSize: pageSize });
  };

  //查看,关闭 抽屉
  const showDrawer = motorvehicle_id => {
    setLoading(true);
    setVisible(true);
    motorvehicleDetail({
      id: motorvehicle_id,
    }).then(res => {
      if (res) {
        // console.log("res--", res);
        setDetail(res);
        setImageData(res.sub_image_list || []);
        // common(res);
        setLoading(false);
      }
    });
  };

  // const common = res => {
  //   if (res) {
  //     let data: any = [];
  //     res.sub_image_list &&
  //       res.sub_image_list.map(n => {
  //         data.push(n.storage_path);
  //         console.log("data--", data);
  //       });
  //     setImageData(data);
  //   } else {
  //     setImageData([]);
  //   }
  // };

  const onClose = () => {
    setVisible(false);
    setDetail({});
  };

  //页面刷新即传当日时间参数,limit: 10,offset: 0,
  const initSearch = () => {
    setLoading(true);
    motorvehicleSearch({
      limit: 10,
      offset: 0,
      updated: [
        moment().startOf("day").unix().toString(),
        moment(new Date(), "YYYY-MM-DD HH:mm").unix().toString(),
      ],
      showType: ["02"],
    }).then(res => {
      if (res) {
        // console.log("res--", res);
        setList(res.items || []);
        setLoading(false);
      }
    });
  };
  // console.log("imageData--", imageData);

  //查询
  const onSearch = (type = "") => {
    setLoading(true);
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form.validateFields().then(valid => {
      // console.log("valid---", valid);
      motorvehicleSearch({
        ...valid,
        showType: ["02"],
        offset: type
          ? (pagination.current &&
              pagination.pageSize &&
              (pagination.current - 1) * pagination.pageSize) ||
            0
          : 0,
        limit: pagination.pageSize || 10,
        updated:
          valid.updated && valid.updated.length > 0
            ? [formatTime(valid.updated[0]), formatTime(valid.updated[1])]
            : null,
      }).then(res => {
        if (res) {
          setPagination({
            ...pagination,
            current: type ? pagination.current : 1,
            total: (res && res.total) || 0,
          });
          setList(res.items || []);
          setLoading(false);
        }
      });
    });
    // .catch(e => {});
  };

  //重置
  const onReset = async () => {
    const form = childRef.current.getForm();
    await form.resetFields();
    onSearch();
    setPagination({});
  };

  //搜索条件-采集时间范围校验
  const handleTime = (rules, value, callback) => {
    const days = value[1].diff(value[0], "day");
    // console.log("days--", days);
    if (days > 29) {
      return Promise.reject("时间选择范围不超过一个月");
    } else {
      return Promise.resolve();
    }
  };

  const columns = [
    {
      label: "区域",
      name: "source_id",
      type: "select",
      list: filterCategory("接入来源"),
    },
    {
      label: "采集地点",
      name: "place",
      type: "input",
    },
    // {
    //   label: "车牌",
    //   name: "plate_no",
    //   type: "input",
    // },
    {
      label: "采集时间",
      name: "updated",
      type: "rangePicker",
      allowClear: false,
      rules: [{ required: true }, { validator: handleTime }],
    },
    // {
    //   label: "质量",
    //   name: "id_number",
    //   type: "select",
    // },
  ];

  const initialValues = {
    updated: [moment().startOf("day"), moment(new Date(), "YYYY-MM-DD HH:mm")],
  };

  return (
    <Card bordered={false}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%" }}>
          <VForm
            columns={columns}
            ref={childRef}
            span={5}
            initialValues={initialValues}
          >
            <div style={{ marginLeft: 34 }}>
              <Button type="primary" onClick={() => onSearch()}>
                查询
              </Button>
              <Button style={{ marginLeft: 20 }} onClick={() => onReset()}>
                重置
              </Button>
            </div>
          </VForm>
        </div>
      </div>
      <Spin spinning={loading}>
        <List
          grid={{ gutter: 16, column: 5 }}
          pagination={{
            onChange,
            ...pagination,
          }}
          dataSource={list}
          renderItem={(item: any) => (
            <List.Item key={item}>
              <Card className={styles["info-card"]} style={{ margin: 20 }}>
                {item.storage_path ? (
                  <Image
                    src={item.storage_path}
                    key={item.storage_path}
                    width={200}
                    height={170}
                  />
                ) : (
                  <div className={styles.error}>暂无图片</div>
                )}
                <p>{item.device_id ? item.device_id : "--"}</p>
                {/* <p>{item.place}</p> */}
                <p>{formatDate(item.updated, "YYYY-MM-DD HH:mm:ss")}</p>
                <Divider type="horizontal" />
                <a onClick={() => showDrawer(item.motorvehicle_id)}>查看</a>
              </Card>
            </List.Item>
          )}
        />
      </Spin>
      <Drawer
        title="详细信息"
        placement="right"
        closable={false}
        onClose={() => onClose()}
        visible={visible}
        className={styles.drawer}
        width={820}
        destroyOnClose={true}
      >
        <Spin spinning={loading}>
          <Row className={styles.row}>
            <Divider orientation="left" plain>
              过车信息
            </Divider>
            <Col span={12}>采集地点：{detail.place}</Col>
            <Col span={12}>
              过车时间：
              {formatDate(detail.pass_time, "YYYY-MM-DD HH:mm:ss")}
            </Col>
            <Col span={12}>设备编码：{detail.device_id}</Col>
            <Col span={12}>车道号： {detail.lane_no}</Col>
            <Col span={12}>行驶速度： {detail.speed}</Col>
            <Col span={12}>行驶方向： {detail.direction}</Col>
            <Divider orientation="left" plain>
              基础信息
            </Divider>
            {/* <Col span={12}>车牌号： {detail.plate_no}</Col> */}
            <Col span={12}>车牌颜色： {detail.plate_color}</Col>
            <Col span={12}>号牌种类： {detail.plate_class}</Col>
            <Col span={12}>
              车辆类型：
              {detail.vehicle_class}
            </Col>
            <Col span={12}>车辆品牌： {detail.vehicle_brand}</Col>
            <Col span={12}>车身颜色： {detail.vehicle_color}</Col>
            <Col span={12}>
              车辆使用性质代码：
              {detail.using_properties_code}
            </Col>
            <Col span={12}>有无车牌： {detail.has_plate}</Col>
            <Col span={12}>是否套牌： {detail.is_decked}</Col>
            <Col span={12}>是否涂改： {detail.is_altered}</Col>
            <Col span={12}>是否遮挡： {detail.is_covered}</Col>
            <Col span={12}>遮阳板状态： {detail.sunvisor}</Col>
            <Col span={12}>安全带状态： {detail.safety_belt}</Col>
            <Col span={12}>打电话状态： {detail.calling}</Col>
            <Col span={24}>详情照片： </Col>
            {imageData && imageData.length > 0 ? (
              imageData.map(m => {
                return (
                  <Row justify="space-between">
                    <Col>
                      <Image
                        src={m.storage_path}
                        key={m.storage_path}
                        style={{
                          height: 200,
                          width: 250,
                          paddingRight: 10,
                        }}
                      />
                      {m.type && m.type === "01" ? <p>车辆大图</p> : ""}
                      {m.type && m.type === "02" ? <p>车辆彩色小图</p> : ""}
                      {m.type && m.type === "03" ? <p>车辆车辆二值化图</p> : ""}
                      {m.type && m.type === "04" ? <p>驾驶员面部特征图</p> : ""}
                      {m.type && m.type === "05" ? <p>副驾驶面部特征图</p> : ""}
                      {m.type && m.type === "06" ? <p>车标</p> : ""}
                      {m.type && m.type === "07" ? <p>违章合成图</p> : ""}
                      {m.type && m.type === "08" ? <p>过车合成图</p> : ""}
                      {m.type && m.type === "09" ? <p>车辆特写图</p> : ""}
                      {m.type && m.type === "10" ? <p>人员图</p> : ""}
                      {m.type && m.type === "11" ? <p>人脸图</p> : ""}
                      {m.type && m.type === "12" ? <p>非机动车图</p> : ""}
                      {m.type && m.type === "13" ? <p>物品图</p> : ""}
                      {m.type && m.type === "14" ? <p>场景图</p> : ""}
                      {m.type && m.type === "100" ? <p>一般图片</p> : ""}
                    </Col>
                  </Row>
                );
              })
            ) : (
              <div>暂无图片</div>
            )}
          </Row>
        </Spin>
      </Drawer>
    </Card>
  );
};

export default Vehicle;
