import dayjs from "dayjs"
import router from "@/router";

/**
 * 根据状态码返回提示
 * @param status
 */
export function getMessageByStatus (status: number) {
    // 这里用来处理http常见错误，进行全局提示
    let message = "";
    switch (status) {
        case 400:
            message = "请求错误(400)";
            break;
        case 401:
            message = "未授权，请重新登录(401)";
            // 这里可以做清空storage并跳转到登录页的操作
            break;
        case 403:
            message = "拒绝访问(403)";
            break;
        case 404:
            message = "请求出错(404)";
            break;
        case 408:
            message = "请求超时(408)";
            break;
        case 500:
            message = "服务器错误(500)";
            break;
        case 501:
            message = "服务未实现(501)";
            break;
        case 502:
            message = "网络错误(502)";
            break;
        case 503:
            message = "服务不可用(503)";
            break;
        case 504:
            message = "网络超时(504)";
            break;
        case 505:
            message = "HTTP版本不受支持(505)";
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return message;
}
/**
 * 格式化当前时间
 */
export const nowDateTime = dayjs(new Date()).format("YYYY-MM-DD HH:mm:ss")
/**
 * 获取当前日期
 * @returns 数组格式：['2024', '08', '07']
 */
export const getCurrentDate = () => {
    const date = dayjs(new Date()).format("YYYY-MM-DD")
    return date.split("-");
}
/**
 * 获取当前时间（时:分）
 * @returns 数组格式：['20', '45']
 */
export const getCurrentTime = () => {
    const time = dayjs(new Date()).format("HH-mm")
    return time.split("-")
}

// 路由跳转
export const navTo = (path: string) => {
    router.push({
        path
    })
}
