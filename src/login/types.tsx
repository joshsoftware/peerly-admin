interface data {
  User: user;
  AuthToken: string;
  NewUserCreated: boolean;
}

interface user {
  created_at: Int16Array;
  designation: string;
  email: string;
  employee_id: string;
  first_name: string;
  grade_id: Int16Array;
  id: Int16Array;
  last_name: string;
  profile_image_url: string;
  reward_quota_balance: Int16Array;
  role_id: Int16Array;
}

export interface userLoginBody {
  email: string;
  password: string;
}

export interface userLoginResp {
  message: string;
  status_code: Int16Array;
  success: boolean;
  data: data;
}