import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  WeiboCircleOutlined,
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
import { Alert, notification } from "antd";
import React, { useEffect, useState, useContext } from "react";
import { LoginParamsType, login } from "@/services/login";
import LoginForm from "./components/Login";
import { connect, DispatchProp } from "react-redux";
import styles from "./style.less";
import { createHashHistory } from "history";
import { DefaultPubSubContext } from "@components/PubSubscribe";
import jwtDecode from "jwt-decode";

import { setJWTToken } from "@/utils/authority";
import { fetchRouter, getProjectName, fetchRouter1,fetchPermissionRouter } from "@/services/v1";
import { useHistory } from "react-router-dom";
import { stringify } from "querystring";
import { getPageQuery } from "@/utils/utils";
import { Helmet, HelmetProvider } from "react-helmet-async";
import logo from "@/assets/logo.png";

const { Tab, UserName, Password, Mobile, Captcha, Submit } = LoginForm;
interface LoginProps extends DispatchProp {
  userLogin: any;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = props => {
  const { userLogin = {}, submitting, dispatch } = props;
  const history = useHistory();
  const { status, type: loginType } = userLogin;
  const [autoLogin, setAutoLogin] = useState(true);
  const [type, setType] = useState<string>("account");
  const { subscribe, pushlist } = useContext(DefaultPubSubContext);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    getProjectName({}).then(res => {
      setProjectName(res || "");
    });
  }, []);

  const getData = data => {
    return (data || []).map(m => {
      const { id, component, routes, ...others } = m;
      if (routes) {
        return {
          id: component,
          routes: getData(routes),
          ...others,
        };
      } else {
        return {
          id: component,
          ...others,
        };
      }
    });
  };

  const fetchRouters = async () => {
    try {
      const response: any = await fetchPermissionRouter();
      // const response: any = await fetchRouter({});
      dispatch({
        type: "FETCHROUTER",
        routes: getData((response && response.items) || []),
        // routes: response || [],
      });
    } catch (e) {
      notification.error({
        message: `${e}`,
      });
    }
  };

  const handleSubmit = async (values: LoginParamsType) => {
    try {
      const response = await login(values);
      // console.log("loginRes=====>>>>>>>>>", response);
      if(response.token) {
        const userInfo = await jwtDecode(response.token);
        await setJWTToken(response.token);
        await window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
        await fetchRouters();

        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params as { redirect: string };

        
        history.replace("/visualization");
      }
      
    } catch (e) {
      console.log(e,'////');
      
      notification.error({
        message: `${e}`,
      });
    }
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>{projectName}</title>
        <meta name="description" content={projectName} />
      </Helmet>
      <div className={styles.container}>
        <div className={styles.headTitle}>
          <img
            src={logo}
            style={{
              width: 26,
              height: 26,
              verticalAlign: "sub",
              marginRight: 10,
            }}
            alt=""
          />
          {projectName}
        </div>
        <div className={styles.mainContent}>
          <div className={styles.leftContent}>
            <div className={styles.projectTitleContent}>
              <div className={styles.title}>{projectName}</div>
            </div>
          </div>
          <div className={styles.content}>
            <div style={{ height: "50vh" }}>
              <div className={styles.main}>
                <div className={styles.userLogin}>用户登录</div>
                <LoginForm
                  activeKey={type}
                  onTabChange={setType}
                  onSubmit={handleSubmit}
                >
                  <UserName
                    autoComplete="off"
                    prefix={<UserOutlined />}
                    name="userName"
                    placeholder="请输入用户名"
                    // twoToneColor="#3E58B6"
                    rules={[
                      {
                        required: true,
                        message: "用户名不能为空",
                      },
                    ]}
                  />
                  <Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    name="password"
                    placeholder="请输入密码"
                    // twoToneColor="#3E58B6"
                    rules={[
                      {
                        required: true,
                        message: "密码不能为空",
                      },
                    ]}
                  />
                  <Submit loading={submitting}>
                    登录<span style={{ display: "none" }}>20210607</span>
                  </Submit>
                </LoginForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect()(Login);
