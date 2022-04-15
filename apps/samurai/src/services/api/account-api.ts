import { ApiResponse } from 'apisauce';
import { Api } from './api';
import { getGeneralApiProblem } from './api-problem';
// import { GetZones, GetAccount } from "./api.types"

const API_PAGE_SIZE = 50;

export class AccountApi {
  private api: Api;

  constructor(api: Api) {
    this.api = api;
  }

  async getZones(): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.get(
        'https://www.zhihu.com/api/v3/oauth/sms/supported_countries',
        { amount: API_PAGE_SIZE }
      );

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response);
        if (problem) return problem;
      }

      const data = response.data.data;

      return { kind: 'ok', data };
    } catch (e) {
      __DEV__ && console.tron.log(e.message);
      return { kind: 'bad-data' };
    }
  }

  // async login(): Promise<GetAccount> {
  //   try {
  //     const response: ApiResponse<any> = await this.api.apisauce.post(
  //       "/sam/login",
  //       { account: 'lemonpaimc@163.com', password: '123456' },
  //     )
  //     if (!response.ok) {
  //       const problem = getGeneralApiProblem(response)
  //       if (problem) return problem
  //     }

  //     return { kind: "ok", data: response.data }
  //   } catch (error) {
  //     __DEV__ && console.tron.log(error.message)
  //     return { kind: "bad-data" }
  //   }
  // }
}
