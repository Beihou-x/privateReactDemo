import React, { useContext, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import UserLayout from "@/layouts/UserLayout";
import Login from "@/pages/user/login";
import { connect } from "react-redux";
import renderRoutesMap from "./renderRouteMap";
import { fetchRouter, fetchPermissionRouter } from "@/services/v1";
import { notification } from "antd";
import { Dispatch } from "redux";

interface RenderRouteProps {
  routes: object[];
  dispatch: Dispatch;
}

const RenderRoute: React.FC<RenderRouteProps> = ({ routes = [], dispatch }) => {
  useEffect(() => {
    fetchRouters();
  }, []);

  const getData = (data) => {
    return (data || []).map((m) => {
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
      // const response: any = await fetchRouter({});
      const response: any = await fetchPermissionRouter();
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

  return (
    <Router>
      <Switch>
        {/* <Route component={UserLayout}>
          <Route path="/user/login" exact={true} component={Login}></Route>
        </Route> */}
        <Route path="/user/login" exact={true} component={Login}></Route>
        {renderRoutesMap(routes || [])}
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => {
  return {
    routes: state.routes,
  };
};

export default connect(mapStateToProps)(RenderRoute);
