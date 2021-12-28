import {
  MenuDataItem,
  getMenuData,
  getPageTitle,
} from "@ant-design/pro-layout";
import { Helmet, HelmetProvider } from "react-helmet-async";
import React, { useEffect, useState } from "react";
import styles from "./UserLayout.less";
import { getProjectName } from "@/services/v1";
import { connect, DispatchProp } from "react-redux";
export interface UserLayoutProps {
  breadcrumbNameMap?: {};
  route?: {
    routes: Array<object>;
  };
  location?: {
    pathname: string;
  };
  children?: any;
}

const UserLayout: React.FC<UserLayoutProps> = (props) => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: "",
    },
  } = props;
  const [projectName, setProjectName] = useState("");

  console.log("1111", children);

  useEffect(() => {
    getProjectName({}).then((res) => {
      setProjectName(res || "");
    });
  }, []);

  const { breadcrumb } = getMenuData(routes);
  const title = getPageTitle({
    pathname: location.pathname,
    breadcrumb,
    title: projectName,
    ...props,
  });
  console.log('title', title)
  return (
    <HelmetProvider>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={title} />
      </Helmet>

      <div className={styles.container}>
        <div className={styles.content}>
          <div style={{ height: "50vh" }}>
            <div className={styles.top}>
              <div className={styles.header}>
                <h1>{projectName}</h1>
              </div>
            </div>
            {children}
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default connect()(UserLayout);
