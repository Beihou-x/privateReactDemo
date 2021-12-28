import { request } from '@/utils/request';

export interface LoginParamsType {
  userName: string;
  password: string;
  mobile: string;
  captcha: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request('/api/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(params: LoginParamsType): Promise<any> {
  return request(`krakatoa/api/v2/user/login`, {
    method: 'POST',
    body: {
      ...params
    }
  })
}
