
export interface appreciation {
  id: number;
  core_value_name: string;
  core_value_description: string;
  description: string;
  total_reward_points: number;
  quarter: number;
  sender_first_name: string;
  sender_last_name: string;
  sender_image_url: string;
  sender_designation: string;
  receiver_first_name:string;
  receiver_last_name: string;
  receiver_image_url: string;
  receiver_designation: string;
  total_rewards: number;
  given_reward_point: number;
  created_at: number;
  updated_at: number;
  is_valid: boolean;
  reported_by_first_name: string | undefined ;
  reported_by_last_name: string | undefined;
  reporting_comment: string;
  reported_at: number;
  moderated_by_first_name: string;
  moderated_by_last_name: string;
  moderator_comment: string;
  moderated_at: number;
}

interface metadata{
    page: number;
    total_page: number;
    page_size: number;
    total_records: number;
}

interface data{
    appreciations: appreciation[]
    metadata: metadata
}

export interface response {
    success: boolean;
    message: string;
    status_code: number;
    data: data;
}

export interface IPropsTable {
    response: appreciation[] | undefined
    filter: string
    setFilter: (value: string | ((prevVar: string) => string)) => void;
}

export interface IPropsButtons{
    setFilter: (value: string | ((prevVar: string) => string)) => void;
    setPage: (value: number | ((prevVar: number) => number)) => void;
}

export interface moderationReq{
    moderator_comment: string
    id: number
    authToken: string
}

export interface moderationResponse {
    success: boolean;
    message: string;
    status_code: number;
    data: object;
}