import React, { useEffect, useState, useContext } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Input,
  Select,
  Card,
  Button,
  message,
} from "antd";
import {
  capabilityServicesSearch,
  applicationSearch,
  mainServiceDelete,
  protocolSearch
} from "@/services/v1";
import { Link } from "react-router-dom";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";
import { DefaultPubSubContext } from "@components/PubSubscribe";
// 与数据汇聚管理一致
import Detail from "@/pages/gather/search/mentain/detail";
const { Option } = Select;

const getValue1 = val => {
  if (val === "STOP") {
    return "停止";
  } else if (val === "RUNNING") {
    return "运行中";
  } else if (val === "STARTING") {
    return "启动中";
  } else {
    return "";
  }
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

const MaintenanceService1 = () => {

  const [applications, setApplication] = useState([]);
  const { pushlist }: any = useContext(DefaultPubSubContext);

  const [detailShow, setDetailShow] = useState(false);
  const [detailData, setDetailData] = useState({});
  const [protocolData, setProtocolData] = useState([]);

  const categorys = filterCategory("服务") || []
  useEffect(() => {
    applicationSearch({}).then(res => {
      const { items = [] } = res;
      if (items && items.length) {
        const arr = items.map(m => {
          return { label: m.name, value: m.id };
        });
        setApplication(arr);
      }
    });

    protocolSearch({}).then(res => {
      const arr = (res && res.items || []).map((item: any) => {
        return {
          label: item.name,
          value: item.id
        }
      })
      setProtocolData(arr)
    })
  }, []);

  const handleDelete = async id => {
    try {
      await mainServiceDelete({ id })
      pushlist("table:delete");
    } catch (e) {
      message.error(`${e}`);
    }
  };


  const columns = [
    {
      title: "服务名称",
      dataIndex: ["name"],
      align: "center",
    },
    {
      title: "服务类型",
      dataIndex: ["category"],
      align: "center",
      render: val => (
        <span>{getCodeValue(categorys, val.toString())}</span>
      )
    },
    {
      title: "服务IP信息",
      dataIndex: ["ip"],
      align: "center",
    },
    // {
    //   title: "服务图标",
    //   dataIndex: ["icon_url"],
    //   align: "center",
    // },
    {
      title: "服务协议",
      dataIndex: ["protocol"],
      align: "center",
    },
    {
      title: "服务当前状态",
      dataIndex: ["status"],
      align: "center",
      render: val => {
        return getStatus(val)
      }
    },
    {
      title: "统计名称",
      dataIndex: ['metrics_name'],
      align: "center",

    },
    {
      title: "创建人/创建时间",
      dataIndex: ["creator"],
      align: "center",
      render: (val, record) => (
        <span>
          {record && record.creator ? record.creator : "-"}/
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: val => (
        <>
          <Link
            to={`/device/wx_access_device/wx_device_access_engine_edit/${val.id}`}
          >
            编辑
          </Link>
        </>
      ),
    },
  ];

  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "服务名称",
              name: "name",
              renderFormItem: () => <Input />,
            },
            // {
            //   label: "服务类型",
            //   name: "category",
            //   renderFormItem: () => (
            //     <Select allowClear>
            //       {filterCategory("服务").map((item, index) => {
            //         return (
            //           <Option value={item.value} key={index}>
            //             {item.label}
            //           </Option>
            //         );
            //       })}
            //     </Select>
            //   ),
            // },
            {
              label: "协议名称",
              name: 'protocol',
              renderFormItem: () => (
                <Select options={protocolData} allowClear>
                </Select>
              )
            },
            {
              label: '统计名称',
              name: 'metrics_name',
              renderFormItem: () => (
                <Input />
              )
            }
          ]}
          onChange={() => { }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18, marginRight: 20 }}
          onClick={() => {
            // handleModalVisible(true);
          }}
        >
          <Link to={`/device/wx_access_device/wx_device_access_engine_add`}>登记</Link>
        </Button>
        <StandardTable
          columns={columns}
          services={(params:any) =>{
            return capabilityServicesSearch({
              ...params,
              category: "DEVICE_ENGINE"
            })
          }}
          rowSelection={false}
        // 
        />
      </Card>
      {detailShow ? (
        <Detail
          detailShow={detailShow}
          handleDetailShow={setDetailShow}
          detailData={detailData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default MaintenanceService1;
