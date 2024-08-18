import { UserTag } from "@/types/tag";
import { TagType } from "@/types/tag";

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
  userTags: TagType[];
  createTime: Date;
};

/**
 * 用户登录请求参数
 */
export type LoginParams = {
  userAccount: string;
  password: string;
};

/**
 * 用户注册请求参数
 */
export type RegisterParams = {
  userAccount: string;
  password: string;
};
