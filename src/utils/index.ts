import dayjs from "dayjs"

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

// debounce.ts
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number,
    immediate: boolean = false
): (...args: Parameters<T>) => void {
    let timeout: NodeJS.Timeout | null = null;

    return function(this: any, ...args: Parameters<T>) {
        const context = this;

        if (timeout !== null) {
            clearTimeout(timeout);
        }

        if (immediate && !timeout) {
            func.apply(context, args);
        }

        timeout = setTimeout(() => {
            timeout = null;
            if (!immediate) {
                func.apply(context, args);
            }
        }, wait);
    };
}

// throttle.ts
export function throttle<T extends (...args: any[]) => any>(
    func: T,
    limit: number
): (...args: Parameters<T>) => void {
    let lastFunc: number | null = null;
    let lastRan: number;

    return function(this: any, ...args: Parameters<T>) {
        const context = this;
        const now = Date.now();

        if (!lastRan) {
            func.apply(context, args);
            lastRan = now;
        } else {
            // @ts-ignore
            clearTimeout(lastFunc as NodeJS.Timeout);

            // @ts-ignore
            lastFunc = setTimeout(function() {
                if ((now - lastRan) >= limit) {
                    func.apply(context, args);
                    lastRan = now;
                }
            }, limit - (now - lastRan));
        }
    };
}
