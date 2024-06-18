import {get, post} from '@/api/base/base-methods.ts'
import {LoginParams, UserType} from "@/types/user";

/**
 * 根据标签数组 查询用户数据
 * @param tagNameList
 */
export function searchUserByTagsAPI (tagNameList: string[]) {
    return get<UserType[]>('/user/search/tags', {tagNameList});
}

/**
 * 用户登录
 *
 * @param loginForm 表单数据
 */
export function loginAPI(loginForm: LoginParams) {
    return post<UserType>('/user/login', loginForm);
}

/**
 * 获取当前登录用户信息
 *
 */
export function getLoginUserAPI() {
    return get<UserType>("/user/current");
}
