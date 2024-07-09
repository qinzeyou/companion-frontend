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
    createUser: UserType
}

/**
 * 查询队伍列表请求参数
 */
export type TeamListParams = {
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
    name: string,
    description: string,
    expireTime: string,
    maxNum: number,
    password: string,
    status: number,
}
