// 服务端返回结果
export type BaseResponse<T> = {
  code?: number;
  data: T;
  msg?: string;
  description?: string;
};

// 分页返回结果
export type PageResponse<T> = {
  records: T;
  current: number;
  size: number;
  total: number;
};

/**
 * 通用分页请求参数
 */
export interface PageRequest {
  pageNum: number;
  pageSize: number;
}
