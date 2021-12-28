import React, { useState, useEffect, useContext } from "react";
import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import ModalForm from "@components/Modal";
import Upload from "@components/Upload";
import {
  Card,
  Input,
  Divider,
  Select,
  Button,
  Table,
  Form,
  Popconfirm,
  message,
  Tag
} from "antd";
import _ from "lodash";
import moment from "moment";
import DownLoadFile from "@components/DownLoadFile";
import DownloadTemplate from "@components/DownloadTemplate";
import {
  areaManagement,
  accessExports,
  departmentAndUnitDelete,
} from "@/services/v1";
import {unitTemplateDownload,unitUpload} from "@/services/v2";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import ModalAdd from "./Modal";
import Edit from "./Edit";
import TagModal from "./Tag";
import Business from "./Business";
const Query = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [tableData, setTableData]: any = useState([]);
  const [areaList, setAreaList] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});

  const [tagShow, setTagShow] = useState(false);
  const [tagData, setTagData] = useState({});

  const [businessShow, setBusinessShow] = useState(false);

  const [loading, setLoading] = useState(false);
  
  const { pushlist }: any = useContext(DefaultPubSubContext);

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };
  useEffect(() => {
    getTableData({});
  }, []);

  const [form] = Form.useForm();

  const getTableData = async (params) => {
    setLoading(true);
    const res = await areaManagement({ ...params });
    // 保存地区数据,用作添加时的parentID

    const list = res.items.map((item) => {
      return {
        label: item.name,
        value: item.id,
      };
    });
    setAreaList(list);
    // 根据parent_id进行分类
    // const treeData:any[]
    const loop = _.groupBy(res.items, "parent_id");

    const forIn = (tmp, key) => {
      tmp.children = loop[key] || [];
      tmp.key = tmp.id;
      tmp.children.map((item) => {
        forIn(item, item.id);
      });
    };
    const treeData = res.items.map((item) => {
      forIn(item, item.id);
      return item;
    });
    const data: any = [];

    data.push(treeData[0]);

    setTableData(data);
    setLoading(false);
  };

  const edit = (val, isShow,type) => {
    setEditData({...val,editType:type});
    setEditShow(isShow);
  };

// 标签modal显示隐藏
  const tagAdd = (val, isShow) => {
    setTagShow(isShow)
    setTagData(val)
  }
  const businessAdd = (val, isShow,type) => {
    setEditData({...val,editType:type});
    setBusinessShow(isShow);
  };

  const handleDelete = async (val) => {
    const res = await departmentAndUnitDelete(val.id);
    if (res === undefined) {
      message.success("删除成功");
      getTableData({});
    } else {
      message.error(JSON.parse(res).message);
    }
  };

  const handleReset = () => {
    form.resetFields();
    getTableData({});
  };
  const handleSearch = (val) => {
    getTableData(val);
  };

  const importEmit = (val) => {
    if (val === "error") {
      message.error("导入失败");
      pushlist("modalForm", false);
    } else if (val === "submit") {
      message.success("导入成功");
      pushlist("modalForm", false);
      pushlist("table:search", {});
    }
  };

  const columns: any = [
    {
      dataIndex: "name",
      title: "区域名称",
      align: "center",
    },
    {
      dataIndex: "created_at",
      title: "创建时间",
      align: "center",
      render: (text, record) => (
        <span>
          {record &&
            record.created_at &&
            moment(record.created_at * 1000).format("YYYY-MM-DD")}
        </span>
      ),
      // width: "30%",
    },
    {
      dataIndex: 'type',
      title: '类型',
      align: "center",
    },
    {
      dataIndex: "tag_name",
      title: "标签",
      align: 'center',
      render: val => (
        val ? <Tag color="#108ee9">{val&&val[0]}</Tag>
        : ''
      )
    },
    {
      dataIndex: "business_name",
      title: "业务分组",
      align: 'center',
    },
    {
      title: "操作",
      align: "center",
      render: (val,record) => (
        <>
          <a onClick={() => edit(val, true,'edit')}>编辑</a>
          {
            record.children.length ? 
            ''
            :
            <>
              <Divider type="vertical" />
              <a onClick={() => edit(val, true,'group')}>分组</a>
            </>
          }
          <Divider type="vertical" />
          <a onClick={() =>tagAdd(val, true)}>标签</a>
          <Divider type="vertical" />
          <a onClick={() =>businessAdd(val, true,'group')}>业务分组</a>
          <Divider type="vertical" />
          <Popconfirm
            title="确认删除该区域?"
            onConfirm={() => handleDelete(val)}
          >
            <a>删除</a>
          </Popconfirm>
          
        </>
      ),
      // width: "30%",
    },
  ];
  
  const layout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 18 },
  };

  return (
    <>
      <Card bordered={false}>
        <Form {...layout} layout="inline" form={form} onFinish={handleSearch}>
          <Form.Item label="区域名称" name="name">
            <Input autoComplete="off"></Input>
          </Form.Item>
          {/* <Form.Item label="类型" name="source">
          <Select></Select>
        </Form.Item> */}
          <Button
            type="primary"
            htmlType="submit"
            style={{ marginRight: 20, marginLeft: 24 }}
          >
            查询
          </Button>
          <Button onClick={handleReset}>重置</Button>
        </Form>
        <Button
          type="primary"
          style={{ marginBottom: 18, marginRight: 20 }}
          onClick={() => {
            handleModalVisible(true);
          }}
        >
          新增
        </Button>
        <Button
          style={{ marginRight: 20 }}
          onClick={() => {
            pushlist("modalForm", true);
          }}
          type="primary"
        >
          同步
        </Button>
        {/* <DownLoadFile
          services={() => {
            return accessExports({
              name: "access_request",
            });
          }}
        >
          导出
        </DownLoadFile> */}
        {/* <StandardTable
        columns={columns}
        services={areaManagement}
        rowSelection={false}
        
      /> */}
        <Table
          bordered
          loading={loading}
          columns={columns}
          dataSource={tableData}
          indentSize={30}
          rowKey={"id"}
          defaultExpandedRowKeys={[
            (tableData[0] && tableData[0].id) || "320500",
          ]}
          // defaultExpandAllRows
        ></Table>
      </Card>
      {modalVisible ? (
        <ModalAdd
          modalVisible={modalVisible}
          handleModalVisible={handleModalVisible}
          handleSearch={handleSearch}
          areaList={areaList}
        />
      ) : (
        ""
      )}
      {editShow ? (
        <Edit
          modalVisible={editShow}
          handleModalVisible={edit}
          handleSearch={handleSearch}
          areaList={areaList}
          editData={editData}
        />
      ) : (
        ""
      )}
      {tagShow ? (
        <TagModal
          modalVisible={tagShow}
          handleModalVisible={tagAdd}
          handleSearch={handleSearch}
          tagData={tagData}
        />
      ) : (
        ""
      )}
      {businessShow ? (
        <Business
          modalVisible={businessShow}
          handleModalVisible={businessAdd}
          handleSearch={handleSearch}
          editData={editData}
        />
      ) : (
        ""
      )}

      <ModalForm subscribeName="modalForm" title="文件同步">
        <DownloadTemplate
          services={() => {
            return unitTemplateDownload({});
          }}
          type="link"
        >
          下载模板
        </DownloadTemplate>
        <Upload
          services={({ formData }) => {
            return unitUpload({
              file: formData,
            });
          }}
          onEmit={importEmit}
        />
      </ModalForm>
    </>
  );
};

export default Query;
