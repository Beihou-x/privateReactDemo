import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Button,
  Form,
  Checkbox,
  message,
  Divider,
} from "antd";
import { useHistory } from "react-router-dom";
import {
  serviceSearchOnce,
  serviceAdd,
  serviceUpdate,
  capabilityServicesSearch,
  protocolSearch,
} from "@/services/v1";
import { getServiceConfig, clusterSearch } from "@/services/v2";
import { filterCategory, parseConfig } from "@/utils/utils";
import styles from "./index.less";
import AccessConfig from "./child/accessConfig";
import ServerConfig from "./child/serverConfig";
import TransConfig from "./child/transConfig";
import VForm from "@components/VForm";
import JSONInput from "react-json-editor-ajrm";
import locale from "react-json-editor-ajrm/locale/zh-cn";

const addService = (props) => {
  const {
    match: {
      params: { id },
    },
  }: any = props;
  const { Group } = Checkbox;
  const history = useHistory();
  const childRef: any = Form.useForm();
  const configRef: any = useRef();
  const [data, setData]: any = useState({});
  const [profileData, setProfileData]: any = useState({});
  // 文件依赖服务,队列依赖服务
  const [relyFile, setRelyFile]: any = useState([]);
  const [relyQueue, setRelyQueue]: any = useState([]);
  // 文件依赖和队列依赖选中
  const [fileCheckedList, setFileCheckedList] = useState([]);
  const [queueCheckedList, setQueueCheckedList] = useState([]);

  const [fileCheckAll, setFileCheckAll] = useState(false);
  const [queueCheckAll, setQueueCheckAll] = useState(false);

  const [changeValue, setChangeValue] = useState("");
  // 协议下拉框数据
  const [protocolData, setProtocolData] = useState([]);
  // 集群列表
  const [clusterData, setClusterData] = useState([]);
  const [formData, setFormData]: any = useState({});
  useEffect(() => {
    if (id) {
      serviceSearchOnce({ id }).then((res) => {
        if (res) {
          setData(res);
          setProfileData(res.xconfig);
          setFormData(res && res.xconfig && res.xconfig.page)
          setChangeValue(res.category);
          let fileArr = (res.dependency_services || [])
            .filter((item) => item.category === "文件服务")
            .map((item) => item.id);
          let queueArr = (res.dependency_services || [])
            .filter((item) => item.category === "队列服务")
            .map((item) => item.id);
          setFileCheckedList(fileArr);
          setQueueCheckedList(queueArr);
        }
      });
    }
    getRelyServeList();
    getCluster();
    protocolSearch({
      limit: 999
    }).then((res) => {
      const arr = ((res && res.items) || []).map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setProtocolData(arr);
    });
  }, []);

  // 配置文件预览信息
  useEffect(() => {
    // 服务与协议关联
    // 取消下拉选择类型切换协议
    // getProtocolData(changeValue || null);
    // childRef && childRef[0] && childRef[0].setFieldsValue({ protocol: '' });
    if (changeValue && !id) {
      getXconfig(changeValue);
    }
  }, [changeValue]);

  const layoutCol = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };
  // 获取协议数据
  const getProtocolData = (service_type) => {
    protocolSearch({
      limit: 999,
      type: service_type
    }).then((res) => {
      const arr = ((res && res.items) || []).map((item: any) => {
        return {
          label: item.name,
          value: item.id,
        };
      });
      setProtocolData(arr);
    });
  }
  const getXconfig = (val) => {
    getServiceConfig({ category: val }).then((res) => {
      setProfileData(res || {});
    });
  };

  const categoryChange = (val: any) => {
    console.log('==', val)
    setChangeValue(val);
  };

  // 获取依赖服务列表
  const getRelyServeList = async () => {
    const fileRes = await capabilityServicesSearch({ category: "FILE" });
    const queueRes = await capabilityServicesSearch({ category: "QUEUE" });
    let fileArr = (fileRes.items || []).map((item) => {
      return { label: item.name, value: item.id };
    });
    let queueArr = (queueRes.items || []).map((item) => {
      return { label: item.name, value: item.id };
    });
    setRelyFile(fileArr);
    setRelyQueue(queueArr);
  };

  const fileCheckAllChange = (e) => {
    const list = relyFile.map((item) => item.value);
    setFileCheckedList(e.target.checked ? list : []);
    setFileCheckAll(e.target.checked);
  };

  const queueCheckAllChange = (e) => {
    const list = relyQueue.map((item) => item.value);
    setQueueCheckedList(e.target.checked ? list : []);
    setQueueCheckAll(e.target.checked);
  };

  const fileChange = (list) => {
    const flieList = relyFile.map((item) => item.value);
    setFileCheckedList(list);
    setFileCheckAll(list.length === flieList.length);
  };

  const queueChange = (list) => {
    const queueList = relyFile.map((item) => item.value);
    setQueueCheckedList(list);
    setQueueCheckAll(list.length === queueList.length);
  };

  const getCluster = async () => {
    const res = await clusterSearch({})
    const { items } = res;
    setClusterData(
      items
        ? items.map((m) => {
          return { label: m.name, value: m.id };
        })
        : []
    );
  };

  // changeValue
  const c1 = changeValue === 'INTERFACE_GATEWAY' || changeValue === 'SERVICE_GATEWAY' ? [] : [
    {
      name: "protocol",
      label: "协议名称",
      type: "select",
      list: protocolData,
      rules: [{ required: true }],
    },
    {
      name: "cluster_id",
      label: "集群类型",
      type: "select",
      list: clusterData,
      rules: [{ required: true }],
    },
    { name: "metrics_name", label: "统计名称", rules: [{ required: true }], }
  ]

  const columns = [
    { name: "name", label: "名称", rules: [{ required: true }] },
    {
      name: "category",
      label: "服务类型",
      type: "select",
      list: filterCategory("服务"),
      callback: categoryChange,
      disabled: id ? true : false,
      rules: [{ required: true }],
      allowClear: false,
    },
    ...c1,
    { name: "ip", label: "IP" },
    { name: "port", label: "端口" },
  ];

  // 保存服务

  const saveHandel = () => {
    const vform = childRef[0];
    //可以在验证后再获取值
    // const configJson = monacoRef.current.handelChange();
    try {
      // const Obj = JSON.parse(profileData);
      let xconfig: any = null;
      if (changeValue === 'INTERFACE_GATEWAY' || changeValue === 'SERVICE_GATEWAY' || changeValue === '可信网关' || changeValue === 'FTP') {
        const values = configRef.current.getFormValue();
        xconfig = { ...profileData, ...values };
      } else {
        xconfig = profileData;
      }
      vform
        .validateFields()
        .then((valid) => {
          if (id) {
            serviceUpdate(id, {
              ...valid,
              dependency_ids: [...fileCheckedList, ...queueCheckedList],
              xconfig,
            }).then((res) => {
              message.success("编辑成功");
              history.goBack();
            });
          } else {
            serviceAdd({
              ...valid,
              dependency_ids: [...fileCheckedList, ...queueCheckedList],
              xconfig,
            }).then((res) => {
              message.success("新增服务成功");
              history.goBack();
            });
          }
        })
        .catch((e) => { });
    } catch (err) {
      message.error("配置文件格式错误");
    }
  };


  return (
    <>
      <Card bordered={false}>
        <div className={styles.addService}>
          <div className={styles.part}>
            <Divider orientation="left" plain>
              基本信息
            </Divider>
            <VForm
              columns={columns}
              form={childRef}
              span={6}
              layoutCol={layoutCol}
              data={data}
            />

          </div>
          <div>
            <Divider orientation="left" plain>
              配置文件信息
            </Divider>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ width: "45%" }}>
                {/* <Monaco code={profileData} ref={monacoRef} /> */}
                <JSONInput
                  locale={locale}
                  height={600}
                  width={'100%'}
                  colors={{
                    background: "#191f2a",
                    default: "#848585",
                  }}
                  style={{
                    contentBox: {
                      fontSize: "16px",
                      color: "#848585",
                    },
                    labelColumn: {
                      fontSize: "16px",
                    },
                  }}
                  placeholder={profileData}
                  onChange={(value) => {
                    console.log(value);

                    setProfileData((value && value.jsObject) || {})
                  }
                  }
                />
                <div style={{ margin: "10px 0" }}>依赖服务</div>
                <div className={styles.p_r}>
                  <div>
                    <span style={{ marginRight: 20 }}>文件服务:</span>
                    <Checkbox onChange={fileCheckAllChange} checked={fileCheckAll}>
                      全选
                    </Checkbox>
                    <div style={{ marginTop: 10 }}>
                      <Group
                        options={relyFile}
                        value={fileCheckedList}
                        onChange={fileChange}
                      ></Group>
                    </div>
                  </div>
                  <Divider></Divider>
                  <div>
                    <span style={{ marginRight: 20 }}>队列服务:</span>
                    <Checkbox
                      onChange={queueCheckAllChange}
                      checked={queueCheckAll}
                    >
                      全选
                    </Checkbox>
                    <div style={{ marginTop: 10 }}>
                      <Group
                        options={relyQueue}
                        value={queueCheckedList}
                        onChange={queueChange}
                      ></Group>
                    </div>
                  </div>
                </div>
              </div>
              <div style={{ width: "50%" }}>
                {/* 接口网关 */}
                {changeValue === 'INTERFACE_GATEWAY' ?
                  <AccessConfig ref={configRef} data={formData} />
                  : ''
                }
                {/* 服务网关 */}
                {changeValue === 'SERVICE_GATEWAY' ?
                  <ServerConfig ref={configRef} data={formData} />
                  : ''
                }
                {/* 文件压缩算法 */}
                {changeValue === '可信网关' || changeValue === 'FTP' ?
                  <TransConfig ref={configRef} data={formData} />
                  : ''
                }
              </div>
            </div>



          </div>
        </div>

        <div style={{ textAlign: "right" }}>
          <Button style={{ marginRight: 10 }} onClick={() => history.goBack()}>取消</Button>
          <Button
            type="primary"
            onClick={() => saveHandel()}
          >
            保存
          </Button>
        </div>
      </Card>
    </>
  );
};

export default addService;
