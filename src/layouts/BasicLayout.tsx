import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Breadcrumb, Dropdown, Row, Col, Badge, Modal, message, Button } from "antd";
import styles from "./BasicLayout.less";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { DefaultFooter } from "@ant-design/pro-layout";
import { UserOutlined } from "@ant-design/icons";
import { createHashHistory } from "history";
import { expandRoutes, filterBreadcrumb, checkHasPage, getUrl } from "@/utils/utils";
import { getProjectName, dictionarySearch } from "@/services/v1";
import { changePassWord } from "@/services/v2";
import { useHistory } from "react-router-dom";
import { stringify } from "querystring";
import Vform from "@components/VForm"
import { fromPairs, lowerFirst } from "lodash";
import help from '@/assets/help.svg';

type routes = {
  id: string;
  name: string;
  path: string;
  routes: routes[];
  hidden: boolean;
};

type BasicLayoutProps = {
  routes?: routes[];
  location?: {
    pathname?: string;
  };
};
const { Sider, Header, Content } = Layout;
const { SubMenu } = Menu;
const BasicLayout: React.FC<BasicLayoutProps> = ({
  routes = [],
  location = {},
  children,
  ...props
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [defaultServiceUrl, setUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const onCollapse = (collapseds) => {
    setCollapsed(collapseds);
  };

  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjectName({}).then((res) => {
      setProjectName(res || "");
      document.title = res || "";
    });
    fetchCodes();
  }, []);
  useEffect(() => {
    if (location.pathname === "/") {
      history.replace({
        pathname: "/visualization",
      });
    }
  }, [location.pathname]);

  const fetchCodes = async () => {
    // 缓存字典信息
    const dictionarys = await dictionarySearch({});
    window.localStorage.setItem(
      "dictionaryInfo",
      JSON.stringify(dictionarys.items || [])
    );
  };

  const isShow =
    location.pathname === "/dashboard/summarize" ||
      location.pathname === "/dashboard/monitor"
      ? true
      : false;

  // 只有一级菜单
  const arr = (routes || []).filter((f) => !f.routes).map((m) => m.name);

  const renderMenu = (routes): any => {
    return (routes || [])
      .filter((f) => !f.hidden)
      .map((item) => {
        if (item && item.routes) {
          return (
            <SubMenu key={item.path} title={item.name}>
              {renderMenu(item.routes)}
            </SubMenu>
          );
        }
        // if (item && item.hidden) {
        //   return <div key={item.path}></div>;
        // }
        return (
          <Menu.Item key={item.path} style={{ background: item && item.disable ? '#f5f5f5' : '' }}>
            {item && item.disable ? (
              <span style={arr.includes(item.name) ? { fontSize: "18px", color: '#00000040' } : { color: '#00000040' }}>
                {item.name}
              </span>
            ) : (
              <Link
                to={item.path}
                style={
                  arr.includes(item.name)
                    ? {
                      fontSize: "18px",
                    }
                    : {}
                }
              >
                {item.name}
              </Link>
            )}
          </Menu.Item>
        );
      });
  };

  const logout = () => {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
    localStorage.removeItem("dictionaryInfo");
    localStorage.removeItem("configObject");
    // createHashHistory().push("/user/login");
    history.replace({
      pathname: "/user/login",
      search: stringify({
        redirect: window.location.href,
      }),
    });
  };
  const childRef: any = useRef(null);
  const columns = [
    { name: 'old_password', label: "旧密码", rules: [{ required: true }] },
    { name: 'new_password', label: "新密码", rules: [{ required: true }] },
  ]
  const changePassword = () => {
    setModalVisible(true);
  }
  const handleCancel = () => {
    setModalVisible(false);
  }
  const handleOk = () => {
    let str: any = localStorage.getItem("userInfo")
    const userName = JSON.parse(str).username;

    const form = childRef.current.getForm();
    form.validateFields().then(valid => {
      changePassWord(userName, valid).then(res => {
        if (res === undefined) {
          message.success('密码修改成功,请重新登录!');
          logout();
        }
        form.resetFields();
      }).catch(e => {
        form.resetFields();
        message.error('密码修改失败!')
      })
    })
    setModalVisible(false);
  }
  const layoutCol = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a type="text" onClick={changePassword} >
          修改密码
        </a>
      </Menu.Item>
      <Menu.Item key="1">
        <a type="text" onClick={logout}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  const breadcrumbList =
    filterBreadcrumb({
      routes: expandRoutes(routes),
      path: location.pathname,
    }) || [];
  const renderBreadcrumb = (routes) => {
    return (breadcrumbList || []).map((item) => {
      return (
        <Breadcrumb.Item key={item.path}>
          <a>{item.name}</a>
        </Breadcrumb.Item>
      );
    });
  };

  // 下载帮助文档
  const handleClick = async () => {
    setLoading(true);
    const url = await getUrl();
    window.open(url.defaultServiceUrl + 'krakatoa/api/v2/doc/manual.docx');
    setLoading(false);
  }

  const demoImageUrl = checkHasPage({
    routes: expandRoutes(routes),
    path: location.pathname,
  });
  const flag =
    breadcrumbList &&
    breadcrumbList.length &&
    breadcrumbList[0].name === "可视化管理";
  const layout = (
    <Layout className={styles.basiclayout}>
      <Header style={{ padding: "0 20px" }}>
        <Row>
          <Col>
            <div className={styles.logo}>
              <img
                src={logo}
                alt="logo"
                width="32"
                style={{ marginRight: 10 }}
              />
              <Link to="/">{projectName}</Link>
            </div>
          </Col>
        </Row>
      </Header>
      <div style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '85%' }}>
          <Menu
            theme="light"
            mode="horizontal"
            defaultSelectedKeys={[`${location.pathname}`]}
            selectedKeys={[`${location.pathname}`]}
          >
            {renderMenu(routes)}
          </Menu>
        </div>
        <div style={{ height: 60, width: '15%', display: 'flex', alignItems: 'center', justifyContent: 'right', paddingRight: 20 }}>
          <Button type='link' loading={loading} onClick={() => handleClick()}>
            <img src={help} style={{ width: 18, height: 18, cursor: 'pointer', marginRight: '-40px' }} title='帮助说明' />
          </Button>
          <div style={{ marginTop: 10 }}>
            <Dropdown.Button
              overlay={menu}
              placement="bottomCenter"
              icon={<UserOutlined style={{ color: "#C1C5CA" }} />}
            ></Dropdown.Button>
          </div>
        </div>

      </div>
      <Layout>
        <Content
          className={`${styles.content} ${!flag ? styles.content1 : ""}`}
        >

          <Breadcrumb separator=">">
            {breadcrumbList && breadcrumbList.length ? <Breadcrumb.Separator>
              <span style={{ color: '#c1c5ca', fontSize: '14px' }}> 当前位置：</span>
            </Breadcrumb.Separator> : ''}
            {/* <Badge status="processing" color="#108ee9" />
            <Breadcrumb.Item href="/#/home">首页</Breadcrumb.Item> */}
            {renderBreadcrumb(routes)}
          </Breadcrumb>
          {/* 
          <PageTabs
            location={location}
            routes={routes}
          >
            {
              children
            }
          </PageTabs> */}

          {demoImageUrl ? (
            <div style={{ width: "100%" }}>
              <img
                src={`${window.location.origin + demoImageUrl}`}
                style={{ width: "100%" }}
              ></img>
            </div>
          ) : (
            children
          )}
        </Content>
        <div style={{ background: "#222937" }}>
          {isShow ? null : (
            <DefaultFooter links={[]} copyright="苏州市公安局" />
          )}
        </div>
      </Layout>
      <Modal
        title="修改密码"
        width={700}
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleOk}
      >
        <Vform columns={columns} span={24} ref={childRef} layoutCol={layoutCol}></Vform>
      </Modal>
    </Layout>
  );

  return <>{layout}</>;
};

export default BasicLayout;
