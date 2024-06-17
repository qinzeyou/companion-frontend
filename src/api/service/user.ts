import {get} from '@/api/base/base-methods.ts'
import {UserType} from "@/types/user";

/**
 * 根据标签数组 查询用户数据
 * @param tagNameList
 */
export function searchUserByTags (tagNameList: string[]) {
    return get<UserType[]>('/user/search/tags', {tagNameList});
}
