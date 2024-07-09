/**
 * 用户类型
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    password: string;
    phone: string;
    avatarUrl: string;
    gender: number;
    email: string;
    userRole: number;
    tags: string;
    profile: string;
    createTime: Date;
}

/**
 * 用户登录请求参数
 */
export type LoginParams = {
    userAccount: string,
    password: string
}
/**
 * 推荐用户请求参数
 */
export type RecommendUsersParams = {
    pageNum: number,
    pageSize: number
}
