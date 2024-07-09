import {get, post, put} from '@/api/base/base-methods.ts'
import {LoginParams, RecommendUsersParams, UserType} from "@/types/user";

const BASE_API = "/user";

/**
 * 根据标签数组 查询用户数据
 * @param tagNameList
 */
export function searchUserByTagsAPI (tagNameList: string[]) {
    return get<UserType[]>(`${BASE_API}/search/tags`, {tagNameList});
}

/**
 * 用户登录
 *
 * @param loginForm 表单数据
 */
export function loginAPI(loginForm: LoginParams) {
    return post<UserType>(`${BASE_API}/login`, loginForm);
}

/**
 * 获取当前登录用户信息
 *
 */
export function getLoginUserAPI() {
    return get<UserType>(`${BASE_API}/current`);
}

/**
 * 更新用户信息
 *
 * @param form
 */
export function updateUserAPI(form: UserType) {
    return put<number>(`${BASE_API}/update`, form);
}

/**
 * 推荐用户接口
 *
 */
export function getRecommendUserList(form: RecommendUsersParams) {
    return get<BaseType.PageResponse<UserType[]>>(`${BASE_API}/recommend`, form)
}
