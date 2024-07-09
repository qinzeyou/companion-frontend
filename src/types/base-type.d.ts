/**
 * 声明 基础类型 命名空间，可以在全局引用，而无需导入具体所在的文件
 */
declare namespace BaseType {
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
}
