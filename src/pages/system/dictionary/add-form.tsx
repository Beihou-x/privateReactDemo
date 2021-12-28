import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Card,
  Button,
  notification,
  Form,
  Input,
  Table,
  Select,
  message,
  InputNumber,
  Divider
} from "antd";
import VForm from "@components/VForm";
import { useHistory } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import {
  dictionaryAdd,
  dictionaryDetail,
  dictionarySearch,
  // dictionaryBatchEdit,
} from "@/services/v1";

import { filterCategory } from "@/utils/utils"

import styles from "./index.less";

const { Option } = Select;

type AddFormProps = {
  match;
};

const AddForm: React.FC<AddFormProps> = (props) => {
  const { match = {} } = props;
  const { params = {} } = match;
  const { id } = params;
  const history = useHistory();
  const formRef: any = useRef(null);
  const [loading, setLoading] = useState(false);
  const [data, setData]: any = useState([
    {
      name: "",
      code: "",
      key: new Date().getTime(),
    },
  ]);
  const [options, setOptions]: any = useState([]);
  const [formData, setFormData] = useState({});

  // 添加自定义字典
  const [customizeDictionary, setCustomizeDictionary] = useState("")

  const [dictionaryList, setDictionList]: any = useState([])


  // 编辑
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  useEffect(() => {
    const list = filterCategory('字典类别')
    setDictionList(list)
  }, [])

  const getData = async () => {
    const res = await dictionaryDetail({ id });
    if (res) {
      setFormData(res);
      const obj = {
        name: res.name,
        code: res.code,
        parent_code: res.parent_code,
        key: new Date().getTime(),
        id: res.id,
      };
      setData([obj]);
      dictionarySearch({ category: res.category }).then((res) => {
        if (res && res.items && res.items.length) {
          const arr = res.items
            .filter((f) => f.code !== res.code)
            .map((m) => {
              return { value: m.code, label: m.name };
            });

          setOptions(arr);
        }
      });
    }
  };

  //新增
  const handleOk = () => {
    const vform = formRef.current.getForm();
    //可以在验证后再获取值
    vform
      .validateFields()
      .then((valid) => {
        const index = data.findIndex((f) => !f.name || !f.code);
        if (index > -1) {
          return notification.error({
            message: "名称和编码不能为空",
          });
        }

        setLoading(true);
        const arr = data.map((m) => {
          return { ...m, ...valid };
        });

        // if (id) {
        //   console.log('arr==',arr)
        //   dictionaryBatchEdit(arr).then((res) => {
        //     setLoading(false);
        //     if (res && res.length === 0) {
        //       message.success("字典编辑成功");
        //       history.goBack();
        //     }
        //   });
        //   return;
        // }

        // 新增字典
        dictionaryAdd(arr).then((res) => {
          setLoading(false);
          if (res ===undefined) {
            message.success("字典添加成功");
            history.goBack();
          }
        });
      })
      .catch((error) => {
        console.log("error", error);
        notification.error({
          message: "有必填项没填",
        });
      });
  };

  const columnsTable = [
    {
      title: "",
      key: "add",
      render: (text, record, index) =>
        data.length - 1 === index ? (
          <PlusOutlined
            onClick={() => handleAdd(record)}
            className={styles.icon}
          />
        ) : (
          ""
        ),
    },
    {
      title: "名称",
      dataIndex: "name",
      key: "name",
      render: (text, record, index) =>
        data.length - 1 === index ? (
          <Input value={text} onChange={(e) => onChange(e, record, "name")} />
        ) : (
          text
        ),
    },
    {
      title: "编码",
      dataIndex: "code",
      key: "code",
      render: (text, record, index) =>
        data.length - 1 === index ? (
          <Input value={text} onChange={(e) => onChange(e, record, "code")} />
        ) : (
          text
        ),
    },
    {
      title: "父级",
      dataIndex: "parent_code",
      key: "parent_code",
      render: (text, record, index) => (
        <Select
          allowClear
          value={text}
          options={options}
          style={{ width: 200 }}
          onChange={(e) => onChange(e, record, "parent_code")}
          onDropdownVisibleChange={(open) => {
            console.log("open", open);
            if (open === true) {
              let arr = [...data];
              if (arr.length) {
                arr.splice(index, 1);
                setOptions(
                  arr.map((m) => {
                    return { value: m.code, label: m.name };
                  })
                );
              }
            }
          }}
        />
      ),
    },
    {
      title: "操作",
      key: "action",
      render: (text, record, index) =>
        data.length - 1 === index && index !== 0 ? (
          <a onClick={() => handleDelete(record)}>删除</a>
        ) : (
          ""
        ),
    },
  ];

  const onChange = (e, record, dataIndex) => {
    const value = dataIndex !== "parent_code" ? e.target.value : e;
    let arr = [...data];
    const index = arr.findIndex((d) => d.key === record.key);
    if (index > -1) {
      let obj = { ...record, [dataIndex]: value };
      arr[index] = obj;
      setData(arr);
    }
  };

  const handleAdd = (record) => {
    if (!record.name || !record.code) {
      return notification.error({
        message: "名称和编码不能为空",
      });
    }
    let arr = [...data];
    arr.push({ name: "", code: "", key: new Date().getTime() });
    setData(arr);
  };

  const handleDelete = (record) => {
    let arr = [...data];
    const index = arr.findIndex((d) => d.key === record.key);
    if (index > -1) {
      arr.splice(index, 1);
      setData(arr);
    }
  };

  const onNameChange = event => {
    setCustomizeDictionary(event.target.value);
    event.target.value = ''
  }
  const addItem = () => {
    const item = {
      name: customizeDictionary,
      label: customizeDictionary
    }
    setDictionList([...dictionaryList, item])
    formRef.current.resetFields()
  }

  const layout = { labelCol: { span: 4 }, wrapperCol: { span: 8 } };
  return (
    <Card bordered={false}>
      <Form {...layout} ref={formRef}>
        <Form.Item name="category" label="字典名称" required>
          <Select
            dropdownRender={menu => (
              <div>
                {menu}
                <Divider style={{ margin: '4px 0' }} />
                <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                  <Input style={{ flex: 'auto' }} onBlur={onNameChange} />
                  <a
                    style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                    onClick={addItem}
                  >
                    <PlusOutlined /> Add item
                  </a>
                </div>
              </div>
            )}>

            {dictionaryList.map((item, index) => (
              <Option value={item.name} key={index} label={item.label}>{item.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="sequence" label="排序">
          <InputNumber />
        </Form.Item>
      </Form>
      <>
        <p>
          <span style={{ color: "#ff4d4f" }}>*</span>子级列表
        </p>
        <div className={styles.tableBox}>
          <Table
            dataSource={data}
            columns={columnsTable}
            pagination={false}
            bordered
          />
        </div>
      </>
      <div style={{ background: "#2B3748", textAlign: "right", marginTop: 20 }}>
        <Button style={{ marginRight: 20 }} onClick={() => history.goBack()}>取消</Button>
        <Button
          type="primary"
          loading={loading}
          onClick={handleOk}
        >
          保存
        </Button>
      </div>
    </Card>
  );
};

export default AddForm;
