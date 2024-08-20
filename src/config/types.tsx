export interface grade {
  id: number;
  name: string;
  points: number;
  updated_by: string;
}

export interface gradesResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: grade[];
}

export interface orgConfig {
  id: number | undefined;
  reward_quota_renewal_frequency: number | undefined;
  updated_by : string |undefined;
}

export interface orgConfigResponse {
  success: boolean;
  message: string;
  status_code: number;
  data: orgConfig;
}

export interface editRenewalFrequencyReq {
  reward_quota_renewal_frequency: number;
  authToken: string;
}

export interface editRenewalFrequencyResp {
  success: string;
  message: string;
  status_code: number;
  data: orgConfig;
}

export interface editGradeReq {
  id: number;
  points: number;
  authToken: string;
}

export interface editGradeResp {
  success: string;
  message: string;
  status_code: number;
}
