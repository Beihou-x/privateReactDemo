import React, { useState, useEffect, useRef } from "react";
import {
  List,
  Card,
  Divider,
  Drawer,
  Row,
  Col,
  Button,
  Image,
  Spin,
} from "antd";
import { personSearch, personDetail } from "@/services/v1";
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

const Person = () => {
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
  const showDrawer = person_id => {
    setLoading(true);
    setVisible(true);
    personDetail({
      id: person_id,
    }).then(res => {
      if (res) {
        // console.log("res--", res);
        setDetail(res);
        setImageData(res.sub_image_list || []);
        setLoading(false);
      }
    });
  };

  const onClose = () => {
    setVisible(false);
    setDetail({});
  };

  //页面刷新即传当日时间参数,limit: 10,offset: 0,
  const initSearch = () => {
    setLoading(true);
    personSearch({
      limit: 10,
      offset: 0,
      updated: [
        moment().startOf("day").unix().toString(),
        moment(new Date(), "YYYY-MM-DD HH:mm").unix().toString(),
      ],
      showType: ["10"],
    }).then(res => {
      if (res) {
        // console.log("res--", res);
        setList(res.items || []);
        setLoading(false);
      }
    });
  };

  //查询
  const onSearch = (type = "") => {
    setLoading(true);
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form.validateFields().then(valid => {
      // console.log("valid---", valid);
      personSearch({
        ...valid,
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
        showType: ["10"],
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
      label: "设备编码",
      name: "device_id",
      type: "input",
    },
    // {
    //   label: "姓名",
    //   name: "name",
    //   type: "input",
    // },
    {
      label: "采集时间",
      name: "updated",
      type: "rangePicker",
      allowClear: false,
      rules: [{ required: true }, { validator: handleTime }],
    },
    {
      label: "采集地点",
      name: "place",
      type: "input",
    },
    // {
    //   label: "证件号码",
    //   name: "id_number",
    //   type: "input",
    // },
    // {
    //   label: "证件类型",
    //   name: "id_type",
    //   type: "select",
    //   list: filterCategory("证件类型"),
    // },
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
          renderItem={(item: any) => (
            <List.Item key={item}>
              <Card className={styles["info-card"]}>
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
                <a onClick={() => showDrawer(item.person_id)}>查看</a>
              </Card>
            </List.Item>
          )}
          dataSource={list}
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
              设备信息
            </Divider>
            <Col span={12}>
              采集时间：
              {formatDate(detail.person_appear_time, "YYYY-MM-DD HH:mm:ss")}
            </Col>
            <Col span={12}>
              采集地点：
              {detail.place}
            </Col>
            <Col span={24}>设备编码：{detail.device_id}</Col>
            {/* <Divider orientation="left" plain>
              人像信息
            </Divider>
            <Col span={12}>姓名：{detail.name}</Col>
            <Col span={12}>性别：{detail.gender_code}</Col>
            <Col span={12}>
              年龄段：{detail.age_lower_limit}~{detail.age_up_limit}
            </Col>
            <Col span={12}>证件类型：{detail.id_type}</Col>
            <Col span={12}>证件号码：{detail.id_number}</Col> */}
            <Col span={24}>详情照片：</Col>
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
                      {m.type && m.type === "08" ? <p>过会测合成图</p> : ""}
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

export default Person;
