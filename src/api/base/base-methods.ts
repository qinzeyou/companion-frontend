import request from "@/api/base/base-axios.ts";
import { AxiosResponse } from 'axios';
// @ts-ignore
import qs from 'qs';

/**
 * 常用 axios 方法封装
 */

export function get<T>(url: string, params?: any): Promise<AxiosResponse<BaseResponse<T>>> {
    return request.get<BaseResponse<T>>(url, {
        params,
        // paramsSerializer：用于在发送请求之前序列化查询参数
        paramsSerializer: function (params) {
            // 参数1：序列号参数，参数2：可选配置项 =》 arrayFormat：repeat 为 数组中的每个元素都会单独的序列号，而不是用方法括号和索引
            return qs.stringify(params, { arrayFormat: "repeat" });
        },
    });
}

export function post<T>(url: string, data?: any): Promise<AxiosResponse<BaseResponse<T>>> {
     return request.post<BaseResponse<T>>(url, data);
}

export function put<T>(url: string, data?: any): Promise<AxiosResponse<BaseResponse<T>>> {
    return request.put<BaseResponse<T>>(url, data);
}

export function del<T>(url: string, params?: any): Promise<AxiosResponse<BaseResponse<T>>> {
    return request.delete<BaseResponse<T>>(url, { params });
}

