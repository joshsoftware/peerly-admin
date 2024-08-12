export interface downloadReportResponse {
    success: boolean;
    message: string;
    status_code: number;
    data: object;
}

export interface downloadReportReq{
    authToken: string
}