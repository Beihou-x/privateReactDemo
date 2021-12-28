import React, { useRef, useState, useEffect } from "react";
import { Modal, message, Table, Button,Spin,List } from "antd";
import moment from "moment";
import StandardTable from "@components/Table";
import { carFaceDetail, sampleDetail, deviceImageSearch } from "@/services/v2";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { formatDate, format,getDeviceStatus } from "@/utils/utils";
import styles from "./Modal.less";
const VModal = (props) => {
  const { modalVisible, handleModalVisible, tableParams } = props;
  const [deviceIds, setDeviceIds] = useState("");
  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [sampleData, setSampleData]: any = useState([]);
  const [imgList, setImgList]: any = useState([]);
  // 小图分页使用
  const [current, setCurrent] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  // 保存device_id 用于默认传参
  const [deviceId, setDeviceId] = useState("");

  const handleCancel = () => {
    handleModalVisible && handleModalVisible(false);
  };

  const handleCancel1 = () => {
    setVisible1(false);
    setSampleData([]);
  };
  const handleCancel2 = () => {
    // 取消弹框时候清空current
    setCurrent(1)
    setVisible2(false);
  };

  // 异常原因详情
  const simpleDetail = (device_id) => {
    setVisible1(true);
    setLoading1(true);
    sampleDetail({ device_id }).then((res) => {
      setLoading1(false);
      setSampleData(res || []);
    });
  };
  // 小图不合格数详情
  const abnormalDetail = (params=deviceId,pageNum=0) => {
    setVisible2(true)
    setLoading2(true)
    setDeviceId(params)
    deviceImageSearch({
      device_id:params,
      start: moment(Number(tableParams.start)*1000).format("YYYYMMDDHHmmss"),
      end: moment(Number(tableParams.end)*1000).format("YYYYMMDDHHmmss"),
      page_num:pageNum,
      page_size:10
    }).then((res) => {
      setImgList((res && res.results) || [])
      setNextPage(res && res.has_next || false);
      setLoading2(false)
    });
  };
  const getTableData = (res) => {
    setDeviceIds(
      (Array.isArray(res) ? res : []).map((item) => item.device_id).toString()
    );
  };

  const handleSearchChangeCurrent = (pageNum=1) => {
    setCurrent(pageNum);
    abnormalDetail(deviceId,pageNum)
  }

  const c =
    tableParams.type === "data_complete"
      ? [
          {
            dataIndex: "un_complete_num",
            title: "不完整数据量",
            align: "center",
            render: (val, record) => (
              <a onClick={() => simpleDetail(record.device_id)}>{val}</a>
            ),
          },
        ]
      : [];
  const c1 =
    tableParams.type === "image_visit_abnormal"
      ? [
          {
            dataIndex: "check_status",
            title: "检查总数",
            align: "center",
          },
          {
            dataIndex: "check_status",
            title: "不可用图片数",
            align: "center",
          },
        ]
      : [];
  const c2 =
    tableParams.type === "little_vail"
      ? [
          {
            dataIndex: "face_count_declear",
            title: "检查总数",
            align: "center",
          },
          {
            dataIndex: "face_count_not_valid",
            title: "不合格数",
            align: "center",
            render: (val, record) => (
              <a
                onClick={() =>
                  abnormalDetail(record.device_id)
                }
              >
                查看详情
              </a>
            ),
            // render: (val, record) => <Link to={`/device/wx_access_device/detect/wx_small_pic_qualified_detect_detail/${record && record.device_id}`}>{val}</Link>,
          },
        ]
      : [];
  const c3 =
    tableParams.type === "data_delay"
      ? [
          {
            dataIndex: "request_at",
            title: "采样时间",
            align: "center",
            render: (val) => (
              <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
            ),
          },
          {
            dataIndex: "a3",
            title: "最大延迟时间",
            align: "center",
            render: (val, record) => (
              <span>
                {record.request_at && record.capture_at
                  ? Number(record.request_at) - Number(record.capture_at)
                  : ""}
              </span>
            ),
          },
        ]
      : [];
  const c4 =
    tableParams.type === "data_upside_down"
      ? [
          {
            dataIndex: "request_at",
            title: "采样时间",
            align: "center",
            render: (val) => (
              <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>
            ),
          },
          {
            dataIndex: "a3",
            title: "最大倒挂时间",
            align: "center",
            render: (val, record) => (
              <span>
                {record.capture_at && record.request_at
                  ? Number(record.capture_at) - Number(record.request_at)
                  : ""}
              </span>
            ),
          },
        ]
      : [];
  const columns: any = [
    {
      dataIndex: "device_id",
      title: "设备编码",
      align: "center",
    },
    {
      dataIndex: "alias",
      title: "设备名称",
      align: "center",
    },
    {
      dataIndex: "function_type",
      title: "设备类型",
      align: "center",
    },
    {
      dataIndex: "source",
      title: "来源",
      align: "center",
    },
    {
      dataIndex: "sync_status",
      title: "设备状态",
      align: "center",
      render: (val) => <span>{getDeviceStatus(val)}</span>,
    },
    ...c,
    ...c1,
    ...c2,
    ...c3,
    ...c4,
  ];

  const sampleColumns: any = [
    {
      dataIndex: "request_at",
      title: "抽检时间",
      align: "center",
      render: (val) => <span>{formatDate(val, "YYYY-MM-DD HH:mm:ss")}</span>,
    },
    {
      dataIndex: "message",
      title: "异常原因",
      align: "center",
    },
  ];

  // 小图合格检测
  const abnormalColumns: any = [
    {
      title: "设备编码",
      dataIndex: "device_id",
      align: "center",
    },
    {
      title: "设备名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "设备类型",
      dataIndex: "function_type",
      align: "center",
    },
    {
      title: "是否注册一机一档",
      dataIndex: "is_online",
      align: "center",
    },
    {
      title: "检查总数",
      dataIndex: "face_count_declear",
      align: "center",
      render: (val) => <span>{val || 0}</span>,
    },
    {
      title: "合格数",
      dataIndex: "face_count_valid",
      align: "center",
      render: (val) => <span>{val || 0}</span>,
    },
    // {
    //   title: "不合格数",
    //   dataIndex: "face_count_un_valid",
    //   width: 100,
    //   ellipsis: true,
    // },
    {
      title: "合格率",
      dataIndex: "valid_quality",
      align: "center",
      render: (val) => format(val) + "%",
    },
  ];
  return (
    <Modal
      maskClosable={false}
      title={"异常设备"}
      width={1400}
      visible={modalVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          取消
        </Button>,
      ]}
    >
      <CopyToClipboard
        text={deviceIds}
        onCopy={() => message.success("复制成功", 10)}
      >
        <Button
          disabled={!deviceIds}
          type="primary"
          style={{ marginBottom: 20 }}
        >
          复制当前页异常设备ID
        </Button>
      </CopyToClipboard>
      <StandardTable
        columns={columns}
        services={(params) => {
          return carFaceDetail({
            ...params,
            ...tableParams,
          });
        }}
        getTableData={getTableData}
      />

      <Modal
        maskClosable={false}
        title={"不完整数据信息"}
        width={800}
        visible={visible1}
        onCancel={handleCancel1}
        footer={[
          <Button key="back" onClick={handleCancel1}>
            取消
          </Button>,
        ]}
      >
        <Table
          loading={loading1}
          bordered
          dataSource={sampleData}
          rowKey="id"
          columns={
            tableParams.type === "data_complete"
              ? sampleColumns
              : abnormalColumns
          }
        />
      </Modal>

      <Modal
        maskClosable={false}
        title={"不合格图片信息"}
        width={1200}
        visible={visible2}
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            取消
          </Button>,
        ]}
      >
        <Spin spinning={loading2}>
          <List
            grid={{
              gutter: 16,
              column: 5,
            }}
            dataSource={imgList}
            renderItem={(item: any) => (
              <List.Item>
                <div className={styles.imgItem} key={item.image_id}>
                  <img src={item.url} alt="" />
                  <span>
                    {formatDate(item.capture_at, "YYYY-MM-DD HH:mm:ss")}
                  </span>
                </div>
              </List.Item>
            )}
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
      </Modal>
    </Modal>
  );
};

export default VModal;
