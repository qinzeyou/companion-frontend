import { TagType, postAddUserTag } from "@/types/tag";
import { post, get } from "../base/base-methods"
import { PageRequest, PageResponse } from "@/types/base-type";

/**
 * 用户添加标签到自身
 * @param data 
 * @returns 
 */
export async function addUserTagAPI(data: postAddUserTag) {
    const res = await post<boolean>('/tag/add/user/tag', data);
    return res.data;
}

/**
 * 用户移除自身标签
 * @param params 
 * @returns 
 */
export async function removeUserTagAPI(params: {tagId: number}) {
    const res = await get<boolean>('/tag/remove/user/tag',  params);
    return res.data;
}

/**
 * 热门标签分页数据
 * @param data 分页请求体
 * @returns 
 */
export async function hotTagPageAPI(data: PageRequest) {
    const res = await post<PageResponse<TagType[]>>("/tag/hot/page", data);
    return res.data;
}