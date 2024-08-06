export interface grade {
  id: number;
  name: string;
  points: number;
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
