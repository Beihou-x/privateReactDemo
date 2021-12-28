import React, { useContext, useEffect, useState } from 'react';
import {
  Tabs
} from 'antd';
import { expandRoutes, filterBreadcrumb } from "@/utils/utils";
import { DefaultPubSubContext } from '@components/PubSubscribe';
import { reactRoutes } from '@/template';

const { TabPane } = Tabs;

type Routes = {
  id: string;
  name: string;
  path: string;
  routes: Routes[];
  hidden: boolean;
};

type PageTabsProps = {
  routes?: Routes[];
  location: {
    pathname?: string;
  }
};

const TabPaneComponent = (component, props) => {
  const ProfilePage = component && component || <></>;

  return (
    <ProfilePage {...props} />
  );
};

const PageTabs: React.FC<PageTabsProps> = ({
  children,
  routes,
  location,
  ...props
}) => {
  const { subscribe, unsubscribe } = useContext(DefaultPubSubContext);
  const [tabList, setTab]: any = useState<Array<{
    name: string;
    id: string;
  }>>([]);
  const [values, setValue] = useState<Partial<{
    id: string;
  }>>({});

  useEffect(() => {
    subscribe('basiclayout:tabs', setValue);

    return () => unsubscribe('basiclayout:tabs', setValue);
  }, []);

  useEffect(() => {
    if (Object.keys(values).length !== 0) {
      setTab([...tabList, {
        ...values,
        id: values && values.id && values.id,
        uuid: values && values.id && values.id + Math.random() || ""
      }]);
    }
  }, [values]);

  // const breadcrumbList = filterBreadcrumb({
  //   routes: expandRoutes(routes),
  //   path: location.pathname
  // });

  // let route: Partial<Routes> = breadcrumbList[breadcrumbList.length - 1];

  const onEdit = (targetKey, action) => {
    if (action === 'remove') {
      console.log(tabList.filter(q => q.uuid !== targetKey));
      setTab(tabList.filter(q => q.uuid !== targetKey))
    }
  };

  return (
    <Tabs
      onEdit={onEdit}
      hideAdd
      type="editable-card"
    >
      <TabPane
        // tab={route && route.name || ""}
        closeIcon={() => (
          <></>
        )}
      >
        {children}
      </TabPane>
      {
        (tabList || []).map(item => (
          <TabPane tab={item && item.name} key={item.uuid}>
            {
              TabPaneComponent((reactRoutes as any).find(q => q.id === item.id).component, {
                ...props,
                ...item
              })
            }
          </TabPane>
        ))
      }
    </Tabs>
  );
};

export default PageTabs;