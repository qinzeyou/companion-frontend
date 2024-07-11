import {post, get, del} from '@/api/base/base-methods.ts'
import {AddTeamParams, JoinTeamParams, TeamListByUserResponse, TeamListParams, TeamType} from "@/types/team";

const BASE_API = "/team";

/**
 * 条件查询队伍列表
 * @param params
 */
export function postTeamListAPI (params: TeamListParams) {
    return post<TeamType[]>(`${BASE_API}/list`, params);
}

/**
 * 创建队伍
 */
export function postAddTeamAPI (params: AddTeamParams) {
    return post<number>(`${BASE_API}/add`, params);
}

/**
 * 加入队伍
 */
export function postJoinTeamAPI (params: JoinTeamParams) {
    return post<boolean>(`${BASE_API}/join`, params);
}

/**
 * 获取用户加入或创建的队伍
 */
export function getTeamListByUserAPI (userId: number) {
    return get<TeamListByUserResponse>(`${BASE_API}/list/user/manager/${userId}`);
}

/**
 * 退出队伍
 * @param teamId
 */
export function postQuitTeamAPI(teamId: number) {
    return post<boolean>(`${BASE_API}/quit`, {teamId});
}


/**
 * 解散队伍
 * @param teamId
 */
export function delTeamAPI(teamId: number) {
    return del<boolean>(`${BASE_API}/delete/${teamId}`);
}
