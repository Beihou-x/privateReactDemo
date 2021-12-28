import React, { useState, useEffect } from "react";
import { Card, List, Spin,Button } from "antd";
import { useHistory } from "react-router";
import styles from "./index.less";
import { LeftCircleOutlined } from "@ant-design/icons";
import { deviceImageSearch } from "@/services/v2";
import moment from "moment";
import { formatDate } from "@/utils/utils";
const Detail = props => {


  const history = useHistory();
  const [data, setData]: any = useState([]);
  const [listLoading, setListLoading]: any = useState(false);
  const [current, setCurrent] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    match: { params },
  } = props;
  const { id } = params;

  useEffect(() => {
    fetchImage();
  }, []);

  const fetchImage = async (pageNum = 1) => {
    setListLoading(true);
    const response = await deviceImageSearch({
      device_id: id,
      // start: moment()
      //   .week(moment().week())
      //   .startOf("week")
      //   .format("YYYYMMDDHHmmss"),
      start: moment().startOf("day").format("YYYYMMDDHHmmss"),
      end: moment(new Date()).endOf("day").format("YYYYMMDDHHmmss"),
      page_size: 10,
      page_num: pageNum,
    });
    setData((response && response.results) || []);
    setNextPage(response && response.has_next || false);
    setListLoading(false);
  };

  const handleSearchChangeCurrent = (pageNum = 1) => {
    setCurrent(pageNum);
    fetchImage(pageNum)
  }

  return (
    <Card
      bordered={false}
      title="检测失败图片列表"
      extra={
        <a onClick={() => history.goBack()} className={styles.iconImg}>
          <LeftCircleOutlined /> 返回列表
        </a>
      }
    >
      <Spin spinning={listLoading}>
        <List
          grid={{
            gutter: 16,
            // xs: 1,
            // sm: 2,
            // md: 4,
            // lg: 4,
            // xl: 6,
            // xxl: 3,
            column: 5
          }}
          dataSource={data}
          renderItem={(item: any) => (
            <List.Item>
              <Card className={styles.imgItem} key={item.image_id}>
                <img src={item.url} alt="" />
                <div>{formatDate(item.capture_at,'YYYY-MM-DD HH:mm:ss')}</div>
              </Card>
            </List.Item>
          )}
          // pagination={{
          //   position: "bottom",
          //   showTotal: total => `共${total}条`,
          //   showSizeChanger: true,
          //   onChange: onChangePage,
          // }}
        />
      </Spin>
      <div className={styles.pageButtons}>
        {/* <span>共{total || 0}条</span> */}
        <Button type="primary" disabled={current === 1} onClick={() => handleSearchChangeCurrent()}>
          返回首页
        </Button>
        <Button
          type="primary"
          disabled={current === 1}
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
    </Card>
  );
};

export default Detail;
