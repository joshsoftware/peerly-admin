export interface badge {
  id: number;
  name: string;
  reward_points: number;
  updated_by: string;
}

export interface badgesResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: badge[];
}

export interface editBadgeReq {
  id: number;
  reward_points: number;
  authToken: string;
}

export interface editBadgeResp {
  success: string;
  message: string;
  status_code: number;
}
