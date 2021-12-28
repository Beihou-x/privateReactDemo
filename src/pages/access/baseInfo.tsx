import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import {
  Descriptions,
  Tabs,
  Select,
  Table,
  Divider,
  Image,
  Checkbox,
  Row,
  Col,
  message,
} from "antd";
const { TabPane } = Tabs;
import "./index.less";
import {
  serviceSelectSearch,
  getDetailInfo,
  accessDeviceTotal,
  assignServerSearch,
  accessServiceSearch,
  serviceSearch,
  saveServices,
  accessApplyEdit,
} from "@/services/v1";
import { formatDate, filterCategory, getCodeValue, getLabelValue } from "@/utils/utils";
import DeviceList from "./component/DeviceList";
import SubmitList from "./component/SubmitList";
import VForm from "@components/VForm";
const { Option } = Select;

const BaseInfo = (props, ref) => {
  const { page, id, onBack, isButtonShow } = props;
  const status = filterCategory("申请状态") || [];
  const [title, setTitle] = useState("");
  const [data, setData]: any = useState({});
  const [total, setTotal]: any = useState({});
  const [clusters, setCluster]: any = useState([]);

  const [services, setService]: any = useState([]);

  const [serviceData, setServiceData]: any = useState([]);
  const [serviceDetailData, setServiceDetailData]: any = useState([]);
  const [keys, setKeys]: any = useState([]);
  const [loading, setLoading]: any = useState(false);


  const childRef: any = useRef(null);

  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    onSaveService: () => onServiceSave(),
    onAuditSave: () => onAuditSave(),
  }));

  useEffect(() => {
    const string = getTitle();
    setTitle(string);
    // 服务信息
    setLoading(true)
    accessServiceSearch(id).then((res) => {
      setLoading(false)
      setService(res || []);
      setKeys((res || []).map(m => m.id))
      setServiceDetailData(res || [])
    });
    if (page === "assign") {
      assignServerSearch({}).then((res) => {
        setCluster(
          (res.items || []).map((m) => {
            return { label: m.name, value: m.id };
          })
        );
      });
    }
  }, [page]);

  useEffect(() => {
    if (id) {
      getDetailInfo({ id }).then((res) => {
        if (res) {
          setData(res);
        }
      });
      accessDeviceTotal({ access_id: id }).then((res) => {
        if (res) {
          setTotal(res);
        }
      });
    }
  }, [id]);

  const getTitle = () => {
    if (page === "audit") {
      return "审核信息";
    } else if (page === "detail") {
      return "详情信息";
    } else {
      return "分配服务";
    }
  };

  // 选择服务
  const onChangeSelect = (id) => {
    serviceSearch({ cluster_id: id, category: "ACCESS" }).then((res) => {
      if (res && res.items && res.items.length) {
        setServiceData(
          res.items.map((m) => {
            return { label: m.name, value: m.id };
          })
        );
      } else {
        setServiceData([]);
      }
    });
  };

  const onChangeCheckbox = (ids) => {
    setKeys(ids);
    // forward_devices:
    serviceSelectSearch({ ids }).then((res) => {
      if (res && res.length) {
        setServiceDetailData(res);
      }
    });
  };
  const columns = [
    {
      name: "status",
      label: "确认状态",
      type: "select",
      list: [{ label: "同意", value: "2" }, { label: "拒绝", value: "3" },],
      rules: [{ required: true }],
    },
    { name: "processing_content", label: "审核内容", type: "textarea" },
  ];
  const columns1: any = [
    {
      title: "服务名称",
      dataIndex: "name",
      align: "center",
    },
    {
      title: "服务接口",
      dataIndex: "addr_list",
      align: "center",
      render: val => <>
        {
          val && val.map(m => (
            <div>{m}</div>
          ))
        }
      </>
    },
  ]

  const layoutCol = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10 },
  };

  // 分配服务保存
  const onServiceSave = () => {
    if (!keys || !keys.length) {
      message.error("请先选择服务");
    } else {
      saveServices({
        access_id: id,
        service_ids: keys,
      }).then((res) => {
        message.success("分配服务成功");
        onBack && onBack();
      });
    }
  };

  //审核保存
  const onAuditSave = () => {
    const form = childRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        accessApplyEdit({
          id,
          ...valid,
          status: parseInt(valid.status),
        }).then((res) => {
          if (res === undefined) {
            message.success("审核完成");
            onBack && onBack();
          }
        });
      })
      .catch((e) => { });
  };
  const getStatus = (val) => {
    if (val === "START") {
      return "就绪";
    } else if (val === "STARTING") {
      return "启动中";
    } else if (val === "RUNNING") {
      return "运行中";
    } else if (val === "STOPPING") {
      return "停止中";
    } else if (val === "UNKNOW") {
      return "未知"
    } else {
      return "就绪"
    }
  };
  return (
    <div className="baseInfo">
      <Tabs defaultActiveKey="1" size="small" onChange={(activeKey) => isButtonShow && isButtonShow(activeKey)}>
        <TabPane tab={title} key="1">
          <Descriptions title="申请信息" column={3}>
            <Descriptions.Item label="申请编号">{data.id}</Descriptions.Item>
            <Descriptions.Item label="申请标题">{data.title}</Descriptions.Item>
            <Descriptions.Item label="类型">{data.category}</Descriptions.Item>
            <Descriptions.Item label="运维单位名称">
              {data.maintenance}
            </Descriptions.Item>
            <Descriptions.Item label="运维单位编码">
              {data.maintenance_code}
            </Descriptions.Item>
            <Descriptions.Item label="运维单位联系方式">
              {data.maintenance_contact}
            </Descriptions.Item>
            <Descriptions.Item label="版本">{data.version}</Descriptions.Item>
            <Descriptions.Item label="接入协议">
              {data.protocol_id}
            </Descriptions.Item>
            <Descriptions.Item label="描述信息">
              {data.description}
            </Descriptions.Item>
            {/* {page === "audit" ? (
              ""
            ) : (
              <>
                <Descriptions.Item label="申请状态">
                  {data.status}
                </Descriptions.Item>
                <Descriptions.Item label="处理人">
                  {data.processor}
                </Descriptions.Item>
                <Descriptions.Item label="处理时间">
                  {formatDate(data.processed_at, "YYYY-MM-DD HH:mm:ss")}
                </Descriptions.Item>
                <Descriptions.Item label="处理内容">
                  {data.processing_content}
                </Descriptions.Item>
              </>
            )}
            <Descriptions.Item label="申请人">{data.creator}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {formatDate(data.created_at, "YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item> */}
          </Descriptions>
          <Descriptions column={3}>
            <Descriptions.Item label="申请人">{data.creator}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {formatDate(data.created_at, "YYYY-MM-DD HH:mm:ss")}
            </Descriptions.Item>
            {page === "audit" ? (
              ""
            ) : (
              <>
                <Descriptions.Item label="申请状态">
                  {data.status}
                </Descriptions.Item>
                <Descriptions.Item label="处理人">
                  {data.processor}
                </Descriptions.Item>
                <Descriptions.Item label="处理时间">
                  {formatDate(data.processed_at, "YYYY-MM-DD HH:mm:ss")}
                </Descriptions.Item>
              </>
            )}
          </Descriptions>
          <Descriptions column={1}>
            <Descriptions.Item label="处理内容">
              {data.processing_content}
            </Descriptions.Item>
          </Descriptions>

          <Descriptions title="设备统计" column={3}>
            <Descriptions.Item label="设备数">
              {total["设备数"]}
            </Descriptions.Item>
          </Descriptions>
          <Descriptions column={3}>
            {Object.keys(total || []).map((m) => (
              m === "设备数" ? '' :
                <Descriptions.Item label={m} key={m}>
                  {total[m]}
                </Descriptions.Item>
            ))}
          </Descriptions>

          {page === "detail" ? (
            <div>
              <p>服务信息</p>
              <Table columns={columns1} rowKey="name" dataSource={services || []} bordered loading={loading} pagination={false} />
            </div>
          ) : (
            ""
          )}
          {page === "assign" ? (
            <Descriptions
              title={
                <>
                  <span style={{ color: "red" }}>*</span>选择服务
                </>
              }
              column={1}
            >
              <Descriptions.Item label="">
                <div className="assignService">
                  <div className="assignService_left">
                    {/* <Select
                      style={{ width: "100%", marginBottom: 15 }}
                      placeholder="服务"
                      onChange={onChangeSelect}
                      options={clusters}
                    ></Select> */}
                    <Checkbox.Group
                      className="checkbox"
                      options={clusters}
                      onChange={onChangeCheckbox}
                      value={keys}
                    />
                  </div>
                  <div className="assignService_right">
                    {serviceDetailData.map((m, index) => (
                      <div key={index}>
                        <Descriptions column={3}>
                          {/* <Descriptions.Item>
                            <Image
                              src={m.icon_url}
                              key={m.icon_url}
                              width={50}
                              height={50}
                            />
                          </Descriptions.Item> */}
                          <Descriptions.Item>{m.description}</Descriptions.Item>
                        </Descriptions>
                        <Descriptions column={2}>
                          <Descriptions.Item label="IP">
                            {m.ip}
                          </Descriptions.Item>
                          <Descriptions.Item label="服务器版本号">
                            {m.version}
                          </Descriptions.Item>
                          <Descriptions.Item label="统计信息">
                            {m.description}
                          </Descriptions.Item>
                          <Descriptions.Item label="服务当前状态">
                            {m.status ? getStatus(m.status) : '-'}
                          </Descriptions.Item>
                          <Descriptions.Item label="服务访问Urls">
                            {m.icon_url}
                          </Descriptions.Item>
                        </Descriptions>
                        <Descriptions column={1}>
                          <Descriptions.Item label="依赖服务器信息">
                            <Row style={{ width: "100%" }}>
                              {(m.dependency_services || []).map((f, i) => (
                                <Col
                                  span={6}
                                  key={i}
                                  style={{ textAlign: "center" }}
                                >
                                  {/* <Image
                                    src={f.icon_url}
                                    key={f.icon_url}
                                    width={50}
                                    height={50}
                                  /> */}
                                  <div>{f.name}</div>
                                </Col>
                              ))}
                            </Row>
                          </Descriptions.Item>
                        </Descriptions>
                        <Divider />
                      </div>
                    ))}
                  </div>
                </div>
              </Descriptions.Item>
            </Descriptions>
          ) : (
            ""
          )}
          {page === "audit" ? (
            <div>
              <p>审核信息</p>
              <VForm
                columns={columns}
                ref={childRef}
                span={16}
                layoutCol={layoutCol}
                data={{ status: data.status === "申请中" ? "2" : "3", processing_content: data.processing_content }}
              />
            </div>
          ) : (
            ""
          )}
        </TabPane>
        <TabPane tab="设备信息" key="2">
          <DeviceList page={page} id={id} />
        </TabPane>
        {/* <TabPane tab="接入日志" key="3">
          <SubmitList page={page} id={id} />
        </TabPane> */}
      </Tabs>
    </div>
  );
};

export default forwardRef(BaseInfo);
