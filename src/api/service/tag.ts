import { TagType, TreeTag } from "@/types/tag";
import { post, get } from "../base/base-methods"
import { PageRequest, PageResponse } from "@/types/base-type";

/**
 * 热门标签分页数据
 * @param data 分页请求体
 * @returns 
 */
export async function hotTagPageAPI(data: PageRequest) {
    const res = await post<PageResponse<TagType[]>>("/tag/hot/page", data);
    return res.data;
}

/**
 * 获取树形结构的标签数据
 * @returns 
 */
export async function treeTagAPI() {
    const res = await get<TreeTag>('/tag/tree');
    return res.data;
}

/**
 * 条件查询标签
 * @param data 查询条件对象
 * @returns 符合条件的标签
 */
export async function searchTagListAPI(data: { tagName: string }) {
    const res = await post<TagType[]>("/tag/search/list", data);
    return res.data;
}