import {PageRequest, PageResponse} from "@/types/base-type";
import {post} from "@/api/base/base-methods.ts";
import {NoticeType} from "@/types/notice";

/**
 * 分页公告信息
 */
export async function noticePageAPI(data: PageRequest) {
    const res = await post<PageResponse<NoticeType[]>>('/notice/page', data);
    return res.data;
}
