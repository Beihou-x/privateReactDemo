import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Row,
  Card,
  List,
  Input,
  Button,
  Divider,
  Popconfirm,
  message,
} from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import StandardTable from "@components/Table";
import SearchForm from "@components/SearchForm";
import {
  dictionarySearch,
  dictionaryDelete,
  dictionaryCategorySearch,
  dictionaryImport,
} from "@/services/v1";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import styles from "./index.less";
import UploadFile from "@/components/UploadFile";
import CategoryAdd from "./categoryAdd";
import Edit from "./edit";
import CategoryEdit from "./categoryEdit";
import Add from './addDictionary'

const Dictionary = () => {
  const [loading, setLoading] = useState(false);
  const [addCategoryShow, setAddCategoryShow] = useState(false);
  const [editCategoryShow, setEditAddCategoryShow] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState({});

  const [addShow, setAddShow] = useState(false);

  const [editShow, setEditShow] = useState(false);
  const [editData, setEditData] = useState({});
  const [list, setList] = useState([]);
  const tableRef: any = useRef();
  const [category, setCategory] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    setLoading(true);
    dictionaryCategorySearch({}).then((res) => {
      setLoading(false);
      const { items } = res;
      if (items && items.length) {
        setList(items);
      }
    });
  };
  //删除
  const handleDelete = async (id) => {
    try {
      await dictionaryDelete({ id });
      await searchHandel(category);
      message.success('删除成功')
      getData()
    } catch (e) {
      message.error(`${e}`);
    }
  };
  // 类别添加
  const addCategory = (isShow) => {
    setAddCategoryShow(isShow);
  };
  // 字典类别编辑
  const editCategory = (val,isShow) => {
    setEditCategoryData(val)
    setEditAddCategoryShow(isShow)
  }
  // 字典添加
  const handelAddShow = (isShow) => {
    setAddShow(isShow);
  };
  // 字典编辑
  const handleEditShow = (val, isShow) => {
    setEditData(val);
    setEditShow(isShow);
  };
  const columns = [
    {
      title: "名称",
      dataIndex: ["name"],
    },
    {
      title: "编码",
      dataIndex: ["code"],
    },
    {
      title: "字典",
      dataIndex: ["category"],
    },
    {
      title: "操作",
      render: (val) => (
        <>
          <a onClick={() => handleEditShow(val,true)}>编辑</a>
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

  // 点击一级字典时进行查询
  const searchHandel = async (item?: any) => {
    await setCategory(item);
    const tableR = tableRef;
    tableR.current.handleSearch({ category: item });
  };

  return (
    <div>
      <Row gutter={16}>
        <Card
          bordered={false}
          style={{ height: "80vh", overflowY: "auto", width: 350 }}
        >
          <List
            className="demo-loadmore-list"
            header={
              <>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => addCategory(true)}
                >
                  新增
                </Button>
                <span className={styles.count}>(一级字典数:{list.length})</span>
              </>
            }
            loading={loading}
            itemLayout="horizontal"
            dataSource={list.length ? ["全部"].concat(list) : list}
            split={false}
            renderItem={(item: any) => (
              <List.Item
                className={category === item.name ? styles.background : ""}
              >
                {item === "全部" ? (
                  <div>
                    {" "}
                    <a className={styles.link} onClick={() => searchHandel()}>
                      {item}
                    </a>
                  </div>
                ) : (
                  <div style={{ width: "100%" }}>
                    <a
                      className={styles.link}
                      onClick={() => searchHandel(item.name)}
                    >
                      {item.name}
                    </a>
                    <span style={{ float: "right" }}>
                      <EditOutlined onClick={() =>editCategory(item,true)} style={{ paddingRight: 20 }} />
                      <Popconfirm title="是否删除本条数据" onConfirm={() =>{handleDelete(item.id)}}>
                        <DeleteOutlined />
                      </Popconfirm>
                    </span>
                  </div>
                )}
              </List.Item>
            )}
          />
        </Card>
        <Card
          bordered={false}
          style={{ width: "calc(100% - 370px)", marginLeft: 20 }}
        >
          <SearchForm
            formList={[
              {
                label: "子级名称",
                name: "name",
                renderFormItem: () => <Input autoComplete="off" />,
              },
            ]}
            onChange={() => {}}
          />
          <Button
            type="primary"
            style={{ marginRight: 20, marginBottom: 18 }}
            onClick={() => handelAddShow(true)}
          >
            新增
          </Button>
          <span style={{ marginRight: 20, marginBottom: 18 }}>
            <UploadFile
              services={(params) => {
                return dictionaryImport({
                  ...params,
                }).then((res) => {
                  if (res ===undefined) {
                    message.success("导入成功");
                    const tableR = tableRef;
                    tableR.current.handleSearch();
                  } else {
                    message.error(res.message);
                  }
                });
              }}
              submit={() => {}}
            >
              导入
            </UploadFile>
          </span>
          <StandardTable
            ref={tableRef}
            columns={columns}
            services={async (params) => {
              let obj: any = {
                ...params,
              };
              if (category) {
                obj.category = category;
              }
              const response = await dictionarySearch({
                ...obj,
              });
              if (response) {
                return response;
              } else {
                return {};
              }
            }}
            rowSelection={false}
            
          />
        </Card>
      </Row>
      { addShow ? <Add addShow={addShow} handelAddShow={handelAddShow} list={list} searchHandel={searchHandel} category={category} />  : ""}

      {addCategoryShow ? (
        <CategoryAdd
          addShow={addCategoryShow}
          handelAddShow={addCategory}
          getData={getData}
        />
      ) : (
        ""
      )}
      {
        editCategoryShow ? <CategoryEdit editCategoryShow={editCategoryShow} handelEditShow={editCategory} getData={getData} editData={editCategoryData} /> : ''
      }
      {editShow ? (
        <Edit
          editShow={editShow}
          editData={editData}
          handleEditShow={handleEditShow}
          list={list}
          searchHandel={searchHandel}
          category={category}
        />
      ) : (
        ""
      )}
      
    </div>
  );
};

export default Dictionary;
