export function dynamicRoutes(route, component) {
  if (route && route.id) {
    let routes = (component || []).find((item) => item && item.id === route.id);
    return {
      ...routes,
      ...route,
    };
  }
}
