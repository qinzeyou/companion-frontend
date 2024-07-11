import axios from "axios"
import {useLoading} from "@/utils/useLoading.ts";

/**
 * 基础的 axios 配置类
 */

// 由当前环境决定请求基础路径
const baseUrl = import.meta.env.VITE_APP_API_URL;
const request = axios.create({
    timeout: 1200000, // 请求超时时间 20s
    timeoutErrorMessage: '请求超时', // 请求超时提示
    baseURL: baseUrl
})

// 全局设置 axios 发送请求带上cookie
request.defaults.withCredentials = true;

const {openLoading, closeLoading} = useLoading();

// request 拦截器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    openLoading();
    return config
}, error => {
    console.error('request error: ' + error) // for debug
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(response => {
        closeLoading();
        return response;
    }, error => {
        closeLoading();
        return Promise.reject(error)
    }
)

export default request;
