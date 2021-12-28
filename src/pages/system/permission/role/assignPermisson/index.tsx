import React, { useRef, useState, useEffect } from "react";
import StandardTable from "@components/Table";
import {
  Card,
  Input,
  Button,
  Tree,
  Row,
  Spin,
  Divider,
  Popconfirm,
} from "antd";
import { useHistory } from "react-router-dom";
import SearchForm from "@components/SearchForm";
import {
  menuSearch,
  getDataPermission,
  addRoleOperationPermission,
  revokeRoleOperationPermission,
  addRoleDataPermission,
  revokeRoleDataPermission,
} from "@/services/v1";

const ViewMember = (props) => {
  const id = props.match.params.id;
  const name = props.match.params.name
  const history = useHistory();

  const [operationList, setOperationList]: any = useState([]);
  const [dataList, setDataList]: any = useState([]);
  const [defaultOperation, setDefaultOperation]: any = useState([]);
  const [defaultData, setDefaultData]: any = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getOperationList();
    getDataList();
    setLoading(false);
  }, []);

  // 获取数据权限列表及默认选中
  const getDataList = async () => {
    const result = await getDataPermission(id);
    if (result && result.items) {
      let arr: any = [];
      result.items.forEach((item) => {
        if (item.is_scope) {
          arr.push(item.code);
        }
      });
      setDefaultData(arr);
      setDataList(getDataTreeData(result.items));
    }
  };
  // 获取操作权限列表
  const getOperationList = async () => {
    const res = await menuSearch({team_ids: [id]});
    if (res && res.items) {
      getdefaultList(res.items);
      setOperationList(getTreeData(res.items));
    }else {
      setOperationList([]);
    }
  };
  // 获取操作列表默认选中数据
  let arr: any = [];
  const getdefaultList = (data) => {
    data.forEach((item) => {
      if (item.ownered) {
        arr.push(item.id);
      }
      if (item.routes) {
        getdefaultList(item.routes);
      }
    });
    setDefaultOperation(arr);
  };
  // 操作权限列表保存
  const saveOperation = async (val) => {
    setLoading(true);
    await addRoleOperationPermission(id, val);
    getOperationList();
    setLoading(false);
  };
  // 操作权限列表删除
  const deleteOperation = async (ids) => {
    setLoading(true);
    await revokeRoleOperationPermission(ids);
    getOperationList();
    setLoading(false);
  };
  // 获取操作列表树形数据
  const getTreeData = (data) => {
    return (data || []).map((m) => {
      const { name, id, routes, ownered, ...others } = m;
      if (routes) {
        return {
          title: name,
          key: id,
          value: id,
          children: getTreeData(routes),
          ...others,
        };
      } else {
        return {
          title: name,
          key: id,
          value: id,
          ...others,
        };
      }
    });
  };
  // 获取数据列表树形数据
  const getDataTreeData = (data) => {
    return (data || []).map((m) => {
      const { name, code, id, ...others } = m;
      return {
        title: code,
        key: code,
        value: code,
        ...others,
      };
    });
  };
  // 取消操作权限时,遍历获取authority_id
  const getdelAuthorityId = (data) => {
    let arr: any = [];
    const getChildId = (children) => {
      children.forEach((item) => {
        arr.push(item.authority_id);
        if (item.children) {
          getChildId(item.children);
        }
      });
    };
    arr.push(data.authority_id);
    if (data.children) {
      getChildId(data.children);
    }
    return arr;
  };


  // 操作权限树形check事件
  const operationTreeCheck = (checkedKeys, e) => {
    console.log(checkedKeys, e,'aaaaaa');
    
    if (e.checked) {
      saveOperation(checkedKeys.checked);
    } else {
      let arr = getdelAuthorityId(e.node);
      deleteOperation(arr);
    }
  };
  // 操作权限check事件中,如果选中子节点,但是父节点未选中,过滤出父节点id, 并选中父节点
  const getParentId = (checkedKeys, e) =>{
    let arr = [];
    if(checkedKeys.includes(e.node.parent_id)) {

    }

    
  }


  // 数据权限树形check事件
  const dataTreeCheck = (checkedKeys, e) => {
    if (e.checked) {
      saveData(checkedKeys);
    } else {
      deleteData(e.node.authority_scope_id);
    }
  };
  // 数据权限保存
  const saveData = async (scope_ids) => {
    setLoading(true);
    await addRoleDataPermission(id, scope_ids);
    getDataList();
    setLoading(false);
  };
  // 取消某个数据权限
  const deleteData = async (authority_id) => {
    setLoading(true);
    await revokeRoleDataPermission(authority_id);
    getDataList();
    setLoading(false);
  };
  return (
    <>
      <Card bordered={false}>
        <div style={{marginBottom: 20}}>
          <span>角色名称: </span>
          <span>{name}</span>
        </div>
        <Spin spinning={loading}>
          <Row>
            <Card style={{ height: "70vh", overflowY: "auto", width: 400 }} title="操作权限">
              {/* <div>操作权限</div> */}
              <Tree
                key={JSON.stringify(operationList)}
                checkable
                treeData={operationList}
                defaultExpandAll={true}
                checkStrictly={true}
                onCheck={operationTreeCheck}
                checkedKeys={defaultOperation}
                // defaultCheckedKeys={defaultOperation}
              ></Tree>
            </Card>

            <Card
              title="数据权限"
              style={{
                height: "70vh",
                overflowY: "auto",
                width: 400,
                marginLeft: 100,
              }}
            >
              <Tree
                key={JSON.stringify(dataList)}
                checkable
                treeData={dataList}
                onCheck={dataTreeCheck}
                checkedKeys={defaultData}
              ></Tree>
            </Card>
          </Row>
        </Spin>

        <div
          style={{ background: "#2B3748", textAlign: "right", marginTop: 20 }}
        >
          <Button type="primary" onClick={() => history.goBack()}>
              返回
          </Button>
        </div>
      </Card>
    </>
  );
};

export default ViewMember;
