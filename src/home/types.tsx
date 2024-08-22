export interface downloadReportResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: object;
}

export interface downloadReportReq {
  authToken: string;
}

export interface sendNotificationResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: object;
}

export interface message {
  title: string;
  body: string;
}

export interface sendNotificationReq {
  message: message;
  all: boolean;
  id: number | undefined;
  authToken: string;
}

export interface user {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface metadata {
  page: number;
  total_page: number;
  page_size: number;
  total_records: number;
}

export interface data{
    user_list: user[];
    metadata: metadata
}

export interface listUsersResp {
  success: boolean;
  message: string;
  status_code: number;
  data: data;
}

export interface userDropdown {
  label: string;
  id: number;
}