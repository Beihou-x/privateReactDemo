import React, { useContext, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { PageHeaderWrapper } from "@ant-design/pro-layout";
import {
  Card,
  Input,
  Divider,
  Popconfirm,
  message,
  Select,
  Button,
  Tag
} from "antd";
import {
  applicationSearch,
  systemApplicationDelete,
  systemApplicationExport,
} from "@/services/v1";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import SearchForm from "@components/SearchForm";
import DownLoadFile from "@components/DownLoadFile";
import {Link} from "react-router-dom"
import ModalAdd from "./ModalAdd";
import { formatDate, filterCategory, getCodeValue } from "@/utils/utils";
import EditDialog from "./components/Edit";
import Authorization from "./components/Authorization";
import Detail from "./components/detail";
import TagModal from "./components/Tag";
import Business from "./Business";

const { Option } = Select;

const Application = () => {
  const { pushlist } = useContext(DefaultPubSubContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [authorizationShow, setAuthorizationShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [authorizationData, setAuthorizationData] = useState({});
  // 详情
  const [detailShow, setDetailShow] = useState(false);
  const [detailData, setDetailData] = useState({});
  // 标签信息
  const [tagShow, setTagShow] = useState(false);
  const [tagData, setTagData] = useState({});
  // 搜索条件保存,用于导出传参
  const [searchParams, setSearchParams] = useState({});
  const refTable: any = useRef(null);
  const categorys = filterCategory("应用类型") || [];
  const secretLevel = filterCategory("密级") || [];
  const industry = filterCategory("行业属性") || [];
  const administrative = filterCategory("行政属性") || [];
  const [businessShow, setBusinessShow] = useState(false);

  //search
  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };
  const handleDelete = async (id) => {
    try {
      await systemApplicationDelete({ id });
      pushlist("table:delete");
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

  //详情
  const handleRowExpand = (val) => {
    setDetailShow(true);
    const obj = {
      ...val,
      created_at: formatDate(val && val.created_at, "YYYY-MM-DD"),
      updated_at: formatDate(val && val.updated_at, "YYYY-MM-DD"),
      expired_at: formatDate(val && val.expired_at, "YYYY-MM-DD"),
    };
    setDetailData(obj);
  };

  // 编辑
  const editApplication = (val, isShow) => {
    setEditData(val);
    setEditShow(isShow);
  };
  // 授权
  const handleAuthorization = (val, isShow) => {
    setAuthorizationData(val);
    setAuthorizationShow(isShow);
  };
  // 标签modal显示隐藏
  const tagAdd = (val, isShow) => {
    setTagShow(isShow);
    setTagData(val);
  };

  const onSearchChange = (params) => {
    setSearchParams(params);
  }

  const businessAdd = (val, isShow,type) => {
    setEditData({...val,editType:type});
    setBusinessShow(isShow);
  };

  const columns = [
    {
      dataIndex: "name",
      title: "应用名称",
      align: "center",
    },
    {
      dataIndex: "category",
      title: "类型",
      align: "center",
      render: (val) => <span>{getCodeValue(categorys, val)}</span>,
    },
    {
      dataIndex: "expired_at",
      title: "授权有效期",
      align: "center",
      render: (val, record) => (
        <span>{val === "0" ? "未授权":formatDate(val, "YYYY-MM-DD")}</span>
      ),
    },
    {
      dataIndex: "maintenance",
      title: "运维单位",
      align: "center",
    },
    {
      dataIndex: "management",
      title: "管理单位",
      align: "center",
    },
    // {
    //   dataIndex: "business_name",
    //   title: "业务分组",
    //   align: "center",
    // },
    {
      dataIndex: "secret_level",
      title: "密级",
      align: "center",
      render: (val) => <span>{getCodeValue(secretLevel, val)}</span>,
    },
    {
      dataIndex: "industry",
      title: "行业属性",
      align: "center",
      render: (val) => <span>{getCodeValue(industry, val)}</span>,
    },
    {
      dataIndex: "administrative",
      title: "行政属性",
      align: "center",
      render: (val) => <span>{getCodeValue(administrative, val)}</span>,
    },
    {
      dataIndex: "status",
      title: "状态",
      align: "center",
      render: val => (
        <>
          {val==="DEFAULT"? "正常": "删除"}
        </>
      )
    },
    {
      dataIndex: "tag_name",
      title: "标签",
      align: "center",
      render: val => (
        val ? <Tag color="#108ee9">{val&&val[0]}</Tag>
        : ''
      )
    },
    {
      dataIndex: "version",
      title: "版本",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      render: (val, record) => (
        <span>
          {(record && record.creator) || "-"}/
          {formatDate(record && record.created_at, "YYYY-MM-DD")}
        </span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <a onClick={() => editApplication(val, true)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => handleRowExpand(val)}>详情</a>
          <Divider type="vertical" />
          <a onClick={() => handleAuthorization(val, true)}>授权</a>
          <Divider type="vertical" />
          <a onClick={() => tagAdd(val, true)}>标签</a>
          <Divider type="vertical" />
          <Link to={`/system/wx_basic_config/wx_system_application_record/${val.id}`}>日志</Link>
          {/* <Divider type="vertical" />
          <a onClick={() =>businessAdd(val, true,'group')}>业务分组</a> */}
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除本条数据"
            onConfirm={() => handleDelete(val.id)}
          >
            <a>删除</a>
          </Popconfirm>
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
              label: "应用名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            {
              label: "类型",
              name: "category",
              renderFormItem: () => (
                <Select>
                  {filterCategory("应用类型").map((item, index) => {
                    return (
                      <Option key={index} value={item.value}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              ),
            },
          ]}
          onChange={(params) => onSearchChange(params)}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          新增
        </Button>
        <DownLoadFile
          style={{ marginLeft: 20 }}
          services={() => systemApplicationExport({
            ...searchParams
          })}
        >
          导出
        </DownLoadFile>

        <StandardTable
          ref={refTable}
          columns={columns}
          services={applicationSearch}
          rowSelection={false}
        />
      </Card>
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
      {editShow ? (
        <EditDialog
          editShow={editShow}
          editData={editData}
          editApplication={editApplication}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
       {businessShow ? (
        <Business
          modalVisible={businessShow}
          handleModalVisible={businessAdd}
          handleSearch={handleSearchReset}
          editData={editData}
        />
      ) : (
        ""
      )}
      {authorizationShow ? (
        <Authorization
          authorizationShow={authorizationShow}
          authorizationData={authorizationData}
          handleAuthorization={handleAuthorization}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
      {detailShow ? (
        <Detail
          detailShow={detailShow}
          handleDetailShow={setDetailShow}
          detailData={detailData}
        />
      ) : (
        ""
      )}

      {tagShow ? (
        <TagModal
          modalVisible={tagShow}
          handleModalVisible={tagAdd}
          handleSearch={handleSearchReset}
          tagData={tagData}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default Application;
