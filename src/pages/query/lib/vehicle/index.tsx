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
  Popover
} from "antd";
import { motorvehicleSearch, motorvehicleDetail } from "@/services/v1";
import { getPersonCarCount, getPersonCarDelay } from "@/services/v2";
import { GoldOutlined, ClockCircleOutlined, FundOutlined } from "@ant-design/icons";
import {
  formatDate,
  getUrl,
  getLabelCategory,
  formatStartData,
  formatEndData,
  secondToTime
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
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(0);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [statisticCount, setStatisticCount]: any = useState({});

  useEffect(() => {
    getImgUrl();
    onSearch();

  }, []);

  //查询
  const onSearch = (pageNum = 0) => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form.validateFields().then(valid => {
      setLoading(true);
      const params = {
        ...valid,
        showType: ["02"],
        offset: pageNum,
        limit: 10,
        pass_time:
          valid.pass_time && valid.pass_time.length > 0
            ? [formatStartData(valid.pass_time[0]), formatEndData(valid.pass_time[1])]
            : null,
      }
      motorvehicleSearch({
        ...params
      }).then(res => {
        if (res) {
          setNextPage(res.hasNext);
          setTotal(res.total || 0);
          setList(res.items || []);
          setLoading(false);
        }
      });
      getPersonCarCount({
        type: 'motor',
        time: (moment().startOf("day").unix() - 24 * 3600).toString(),
        ...params
      }).then(res => {
        setStatisticCount(res);
      })
    });
  };

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };

  //查看,关闭 抽屉
  const showDrawer = motorvehicle_id => {
    setLoading(true);
    setVisible(true);
    motorvehicleDetail({
      id: motorvehicle_id,
    }).then(res => {
      if (res) {
        setDetail(res);
        setImageData(res.sub_image_list || []);
        // common(res);
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
    motorvehicleSearch({
      limit: 10,
      offset: 0,
      pass_time: [
        moment().startOf("day").unix().toString(),
        moment(new Date(), "YYYY-MM-DD HH:mm").unix().toString(),
      ],
      showType: ["02"],
    }).then(res => {
      if (res) {
        setList(res.items || []);
        setLoading(false);
      }
    });

  };

  //重置
  const onReset = async () => {
    const form = childRef.current.getForm();
    await form.resetFields();
    handleSearchChangeCurrent(0);
  };

  // 查询
  const handleSearchChangeCurrent = (pageNum = 0) => {
    setCurrent(pageNum);
    onSearch(pageNum);
  }


  //搜索条件-采集时间范围校验
  const handleTime = (rules, value, callback) => {
    const days = value[1].diff(value[0], "day");
    if (days > 29) {
      return Promise.reject("时间选择范围不超过一个月");
    } else {
      return Promise.resolve();
    }
  };



  const columns = [
    {
      label: "区域",
      name: "place",
      type: "select",
      list: getLabelCategory("区域"),
    },
    {
      label: "采集地点",
      name: "device_name",
      type: "input",
    },
    {
      label: "设备编码",
      name: "device_id",
      type: "input"
    },
    {
      label: "车牌",
      name: "plate_no",
      type: "input",
    },
    {
      label: "采集时间",
      name: "pass_time",
      type: "rangePicker",
      format: "YYYY-MM-DD",
      allowClear: false,
      showTime: false,
      rules: [{ required: true }, { validator: handleTime }],
    },
    // {
    //   label: "质量",
    //   name: "id_number",
    //   type: "select",
    // },
  ];

  const initialValues = {
    pass_time: [moment().startOf("day"), moment(new Date(), "YYYY-MM-DD")],
  };

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <div style={{ marginLeft: 35 }}>
          <GoldOutlined /> 数据总量：{statisticCount && statisticCount.total || 0}
          <FundOutlined style={{ marginLeft: 20 }} /> 当日新增：{statisticCount && statisticCount.total1 || 0}
          <ClockCircleOutlined style={{ marginLeft: 20 }} /> 统计时间：
          {(statisticCount && statisticCount.updated_at) && formatDate(statisticCount.updated_at, 'YYYY-MM-DD HH:mm:ss') || '-'}
          {/* <Popover content={secondToTime(delayData[0] && delayData[0].sub_time || 0)}>
          <span style={{marginLeft: 20}}>
            延迟状态 : &nbsp;
          </span>
          <span
            className={styles.circle}
            style={{
              backgroundColor: (delayData[0] && delayData[0].state) || "#fff",
            }}
          ></span>
        </Popover> */}
        </div>
      </Card>
      <Card bordered={false}>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <VForm
              columns={columns}
              ref={childRef}
              span={4}
              layoutCol={formLayout}
              initialValues={initialValues}
            >
              <div style={{ marginLeft: 20 }}>
                <Button type="primary" onClick={() => handleSearchChangeCurrent()}>
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
                  <p>
                    <span>
                      {formatDate(item.shot_time, "YYYY-MM-DD HH:mm:ss")}
                    </span>
                    {
                      item.state === "red" ?
                        <Popover content={`延迟时间: ${secondToTime(item.sub_time || 0)}`}>
                          &nbsp;&nbsp;
                          <span className={styles.exclamation}>!</span>
                        </Popover>
                        : ''
                    }
                  </p>
                  <Divider type="horizontal" />
                  <a onClick={() => showDrawer(item.motorvehicle_id)}>查看</a>
                </Card>
              </List.Item>
            )}
          />
        </Spin>
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
            onClick={() => {
              handleSearchChangeCurrent(current + 1)
            }
            }
          >
            下一页
          </Button>
        </div>
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
              <Col span={12}>
                <span>
                  入库时间：{formatDate(detail.updated, "YYYY-MM-DD HH:mm:ss")}
                </span>
                {
                  detail.shot_time - detail.updated > 24 * 3600 ?
                    <Popover content={`延迟时间: ${secondToTime(detail.shot_time - detail.updated || 0)}`}>
                      &nbsp;&nbsp;
                      <span className={styles.exclamation}>!</span>
                    </Popover>
                    : ""
                }
              </Col>

              {/* <Col span={12}>车道号： {detail.lane_no}</Col>
            <Col span={12}>行驶速度： {detail.speed}</Col>
            <Col span={12}>行驶方向： {detail.direction}</Col> */}
              <Divider orientation="left" plain>
                基础信息
              </Divider>
              <Col span={12}>车牌号： {detail.plate_no}</Col>
              <Col span={12}>车牌颜色： {detail.plate_color}</Col>
              <Col span={12}>号牌种类： {detail.plate_class}</Col>
              {/* <Col span={12}>
              车辆类型：
              {detail.vehicle_class}
            </Col> */}
              {/* <Col span={12}>车辆品牌： {detail.vehicle_brand}</Col>
            <Col span={12}>车身颜色： {detail.vehicle_color}</Col> */}
              {/* <Col span={12}>
              车辆使用性质代码：
              {detail.using_properties_code}
            </Col> */}
              <Col span={12}>有无车牌： {detail.has_plate}</Col>
              {/* <Col span={12}>是否套牌： {detail.is_decked}</Col>
            <Col span={12}>是否涂改： {detail.is_altered}</Col>
            <Col span={12}>是否遮挡： {detail.is_covered}</Col> */}
              {/* <Col span={12}>遮阳板状态： {detail.sunvisor}</Col> */}
              {/* <Col span={12}>安全带状态： {detail.safety_belt}</Col>
            <Col span={12}>打电话状态： {detail.calling}</Col> */}
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
                        {/* <Popover content={secondToTime(m.sub_time || 0)}>
                        <div>
                          <span>
                            延迟状态 : &nbsp;
                          </span>
                          <span
                            className={styles.circle}
                            style={{
                              backgroundColor: (m.state) || "#fff",
                            }}
                          ></span>
                        </div>
                      </Popover> */}
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
    </>
  );
};

export default Vehicle;
