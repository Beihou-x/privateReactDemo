import React, { useEffect, useRef, useState } from "react";
import { Card, Row, message } from "antd";
import Tree from "./tree";
import AddForm from "./addForm";
import { menuSearch, menuComponentSearch, menusDelete } from "@/services/v1";
import { getTreeData } from "@/utils/utils";

const Menu = () => {
  const [menus, setMenus]: any = useState([]);
  const [menuComponent, setMenuComponent]: any = useState([]);
  const [selectTree, setSelectTree]: any = useState({});
  const formRef: any = useRef();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onSearch();
    menuComponents();
  }, []);

  const onSearch = () => {
    setLoading(true);
    menuSearch({}).then((res) => {
      setLoading(false);
      if (res && res.items) {
        setMenus(getTreeData(res.items));
      }
    });
  };
  const menuComponents = () => {
    menuComponentSearch({}).then((res) => {
      if (res && res.items) {
        setMenuComponent(
          res.items.map((m) => {
            return {
              label: `${m.name}-${m.component}`,
              value: m.component,
              id: m.id,
            };
          })
        );
      }
    });
  };

  const onSelectTree = (values) => {
    const ref = formRef.current;
    ref && ref.onReset();
    setSelectTree(values);
  };

  // 新增菜单
  const addForm = () => {
    const ref = formRef.current;
    ref && ref.onReset();
    setSelectTree({});
  };
  const deleteMenus = (ids) => {
    menusDelete({ ids }).then((res) => {
      if (res===undefined) {
        onSearch();
        menuComponents();
        const ref = formRef.current;
        ref && ref.onReset();
      }
    });
  };

  return (
    <div>
      <Row>
        <Card style={{ height: "70vh", width: 340 }}>
          <Tree
            data={menus}
            onSelectTree={onSelectTree}
            addForm={addForm}
            deleteMenus={deleteMenus}
            loading={loading}
          />
        </Card>
        <Card
          style={{
            width: "calc(100% - 360px)",
            minWidth: "600px",
            marginLeft: 20,
          }}
        >
          <AddForm
            ref={formRef}
            treeData={menus}
            menuComponentSearch={menuComponent}
            onSearch={onSearch}
            selectTree={selectTree}
          />
        </Card>
      </Row>
    </div>
  );
};

export default Menu;
