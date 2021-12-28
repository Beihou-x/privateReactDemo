import React, { useContext, useState, useRef } from "react";
import StandardTable from "@components/Table";
import { Card, Input, Divider, Popconfirm, message, Button } from "antd";
import {
  dictionarySearch,
  dictionaryDelete,
} from "@/services/v1";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import SearchForm from "@components/SearchForm";
import DownLoadFile from '@components/DownLoadFile';

import ModalAdd from "./ModalAdd";
import EditModal from "./components/Edit";
import { formatDate } from "@/utils/utils";

const EngineManufactor = () => {
  const { pushlist } = useContext(DefaultPubSubContext);
  // 新增弹框
  const [modalVisible, setModalVisible] = useState(false);
  // 编辑弹框
  const [editModalShow, setEditModalShow] = useState(false);
  // 编辑时候数据
  const [editForm, setEditForm] = useState({});

  const refTable: any = useRef(null);

  const handleModalVisible = (flag) => {
    setModalVisible(flag);
  };

  const handleSearchReset = () => {
    const tableR = refTable;
    tableR && tableR.current && tableR.current.handleSearch();
  };

  const handleDelete = async (id) => {
    try {
      await dictionaryDelete({ id });
      pushlist("table:delete");
      message.success('删除成功!')
    } catch (e) {
      message.error(`${e}`);
    }
  };

  const handleEditShow = (val: any, isShow: boolean) => {
    setEditForm(val);
    setEditModalShow(isShow);
  };
  const columns = [
    {
      dataIndex: "name",
      title: "名称",
      align: "center",
    },
    {
      dataIndex: "creator",
      title: "创建人/创建时间",
      align: "center",
      render: (val, record) => (
        <span>{(record && record.creator) || "-"}/{formatDate(record && record.created_at, "YYYY-MM-DD")}</span>
      ),
    },
    {
      title: "操作",
      align: "center",
      render: (val) => (
        <>
          <a onClick={() => handleEditShow(val, true)}>编辑</a>
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

  //
  return (
    <>
      <Card bordered={false}>
        <SearchForm
          formList={[
            {
              label: "名称",
              name: "name",
              renderFormItem: () => <Input autoComplete="off" />,
            },
            // {
            //   label: "父级名称",
            //   name: "description",
            //   renderFormItem: () => <Input autoComplete="off" />,
            // },
          ]}
          onChange={() => { }}
        />
        <Button
          type="primary"
          style={{ marginBottom: 18 }}
          onClick={() => handleModalVisible(true)}
        >
          新增
        </Button>
        {/* <DownLoadFile style={{marginLeft: 20}} services={() =>{}}>
          导出
        </DownLoadFile> */}
        <StandardTable
          ref={refTable}
          columns={columns}
          services={(params) => dictionarySearch({ ...params, category: '引擎厂商' })}
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
      {editModalShow ? (
        <EditModal
          editForm={editForm}
          editModalShow={editModalShow}
          handleEditShow={handleEditShow}
          handleSearch={handleSearchReset}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default EngineManufactor;
