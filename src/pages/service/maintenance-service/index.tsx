import React, { useEffect, useState, useContext } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  Input,
  Select,
  Card,
  Button,
  Divider,
  Popconfirm,
  message,
} from "antd";
import {
  capabilityServicesSearch,
  applicationSearch,
  mainServiceDelete,
  mainServiceDownLoad,
  exportService,
  protocolSearch
} from "@/services/v1";
import DownLoadFile from "@components/DownLoadFile";
import { Link } from "react-router-dom";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import DownloadTemplate from "@/components/DownloadTemplate";
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

  /**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
 */
  //  mainServiceDownLoad({
  //   id: val.id,
  // });
  const downloadFile = (id) => {

    mainServiceDownLoad({
      id: id,
    }).then(res => {
      if (res) {
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = res;
        a.download = '配置文件.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    })
  }

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
        return getValue1(val)
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
          <a>重启</a>
          <Divider type="vertical" />
          <Link
            to={`/cluster/service/wx_maintenance_service1/edit/${val && val.id
              }`}
          >
            编辑
          </Link>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val.id)}
          >
            <a>删除</a>
          </Popconfirm>
          <Divider type="vertical" />
          <Link
            to={`/cluster/service/wx_maintenance_service1/detail/${val && val.id
              }`}
          >
            详情
          </Link>
          <Divider type="vertical" />
          <a onClick={() => downloadFile(val.id)}>
            下载配置文件
          </a>
          <Divider type="vertical" />
          <Link
            to={`/monitor/${val && val.id}/service`}>
            实时监控
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
            {
              label: "服务类型",
              name: "category",
              renderFormItem: () => (
                <Select allowClear>
                  {filterCategory("服务").map((item, index) => {
                    return (
                      <Option value={item.value} key={index}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              ),
            },
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
          <Link to={`/cluster/service/wx_maintenance_service1/add`}>新增</Link>
        </Button>
        <DownLoadFile
          services={() => {
            return exportService({});
          }}
          style={{ marginBottom: 18 }}
        >
          导出
        </DownLoadFile>
        <StandardTable
          columns={columns}
          services={capabilityServicesSearch}
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
