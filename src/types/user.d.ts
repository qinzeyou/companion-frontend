/**
 * 用户类型
 */
export type UserType = {
    id?: number;
    username?: string;
    userAccount?: string;
    password?: string;
    phone?: string;
    avatarUrl?: string;
    gender?: number;
    email?: string;
    userRole?: number;
    tags: string[];
    createTime?: Date;
}
