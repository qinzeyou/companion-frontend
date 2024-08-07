/**
 * 标签信息类型
 */
export interface TagType {
    id: number;
    tagName: string;
    userId: number;
    weight: number;
    parentId?: number;
    isParent: boolean;
    color?: string;
    textColor?: string;
    createTime: Date;
    updateTime: Date;
}

/**
 * 树形标签结构
 */
export interface TreeTag extends TagType {
    children: TagType[];
}

/**
 * 用户标签：用户与标签之间的关系组成，如 用户A 有 标签B、标签C 等
 */
export interface UserTag extends TagType {
    tag: TagType;
    weight: number;
}

/**
 * 用户添加自身标签请求体
 */
export interface postAddUserTag {
    tagId: number;
    weight: number;
    color?: string;
    textColor?: string;
}