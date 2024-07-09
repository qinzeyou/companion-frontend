import {post} from '@/api/base/base-methods.ts'
import {AddTeamParams, TeamListParams, TeamType} from "@/types/team";

const BASE_API = "/team";

/**
 * 条件查询队伍列表
 * @param params
 */
export function postTeamListAPI (params: TeamListParams) {
    return post<TeamType[]>(`${BASE_API}/list`, params);
}

/**
 * 添加队伍
 */
export function postAddTeamAPI (params: AddTeamParams) {
    return post<number>(`${BASE_API}/add`, params);
}
