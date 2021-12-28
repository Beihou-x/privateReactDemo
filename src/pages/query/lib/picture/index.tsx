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
import { imagesSearch } from "@/services/v1";
import { formatDate, getUrl, formatStartData, formatTime } from "@/utils/utils";
import styles from "./index.less";
import VForm from "@components/VForm";
import moment from "moment";

const PictureQuery = () => {
  const childRef: any = useRef(null);
  const [visible, setVisible] = useState(false);
  const [list, setList]: any = useState([]);
  const [dataObj, setObj]: any = useState({});
  const [item, setItem]: any = useState({});
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

  //查看,关闭 抽屉
  const showDrawer = item => {
    setVisible(true);
    setItem(item);
  };

  const onClose = () => {
    setVisible(false);
    setItem({});
  };

  //分页
  const onChange = (page, pageSize) => {
    // console.log(pagination);
    setPagination({ ...pagination, current: page, pageSize: pageSize });
  };

  //页面刷新即传当日时间参数,limit: 10,offset: 0,
  useEffect(() => {
    setLoading(true);
    imagesSearch({
      offset: 0,
      limit: 10,
      updated: [
        moment().startOf("day").unix().toString(),
        moment(new Date(), "YYYY-MM-DD HH:mm").unix().toString(),
      ],
    }).then(res => {
      if (res) {
        setPagination({
          ...pagination,
          total: (res && res.total) || 0,
        });
        setList(res.items || []);
        setLoading(false);
      }
    });
  }, []);

  //查询
  const onSearch = (type = "") => {
    setLoading(true);
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then(valid => {
        // console.log("valid---", valid);
        imagesSearch({
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
        }).then(res => {
          if (res) {
            setList(res.items || []);
            setPagination({
              ...pagination,
              current: type ? pagination.current : 1,
              total: (res && res.total) || 0,
            });
            setLoading(false);
          }
        });
      })
      .catch(e => {});
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
    // {
    //   label: "区域",
    //   name: "name",
    //   type: "select",
    //   list: [{ value: "市局", label: "市局" }],
    // },
    {
      label: "采集时间",
      name: "updated",
      type: "rangePicker",
      allowClear: false,
      rules: [{ required: true }, { validator: handleTime }],
    },
  ];

  const initialValues = {
    updated: [moment().startOf("day"), moment(new Date(), "YYYY-MM-DD HH:mm")],
  };

  return (
    <Card bordered={false}>
      <div style={{ display: "flex" }}>
        <div style={{ width: "100%", marginRight: 20 }}>
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
                <a onClick={() => showDrawer(item)}>查看</a>
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
            <Col span={12}>抓拍地点：{item.place}</Col>
            <Col span={12}>
              抓拍时间：
              {formatDate(item.shot_time, "YYYY-MM-DD HH:mm:ss")}
            </Col>
            <Col span={12}>设备编码：{item.device_id}</Col>
            <Col span={12}>事件排序：{item.event_sort}</Col>
            <Col span={12}>图片类型：{item.type}</Col>
            <Col span={12}>文件格式：{item.file_format}</Col>
            <Col span={12}>长度：{item.width}</Col>
            <Col span={12}>高度：{item.height}</Col>
            <Col span={12}>
              更新时间：
              {formatDate(item.updated, "YYYY-MM-DD HH:mm:ss")}
            </Col>
            <Col span={24}>
              详情照片：
              <Col span={24}>
                {item.storage_path ? (
                  <>
                    <Image
                      src={item.storage_path}
                      style={{ height: 200, width: 200 }}
                    />
                    <p>{item.type}</p>
                  </>
                ) : (
                  <div>暂无图片</div>
                )}
              </Col>
            </Col>
          </Row>
        </Spin>
      </Drawer>
    </Card>
  );
};

export default PictureQuery;
