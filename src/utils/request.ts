import { notification, message } from "antd";
import hash from "hash.js";
import { setAuthority, setJWTToken, getJWTToken } from "./authority";
import { getUrl } from "@/utils/utils";

const codeMessage = {
  200: "服务器成功返回请求的数据。",
  201: "新建或修改数据成功。",
  202: "一个请求已经进入后台排队（异步任务）。",
  204: "删除数据成功。",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作。",
  401: "用户没有权限（令牌、用户名、密码错误）。",
  403: "用户得到授权，但是访问是被禁止的。",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作。",
  406: "请求的格式不可得。",
  410: "请求的资源被永久删除，且不会再得到的。",
  422: "当创建一个对象时，发生一个验证错误。",
  500: "服务器发生错误，请检查服务器。",
  502: "网关错误。",
  503: "服务不可用，服务器暂时过载或维护。",
  504: "网关超时。",
};

const checkStatus = (response) => {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const errortext = codeMessage[response.status] || response.statusText;
  if (response.status !== 401) {
    notification.error({
      message: `请求错误 ${response.status}: ${response.url}`,
      description: errortext,
    });
  }
  const error: any = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

const cachedSave = (response, hashcode) => {
  /**
   * Clone a response data and store it in sessionStorage
   * Does not support data other than json, Cache only json
   */
  const contentType = response.headers.get("Content-Type");
  if (contentType && contentType.match(/application\/json/i)) {
    // All data is saved as text
    response
      .clone()
      .text()
      .then((content) => {
        // sessionStorage.setItem(hashcode, content);
        // sessionStorage.setItem(`${hashcode}:timestamp`, Date.now());
      });
  }
  return response;
};

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function action(url, options: any = {}, hasHeader = false) {

  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */
  const fingerprint = url + (options.body ? JSON.stringify(options.body) : "");
  const hashcode = hash.sha256().update(fingerprint).digest("hex");
  const jwtToken = getJWTToken();

  const defaultOptions = {
    // credentials: 'include', //include模式下不能设置Access-Control-Allow-Origin *
    headers: jwtToken
      ? {
        Authorization: `JWT ${jwtToken}`,
      }
      : {},
  };

  const newOptions = { ...defaultOptions, ...options };
  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);

    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  }

  const configObject = await getUrl();
  const serviceUrl = hasHeader ? url : configObject.defaultServiceUrl + url;
  // const serviceUrl = url;
  // return Promise.race([
  //   fetch(serviceUrl, newOptions),
  //   new Promise((_, reject) => setTimeout(reject, 1000, '请求超时')), // 请求超时
  // ]).then(checkStatus).then((response) => {
  //   // DELETE and 204 do not return data by default
  //   // using .json will report an error.
  //   console.log(response,'abc');

  //   if (response.status === 204) {
  //     return response.text();
  //   } else {
  //     return response.json();
  //   }
  // }).catch(err => {
  //   message.error('请求超时');
  //   return {
  //     message: '请求超时'
  //   }
  // })

  return fetch(serviceUrl, newOptions)
    .then(checkStatus)
    // .then(response => cachedSave(response, hashcode))
    .then((response) => {
      // DELETE and 204 do not return data by default
      // using .json will report an error.
      if (response.status === 204) {
        return response.text();
      } else {
        return response.json();
      }
    })
}

export async function request(url, options: any = {}, hasHeader = false) {
  let flag = hasHeader;
  if (url.indexOf("http") > -1) {
    flag = true;
  }
  return action(url, options, flag)

    .then((res) => {

      if (res && res.code) {
        if (res && res.code === 200) {
          return (res && res.data);
        } else {
          notification.error({
            message: res && res.message,
          });
          // return res;
        }
      }
      return res;
    })
    .catch((e) => {
      const status = e.name;

      if (status === 401) {
        // @HACK
        /* eslint-disable no-underscore-dangle */
        setJWTToken("");
        setAuthority("");
        window.localStorage.setItem("userInfo", "");
        window.location.href = "#/user/login";
        // notification.error({
        //   message: e && e.message,
        // });
        return e;
      }
      // notification.error({
      //     message: `${e}`
      // });
      // return;
      //   // environment should not be used
      //   if (status === 403) {
      // 	history.push('/exception/403');
      //     return;
      //   }
      //
      //   if (status <= 504 && status >= 500) {
      // 	history.push('/exception/500');
      //     return;
      //   }
      //   if (status >= 404 && status < 422) {
      // 	history.push('/exception/404');
      //   }
    });
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export async function test(url, options: any = {}, hasHeader = false) {
  /**
   * Produce fingerprints based on url and parameters
   * Maybe url has the same parameters
   */

  const jwtToken = getJWTToken();

  const defaultOptions = {
    // credentials: 'include', //include模式下不能设置Access-Control-Allow-Origin *
    headers: {
      Authorization: `JWT ${jwtToken}`,
    },
  };

  const newOptions = { ...defaultOptions, ...options };

  if (
    newOptions.method === "POST" ||
    newOptions.method === "PUT" ||
    newOptions.method === "DELETE"
  ) {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  }

  const configObject = await getUrl();

  const serviceUrl = hasHeader ? url : configObject.defaultServiceUrl + url;
  // const serviceUrl = url;

  return fetch(serviceUrl, newOptions).then((response) => {
    // DELETE and 204 do not return data by default
    // using .json will report an error.
    if (response.status === 200 || response.status === 204) {
      if (response.status === 204) {
        return response.text();
      } else {
        return response.json();
      }
    } else {
      const errortext = codeMessage[response.status] || response.statusText;

      const error: any = new Error(errortext);
      error.name = response.status;
      error.response = response;
      throw error;
    }
  });
}

export async function fetcher({
  url, // 接口地址
  method, // 请求方法 get、post、put、delete
  data, // 请求数据
  responseType,
  config, // 其他配置
  headers, // 请求头
}: any) {
  if (method === "get") {
    return test(`${url}`, {
      method: method.toUpperCase(),
    });
  }
  return test(`${url}`, {
    method: method.toUpperCase(),
    body: {
      ...data,
    },
  }).then((res) => {
    if (res && res.code) {
      if (res && res.code === 200) {
        return res;
      } else {
        notification.error({
          message: res && res.message,
        });
        return res;
      }
    }
    return res;
  });
}
