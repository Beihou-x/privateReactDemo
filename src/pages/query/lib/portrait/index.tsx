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
  Popover,
} from "antd";
import { GoldOutlined, ClockCircleOutlined, FundOutlined } from "@ant-design/icons";
import { portraitFaceSearch, portraitDetail } from "@/services/v1";
import { getPersonCarCount, getPersonCarDelay } from "@/services/v2";
import {
  formatDate,
  getUrl,
  formatStartData,
  formatEndData,
  secondToTime,
  getLabelCategory
} from "@/utils/utils";
import styles from "./index.less";
import VForm from "@components/VForm";
import moment from "moment";

const PortraitFace = () => {
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
    form.validateFields().then((valid) => {
      setLoading(true);
      const params = {
        ...valid,
        showType: ["11"],
        offset: pageNum,
        limit: 10,
        shot_time:
          valid.shot_time && valid.shot_time.length > 0
            ? [formatStartData(valid.shot_time[0]), formatEndData(valid.shot_time[1])]
            : null,
      }
      portraitFaceSearch({
        ...params
      }).then((res) => {
        if (res) {
          setNextPage(res.hasNext);
          setTotal(res.total || 0);
          setList(res.items || []);
          setLoading(false);
        }
      });
      getPersonCarCount({
        type: "face",
        time: (moment().startOf("day").unix() - 24 * 3600).toString(),
        ...params
      }).then((res) => {
        setStatisticCount(res);
      });
    });
    // .catch(e => {});
  };

  const getImgUrl = async () => {
    const obj: any = await getUrl();
    if (obj) {
      setObj(obj);
    }
  };


  //查看,关闭 抽屉
  const showDrawer = (face_id) => {
    setLoading(true);
    setVisible(true);
    portraitDetail({
      id: face_id,
    }).then((res) => {
      if (res) {
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
      label: "设备编码",
      name: "device_id",
      type: "input",
    },
    {
      label: "采集地点",
      name: "device_name",
      type: "input",
    },
    {
      label: "采集时间",
      name: "shot_time",
      type: "rangePicker",
      format: "YYYY-MM-DD",
      allowClear: false,
      showTime: false,
      rules: [{ required: true }, { validator: handleTime }],
    },
  ];

  const initialValues = {
    shot_time: [
      moment().startOf("day"),
      moment(new Date(), "YYYY-MM-DD"),
    ],
  };

  return (
    <>
      <Card bordered={false} style={{ marginBottom: 10 }}>
        <div style={{ marginLeft: 35 }}>
          <GoldOutlined /> 数据总量：
          {(statisticCount && statisticCount.total) || 0}
          <FundOutlined style={{ marginLeft: 20 }} /> 当日新增：
          {(statisticCount && statisticCount.total1) || 0}
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
              span={5}
              initialValues={initialValues}
            >
              <div style={{ marginLeft: 34 }}>
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
                <Card style={{ margin: 20 }} className={styles["info-card"]}>
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
                  <a onClick={() => showDrawer(item.face_id)}>查看</a>
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
                设备信息
              </Divider>
              <Col span={12}>
                采集时间：
                {formatDate(detail.shot_time, "YYYY-MM-DD HH:mm:ss")}
              </Col>
              <Col span={12}>
                采集地点：
                {detail.place}
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
              <Col span={24}>详情照片： </Col>
              {imageData && imageData.length > 0 ? (
                imageData.map((m, index) => {
                  return (
                    <Row justify="space-between" key={index}>
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
    </>
  );
};

export default PortraitFace;
