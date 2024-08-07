import {get, post, put} from '@/api/base/base-methods.ts'
import { PageResponse } from '@/types/base-type';
import {LoginParams, RecommendUsersParams, UserType} from "@/types/user";

/**
 * 根据标签数组 查询用户数据
 * @param tagNameList
 */
export async function searchUserByTagIdsAPI (tagIdList: number[]) {
    const res = await get<UserType[]>("/user/search/tagIds", {tagIdList});
    return res.data;
}

/**
 * 用户登录
 *
 * @param loginForm 表单数据
 */
export async function loginAPI(loginForm: LoginParams) {
    const res = await post<UserType>("/user/login", loginForm);
    return res.data;
}

/**
 * 获取当前登录用户信息
 *
 */
export async function getLoginUserAPI() {
    const res = await get<UserType>("/user/current");
    return res.data;
}

/**
 * 更新用户信息
 *
 * @param form
 */
export async function updateUserAPI(form: UserType) {
    const res = await put<number>("/user/update", form);
    return res.data;
}

/**
 * 推荐用户接口
 * todo 后端暂未实现推荐功能，这里获取的只是分页的用户列表
 */
export async function getRecommendUserListAPI(form: RecommendUsersParams) {
    const data = await get<PageResponse<UserType[]>>("/user/recommend", form)
    return data.data;
}

/**
 * 心动匹配用户
 *
 */
export async function getMatchUserListAPI(num: number) {
    const data = await get<UserType[]>(`/user/match/${num}`)
    return data.data;
}

/**
 * 用户退出接口
 */
export async function postUserLogoutAPI() {
    const res = await post<null>("/user/logout");
    return res.data;
}
