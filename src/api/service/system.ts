/**
 * 系统接口文件
 */
import {post} from "@/api/base/base-methods.ts";

/**
 * 上传文件接口
 * @param data 上传的文件的信息
 */
export async function postUploadFileAPI(data: any) {
    const res = await post<string>("/upload/file", data);
    return res.data;
}
