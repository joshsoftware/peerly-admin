export interface coreValue {
  id: number;
  name: string;
  description: string;
  parent_id: number;
}

export interface coreValuesResp {
  success: boolean;
  message: string;
  status_code: number;
  data: coreValue[];
}
