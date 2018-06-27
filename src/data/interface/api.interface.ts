export interface IApi<ResultGenericType = any> {
    result: Array<ResultGenericType> | ResultGenericType;
    error: boolean;
    user?: string;
    version_number?: number;
    query?: string | any;
    params?: string;
    serial?: string;
    message?: string;
    createTime: Date;
}
