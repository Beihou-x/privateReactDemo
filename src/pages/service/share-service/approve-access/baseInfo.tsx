import React, {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Descriptions, Tabs, Divider, Image, message, Table } from "antd";
import {
  forwardDetailInfo,
  forwardDetailServer,
  forwardRequestUpdate,
} from "@/services/v1";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";
import VForm from "@components/VForm";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import AssignList from "./components/AssignList";
import DetailDeviceList from "./components/detailDeviceList";
const { TabPane } = Tabs;

const BaseInfo = (props, ref) => {
  const { page, id, onBack, isButtonShow } = props;
  const [title, setTitle] = useState("");
  const [info, setInfo]: any = useState({});
  const [serveInfo, setServeInfo]: any = useState([]);
  const childRef: any = useRef(null);
  const status = filterCategory("申请状态") || [];
  const checkStatus = filterCategory("审核状态") || [];
  useImperativeHandle(ref, () => ({
    onAuditSave: () => onAuditSave(),
  }));

  useEffect(() => {
    const string = getTitle();
    setTitle(string);
  }, [page]);
  useEffect(() => {
    forwardDetailInfo({ id }).then((res) => {
      setInfo(res);
    });
    forwardDetailServer(id).then((res) => {
      setServeInfo(Array.isArray(res) ? res : []);
    });
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
  // 审核保存
  const onAuditSave = () => {
    const form = childRef.current.getForm();
    try {
      form.validateFields().then((fieldsValue) => {
        if (id) {
          forwardRequestUpdate({
            id,
            ...fieldsValue,
            status: Number(fieldsValue.status),
          }).then((res) => {
            if (res===undefined) {
              message.success("审核完成");
              onBack && onBack();
            }
          });
        }
      });
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const columnsForm = [
    {
      name: "status",
      label: "确认状态",
      type: "select",
      list: [{label: "同意",value: "2"},{label: "拒绝",value: "3"}],
      rules: [{ required: true }],
    },
    {
      name: "processing_content",
      type: "textarea",
      label: "审核内容",
    },
  ];

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        size="small"
        onChange={(activeKey) => isButtonShow && isButtonShow(activeKey)}
      >
        <TabPane tab={title} key="1">
          <Descriptions title="申请信息" column={4}>
            <Descriptions.Item label="申请编号">
              {info.application_id}
            </Descriptions.Item>
            <Descriptions.Item label="申请标题">{info.title}</Descriptions.Item>
            {/* <Descriptions.Item label="申请名称">{info.name}</Descriptions.Item> */}
            <Descriptions.Item label="供应商">
              {info.category}
            </Descriptions.Item>
            <Descriptions.Item label="申请描述信息">
              {info.description}
            </Descriptions.Item>
            <Descriptions.Item label="创建人">{info.creator}</Descriptions.Item>
            <Descriptions.Item label="创建时间">
              {formatDate(info.created_at, "YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
            {title === "审核信息" ? (
              <Descriptions.Item label="审核状态">
                {getCodeValue(
                  checkStatus,
                  Object.keys(info).length && info.status.toString()
                )}
              </Descriptions.Item>
            ) : (
              <Descriptions.Item label="申请状态">
                {getCodeValue(
                  status,
                  Object.keys(info).length && info.status.toString()
                )}
              </Descriptions.Item>
            )}

            <Descriptions.Item label="处理人">
              {info.processor}
            </Descriptions.Item>
            <Descriptions.Item label="处理时间">
              {formatDate(info.processed_at, "YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
            <Descriptions.Item label="处理内容">
              {info.processing_content}
            </Descriptions.Item>
            <Descriptions.Item label="申请人">{info.creator}</Descriptions.Item>
            <Descriptions.Item label="申请时间">
              {formatDate(info.created_at, "YYYY-MM-DD HH:mm")}
            </Descriptions.Item>
          </Descriptions>
          <Divider />
          {/* 详情页面 */}
          {page === "detail" ? (
            <>
              {/* <Descriptions title="设备信息" column={1}>
              </Descriptions> */}
              {/* <div style={{width: "100%",height: 510,position:'relative'}}>
                <DetailDeviceList id={id}></DetailDeviceList>
              </div>
              <Divider /> */}
              <Descriptions title="服务信息" column={1}>
                <Descriptions.Item>
                  <div style={{ display: "flex" }}>
                    {(serveInfo || []).map((m, index) => (
                      <div key={index} style={{ width: 200, height: 220 }}>
                        <p>服务名称 : {m.name}</p>
                        <p>IP : {m.ip}</p>
                        <p>端口 : {m.port}</p>
                        <p>描述 : {m.description}</p>
                        {/* <Image
                          src={m.icon_url}
                          key={m.icon_url}
                          width={170}
                          height={170}
                        ></Image> */}
                      </div>
                    ))}
                  </div>
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            ""
          )}
          {/* 分配服务 */}
          {page === "assign" ? (
            <>
              <Descriptions title="选择服务" column={1}>
                <Descriptions.Item>
                  <AssignList />
                </Descriptions.Item>
              </Descriptions>
            </>
          ) : (
            ""
          )}
          {/* 审核信息 */}
          {page === "audit" ? (
            <Descriptions title="审核信息" column={1}>
              <Descriptions.Item>
                <VForm
                  columns={columnsForm}
                  data={{
                    status: info.status == "1"? "2": "3",
                    processing_content: info.processing_content,
                  }}
                  ref={childRef}
                  span={24}
                />
              </Descriptions.Item>
            </Descriptions>
          ) : (
            ""
          )}
        </TabPane>
        <TabPane tab="设备信息" key="2">
          {/* <Table
            bordered
            columns={columns}
            dataSource={info.devices}
          ></Table> */}
          <DetailDeviceList id={id}></DetailDeviceList>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default forwardRef(BaseInfo);
