import React, { Fragment, Suspense } from "react";
import { withRouter } from "react-router-dom";
import renderRoutesMap from "./renderRouteMap";

const RouterGuard = (props) => {
  const { component, routes = [] } = props;
  const ProfilePage = component;
  return (
    <Fragment>
      <ProfilePage {...props}>{renderRoutesMap(routes)}</ProfilePage>
    </Fragment>
  );
};

export default withRouter(RouterGuard);
