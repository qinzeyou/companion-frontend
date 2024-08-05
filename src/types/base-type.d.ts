// 服务端返回结果
type BaseResponse<T> = {
    code?: number,
    data: T,
    msg?: string,
    description?: string,
}

// 分页返回结果
type PageResponse<T> = {
    records: T,
    current: number,
    size: number,
    total: number
}
