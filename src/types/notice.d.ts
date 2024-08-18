import {UserType} from "@/types/user";

export type NoticeType = {
    id: number;
    userId: number;
    title: string;
    content: string;
    weight: number;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser: UserType;
}
