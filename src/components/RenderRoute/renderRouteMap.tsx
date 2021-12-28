import RouterGuard from "./routerGuard";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { reactRoutes } from "@/template";
import { dynamicRoutes } from "@/utils/dynamic";

const renderRoutesMap = (routes) =>
  routes.map((route, index) => {
    const mergeRoutes = dynamicRoutes(route, reactRoutes);

    if (mergeRoutes.redirect) {
      return (
        <Redirect
          exact
          key={index + Math.random()}
          to={mergeRoutes.redirect}
          from={mergeRoutes.path}
        />
      );
    }
    // console.log('routes==>>>>>1234', routes)

    return (
      <Route
        key={index}
        path={mergeRoutes.path}
        exact={mergeRoutes.exact}
        render={(props) => {
          return <RouterGuard {...mergeRoutes} {...props} />;
        }}
      />
    );

    // if (mergeRoutes && mergeRoutes.component) {
    //
    // } else {
    //     return (mergeRoutes && mergeRoutes.routes || []).map(item => <Route
    //         key={index}
    //         path={item.path}
    //         exact={item.exact}
    //         render={(props) => (
    //             <RouterGuard
    //                 {...item}
    //                 {...props}
    //             />
    //         )}
    //     />);
    // console.log(childrenRoute);
    // return childrenRoute;
    // }
  });

export default renderRoutesMap;
