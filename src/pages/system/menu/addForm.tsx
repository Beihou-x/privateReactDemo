import React, {
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import VForm from "../../../components/VForm";
import { Button, message } from "antd";
import { menuAdd } from "@/services/v1";
const addForm = (props, ref) => {
  const {
    treeData = [],
    onSearch,
    selectTree,
    menuComponentSearch = [],
  } = props;
  const layout = { labelCol: { span: 2 }, wrapperCol: { span: 10 } };
  const formRef: any = useRef(null);
  const [data, setData]: any = useState({});
  const [component_id, setSelectComponentid]: any = useState("");
  const [loading, setLoading] = useState(false);
  const [keys, setKeys]: any = useState([]);

  useEffect(() => {
    if (treeData && treeData.length) {
      setKeys([treeData[0].id]);
    } else {
      setKeys([]);
    }
  }, [treeData]);

  //ref就是父组件传过来的ref
  useImperativeHandle(ref, () => ({
    //getForm就是暴露给父组件的方法
    onReset: () => onReset(),
  }));
  useEffect(() => {
    if (selectTree) {
      setData(selectTree);
      setSelectComponentid(selectTree.component_id);
    }
  }, [selectTree]);
  const columns = [
    {
      name: "parent_id",
      label: "上级菜单",
      type: "treeSelect",
      treeData: treeData,
      treeDefaultExpandedKeys: keys,
    },
    { name: "title", label: "菜单名称", rules: [{ required: true }] },
    {
      name: "component",
      label: "菜单id",
      rules: [{ required: true }],
      type: "autoComplete",
      list: menuComponentSearch,
      filterOption: (inputValue, option) => option.value.includes(inputValue),
      onChange: (a, option) => setSelectComponentid(option.id ? option.id : ""),
    },
    { name: "path", label: "菜单path", disabled: true },
    { name: "short_path", label: "菜单短path" },
    { name: "icon_name", label: "图标" },
    {
      name: "hidden",
      label: "是否隐藏菜单",
      type: "switch",
    },
    {
      name: "disable",
      label: "是否无效菜单",
      type: "switch",
    },
    {
      name: "is_display",
      label: "是否首页展示",
      type: "switch",
    },
    {
      name: "sequence",
      label: "排序",
      type: "inputNumber",
      rules: [{ required: true }],
    },
  ];
  const onReset = () => {
    const form = formRef.current.getForm();
    form.resetFields();
  };
  const onSave = () => {
    const form = formRef.current.getForm();
    //可以在验证后再获取值
    form
      .validateFields()
      .then((valid) => {
        let params = {
          name: valid.title,
          ...valid,
        };
        if (data && data.id) {
          params.id = data.id;
        }
        if (component_id) {
          params.component_id = component_id;
        }
        setLoading(true);
        menuAdd({
          ...params,
        }).then((res) => {
          setLoading(false);
          if (res===undefined) {
            onSearch && onSearch();
            if (data && data.id) {
              message.info("编辑菜单成功");
            } else {
              onReset();
              message.info("新增菜单成功");
            }
          }
        });
      })
      .catch((e) => {});
  };

  return (
    <div>
      <VForm
        columns={columns}
        ref={formRef}
        span={24}
        layoutCol={layout}
        // initialValues={initialValues}
        data={data}
      >
        <div style={{ marginLeft: 34, textAlign: "right", width: "48%" }}>
          <Button type="primary" onClick={() => onSave()} loading={loading}>
            保 存
          </Button>
          <Button style={{ marginLeft: 20 }} onClick={() => onReset()}>
            取 消
          </Button>
        </div>
      </VForm>
    </div>
  );
};

export default forwardRef(addForm);
