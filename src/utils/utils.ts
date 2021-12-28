import pathRegexp from "path-to-regexp";
import moment from "moment";
import { parse } from "querystring";
import { message } from "antd";

export const getRouteAuthority = (path: string, routeData: any) => {
  let authorities: string[] | string | undefined;
  routeData.forEach((route) => {
    // match prefix
    if (pathRegexp(`${route.path}/(.*)`).test(`${path}/`)) {
      if (route.authority) {
        authorities = route.authority;
      }
      // exact match
      if (route.path === path) {
        authorities = route.authority || authorities;
      }
      // get children authority recursively
      if (route.routes) {
        authorities = getRouteAuthority(path, route.routes) || authorities;
      }
    }
  });
  return authorities;
};

//取出对象值
const get = (p) => (o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

/**
 * format对象
 * @param fileNames value值为数组
 * */
export const formatObject = (target, fileNames) => {
  let obj = {};

  Object.keys(fileNames).map((item) => {
    let getValue = get(fileNames[item]);

    getValue(target);

    obj[item] = getValue(target);
  });

  return obj;
};

//删除空值对象
export const deleteEmptyKey = (params) => {
  Object.keys(params).map((item) => {
    if (!params[item]) {
      delete params[item];
    }
  });

  return params;
};

//展开routes
export const expandRoutes = (arr) =>
  (arr || []).reduce((routes, item) => {
    routes.push(item);

    return routes.concat(
      (item && item.routes && expandRoutes(item.routes)) || []
    );
  }, []);

//过滤面包屑导航
// export const filterBreadcrumb = ({ routes, path }) =>
//   (routes || []).filter((q) =>
//     q && q.path && path
//       ? eval(`/^${q && q.path ? q.path.replaceAll("/", "\\/") : ""}/`).test(
//           path
//         )
//       : false
//   );
export const filterBreadcrumb = ({ routes, path }) => {
  return (routes || []).filter((q) =>
    // q && q.path && path ? path.indexOf(q.path) >= 0 && !q.hidden : false
    q && q.path && path ? path.indexOf(q.path) >= 0 : false
  );
};

// 校验子页面是否存在
export const checkHasPage = ({ routes, path }) => {
  const arr = (routes || []).filter((q) =>
    q && q.path && path ? path === q.path : false
  );
  if (arr.length) {
    const obj = arr[0];
    return obj.demoImageUrl || "";
  }
  return "";
};

export const normalizeLink = (to: string, location = window.location) => {
  to = to || "";

  if (to && to[0] === "#") {
    to = location.pathname + location.search + to;
  } else if (to && to[0] === "?") {
    to = location.pathname + to;
  }

  const idx = to.indexOf("?");
  const idx2 = to.indexOf("#");
  let pathname = ~idx
    ? to.substring(0, idx)
    : ~idx2
      ? to.substring(0, idx2)
      : to;
  let search = ~idx ? to.substring(idx, ~idx2 ? idx2 : undefined) : "";
  let hash = ~idx2 ? to.substring(idx2) : location.hash;

  if (!pathname) {
    pathname = location.pathname;
  } else if (pathname[0] != "/" && !/^https?\:\/\//.test(pathname)) {
    let relativeBase = location.pathname;
    const paths = relativeBase.split("/");
    paths.pop();
    let m;
    while ((m = /^\.\.?\//.exec(pathname))) {
      if (m[0] === "../") {
        paths.pop();
      }
      pathname = pathname.substring(m[0].length);
    }
    pathname = paths.concat(pathname).join("/");
  }

  return pathname + search + hash;
};

// 获取下拉值
export const filterCategory = (category) => {
  // console.log("arr===", arr);
  const dictionarys = localStorage.getItem("dictionaryInfo") || "";
  const dictionaryInfo: any = dictionarys ? JSON.parse(dictionarys) : [];

  return dictionaryInfo
    .filter((f) => f.category === category)
    .map((m) => {
      return { ...m, label: m.name, value: m.code };
    });
};

// 获取字典相应code所对应name值
export const filterCategoryValue = (category: any, code: any) => {
  const codes = filterCategory(category);
  if (codes && codes.length) {
    const obj = codes.find((f) => f.code === code) || {};
    return obj.name || "";
  } else {
    return "";
  }
};

// 修改字典过滤公共方法, 将value由字典code改为id
export const filterCategoryId = (category) => {
  const dictionarys = localStorage.getItem("dictionaryInfo") || "";
  const dictionaryInfo: any = dictionarys ? JSON.parse(dictionarys) : [];

  return dictionaryInfo
    .filter((f) => f.category === category)
    .map((m) => {
      return { ...m, label: m.name, value: m.id };
    });
};

// 获取相应key所对应value值
export const getCodeValue = (codes: any, key: any) => {
  if (codes && codes.length) {
    const obj = codes.find((f) => f.value === key) || {};
    return obj.label || "";
  } else {
    return "";
  }
};
// 根据label,获取对应value
export const getLabelValue = (codes: any, label: any) => {
  if (codes && codes.length) {
    const obj = codes.find((f) => f.label === label) || {};
    return obj.value || "";
  } else {
    return "";
  }
}

/**
 * 和filterCategory的区别是,返回的对象value和label一样,都是name
 * @param category 字典类别
 * @returns 
 */
export const getLabelCategory = (category) => {
  // console.log("arr===", arr);
  const dictionarys = localStorage.getItem("dictionaryInfo") || "";
  const dictionaryInfo: any = dictionarys ? JSON.parse(dictionarys) : [];

  return dictionaryInfo
    .filter((f) => f.category === category)
    .map((m) => {
      return { ...m, label: m.name, value: m.name };
    });
};

// 时间戳转时间字符串
export const formatDate = (date, fmt = "") => {
  if (date) {
    return moment(date * 1000).format(fmt);
  }
  return "-";
};

// 时间戳转时间字符串
export const formatDatetime = (date, fmt = "") => {
  if (date) {
    return moment(date).format(fmt);
  }
  return "-";
};

const getDay = (day: any) => {
  var today = new Date();
  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day;
  today.setTime(targetday_milliseconds);
  var tYear = today.getFullYear();
  var tMonth = today.getMonth();
  var tDate = today.getDate();
  tMonth = doHandleMonth(tMonth + 1);
  tDate = doHandleMonth(tDate);
  // return tYear+"-"+tMonth+"-"+tDate; //年月日
  return tMonth + "-" + tDate; //月日
};

const doHandleMonth = (month) => {
  var m = month;
  if (month.toString().length == 1) {
    m = "0" + month;
  }
  return m;
};

export const getDates = (e) => {
  let data: any = [];
  //拼接
  data.splice(0); //请控之前的数据
  for (let i = 0; i < e; i++) {
    data.push(getDay(-i)); //-i 代表之前  i代表将来
  }
  return data.reverse();
};

// 解析url
export const getUrlProps = (url: any) => {
  // "https://www.baidu.com/s?ie=utf-8&f=3&rsv_bp=0"
  const str: any = url.slice(url.indexOf("?") + 1); //结果：ie=utf-8&f=3&rsv_bp=0
  let arr = str.split("&"); //结果： ["ie=utf-8", "f=3", "rsv_bp=0"]
  let obj: any = {};
  for (let i = 0; i < arr.length; i++) {
    let newArr: any = arr[i].split("="); //结果：["ie", "utf-8"]，["f", "3"]，["rsv_bp", "0"]
    obj[newArr[0]] = newArr[1];
  }
  return obj;
};

// 开始时间 0时0分0秒
export const formatStartData = (val, fmt = "X") => {
  if (val) {
    return moment(val).startOf("day").format(fmt);
  }

  return "";
};
// 结束时间 23时59分59秒

export const formatEndData = (val, fmt = "X") => {
  if (val) {
    return moment(val).endOf("day").format(fmt);
  }

  return "";
};

//格式化时间-》字符串
export const formatTime = (val) => {
  if (val) {
    return moment(val).unix().toString();
  }

  return "";
};

// 时间戳转换
export const formatTimestamp = (val, type = "string") => {
  if (val && type === "string") {
    return moment(val).unix().toString();
  } else if (val && type === "number") {
    return moment(val).unix();
  }

  return "";
};

export const getPageQuery = () => parse(window.location.href.split("?")[1]);

export const getUrl = async () => {
  const config = window.localStorage.getItem("configObject");
  const serviceUrl = config
    ? JSON.parse(config)
    : await fetch(`config.json?t=${new Date().getTime()}`).then((response) =>
      response.json()
    );
  !config &&
    window.localStorage.setItem("configObject", JSON.stringify(serviceUrl));

  return serviceUrl;
};

// 对象删除空值属性
export const delUndefined = (ob) => {
  for (let e in ob) {
    if (typeof ob[e] === "undefined" || ob[e] === null || ob[e] === "") {
      delete ob[e];
    } else if (ob[e].constructor === Object) {
      if (Object.keys(ob[e]).length === 0) {
        delete ob[e];
      } else {
        delUndefined(ob[e]);
      }
    } else if (ob[e].constructor === Array) {
      ob[e].map(function (seg) {
        if (typeof seg === "object") {
          delUndefined(seg);
        }
      });
    }
  }
  return ob;
};

// 获取相应标签下数量
export const getCounts = (list, name) => {
  if (list && list.length) {
    const obj = list.find((f) => f.name === name) || {};
    return obj.value || 0;
  } else {
    return 0;
  }
};

export const getTreeData = (data) => {
  return (data || []).map((m) => {
    const { name, routes, ...others } = m;
    if (routes) {
      return {
        title: name,
        key: others.id,
        value: others.id,
        children: getTreeData(routes),
        ...others,
      };
    } else {
      return {
        title: name,
        key: others.id,
        value: others.id,
        ...others,
      };
    }
  });
};

// export const bigNumberTransform = value => {
//   const newValue: any = ["", "", ""];
//   let fr = 1000;
//   let num = 3;
//   let text1 = "";
//   let fm = 1;
//   while (value / fr >= 1) {
//     fr *= 10;
//     num += 1;
//   }
//   if (num <= 8) {
//     // 万
//     // 万
//     if (num === 8) {
//       text1 = '千万';
//       fm = 10000000;
//     } else if (num === 7) {
//       text1 = '百万';
//       fm = 1000000;
//     } else if (num === 5 || num === 6) {
//       text1 = '万';
//       fm = 10000;
//     }
//     // text1 = parseInt(String(num - 4)) / 3 > 1 ? "千万" : "万";
//     // tslint:disable-next-line:no-shadowed-variable
//     // fm = text1 === "万" ? 10000 : 10000000;
//     if (value % fm === 0) {
//       newValue[0] = parseInt(String(value / fm)) + "";
//     } else {
//       newValue[0] = parseFloat(String(value / fm)).toFixed(2) + "";
//     }
//     newValue[1] = text1;
//     // newValue[1] = `<i style={{fontSize: 12}}>${text1}</i>`;

//   } else if (num <= 16) {
//     // 亿
//     text1 = (num - 8) / 2 > 1 ? "百亿" : "亿";
//     text1 = (num - 8) / 3 > 1 ? "千亿" : text1;
//     text1 = (num - 8) / 4 > 1 ? "万亿" : text1;
//     text1 = (num - 8) / 7 > 1 ? "千万亿" : text1;
//     // tslint:disable-next-line:no-shadowed-variable
//     fm = 1;
//     if (text1 === "亿") {
//       fm = 100000000;
//     } else if (text1 === "百亿") {
//       fm = 10000000000;
//     } else if (text1 === "千亿") {
//       fm = 100000000000;
//     } else if (text1 === "万亿") {
//       fm = 1000000000000;
//     } else if (text1 === "千万亿") {
//       fm = 1000000000000000;
//     }
//     if (value % fm === 0) {
//       newValue[0] = parseInt(String(value / fm)) + "";
//     } else {
//       newValue[0] = parseFloat(String(value / fm)).toFixed(2) + "";
//     }
//     newValue[1] = text1;
//   }
//   if (value < 10000) {
//     newValue[0] = value + "";
//     newValue[1] = "";
//   }
//   return newValue.join("");
// };

export const bigNumberTransform = (val) => {
  let value = typeof val === "string" ? Number(val) : val || 0;
  if ((value + '').length >= 5 && (value + '').length < 9) {
    return (value / 10000).toFixed(0) + "万";
  } else if ((value + '').length >= 9) {
    return (value / 100000000).toFixed(0) + '亿'
  } else {
    return value;
  }
};

/**
 * 用于小数转百分数
 * @param value
 * @returns
 */
export const format = (value) => {
  return Number((Number(value || 0) * 100).toFixed(2));
};
/**
 * 判断一个字符串是否以某个字符结尾
 * @param name 字符串
 * @param key 结尾字符
 * @returns
 */
export const getIsEndWith = (name: string, key: string) => {
  return name.endsWith(key);
};
/**
 * 将0-100数字转为小数,用于百分比转换
 * @param num 数字
 */
export const toSmallNumStr = (num: number) => {
  return (num / 100).toString();
};

/**
 * 获取相应图片url
 *
 */
export const getImgUrl = (list: any = [], type) => {
  if (!list) {
    return "";
  }
  const obj = list.find((f) => f.Type === type) || {};
  return (
    obj.StoragePath ||
    (obj.Data ? "data:image/jpeg|jpg|png|gif;base64," + obj.Data : "")
  );
};
/**
 * 将秒换算为天,时,分,秒
 * @param second 秒
 * @returns 
 */

export const secondToTime = (second) => {
  //计算出相差天数

  let days = Math.floor(second / (24 * 3600))

  //计算出小时数

  let leave1 = second % (24 * 3600)    //计算天数后剩余的毫秒数

  let hours = Math.floor(leave1 / (3600))
  //计算相差分钟数
  let leave2 = leave1 % (3600)        //计算小时数后剩余的毫秒数
  let minutes = Math.floor(leave2 / (60))
  // //计算相差秒数
  // var leave3=leave2%(60*1000)      //计算分钟数后剩余的毫秒数
  // var seconds=Math.round(leave3/1000)
  return `${days}天 ${hours}小时 ${minutes} 分钟`
}

/**
 * 协议,服务 解析JSON,格式不正确返回空对象
 * @param val json格式字符串
 * @returns 
 */
export const parseConfig = val => {

  try {
    if (typeof JSON.parse(val) === 'object') {
      return JSON.parse(val).page
    }
  } catch (e) {
    message.error('配置格式不正确')
  }
  return {}
}

// 获取某月份 第一天和最后一天
export const monthStartAndEndDate = num => {

  //第一天
  const startDate = moment().subtract(num, 'month').startOf('month');
  //最后一天
  const endDate = moment().subtract(num, 'month').endOf('month');
  // 月份
  const month = moment().subtract(num, 'month').format('YYYY-MM');

  return [month, Number(formatStartData(startDate)), Number(formatEndData(endDate))]
}
// 获取设备状态
export const getDeviceStatus = val => {
  if(val ==="1") {
    return "正常"
  }else if(val ==="2") {
    return "报修"
  }else if(val ==="3") {
    return "报停"
  }else if(val === "0") {
    return "无状态"
  }else {
    return 
  }
}