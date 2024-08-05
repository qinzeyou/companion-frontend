import {post, get, del} from '@/api/base/base-methods.ts'
import {AddTeamParams, JoinTeamParams, TeamListByUserResponse, TeamListParams, TeamType} from "@/types/team";

/**
 * 条件查询队伍列表
 * @param params
 */
export async function postTeamListAPI (params: TeamListParams) {
    const res = await post<TeamType[]>("/team/list", params);
    return res.data;
}

/**
 * 创建队伍
 */
export async function postAddTeamAPI (params: AddTeamParams) {
    const res = await post<number>("/team/add", params);
    return res.data;
}

/**
 * 加入队伍
 */
export async function postJoinTeamAPI (params: JoinTeamParams) {
    const res = await post<boolean>("/team/join", params);
    return res.data;
}

/**
 * 获取用户加入或创建的队伍
 */
export async function getTeamListByUserAPI (userId: number) {
    const res = await get<TeamListByUserResponse>(`/team/list/user/manager/${userId}`);
    return res.data;
}

/**
 * 退出队伍
 * @param teamId
 */
export async function postQuitTeamAPI(teamId: number) {
    const res = await post<boolean>("/team/quit", {teamId});
    return res.data;
}


/**
 * 解散队伍
 * @param teamId
 */
export async function delTeamAPI(teamId: number) {
    const res = await del<boolean>(`/team/delete/${teamId}`);
    return res.data;
}

/**
 * 获取分页的队伍数据
 * @param data
 */
export async function postPageTeamListAPI(data: {pageNum: number, pageSize: number}) {
    const res = await post<PageResponse<TeamType[]>>("/team/page/list", data);
    return res.data;
}
