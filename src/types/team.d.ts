import {UserType} from "@/types/user";

/**
 * 队伍类型
 */
export type TeamType = {
    id: number;
    name: string;
    description: string;
    maxNum: number;
    expireTime: Date;
    userId: number;
    status: number;
    createUser: UserType;
    teamCover?: string;
    joinUserCount?: number;
    hasJoin?: boolean;
    joinUserList: UserType[];
}

/**
 * 查询队伍列表请求参数
 */
export type searchPageTeamData = {
    searchText?: string;
    expireTime?: Date;
    id?: number;
    maxNum?: number;
    name?: string;
    pageNum?: number;
    pageSize?: number;
    status?: number;
    userId?: number
}

/**
 * 添加队伍请求参数
 */
export type AddTeamParams = {
    userId: number;
    name: string;
    description?: string;
    expireTime?: string;
    maxNum: number;
    password?: string;
    status: number;
    teamCover: string;
}

/**
 * 获取用户加入或创建队伍的返回结果
 */
export type TeamListByUserResponse = {
    createTeamList: TeamType[];
    joinTeamList: TeamType[];
}

/**
 * 加入队伍请求参数
 */
export type JoinTeamParams = {
    teamId: number;
    password?: string;
}
