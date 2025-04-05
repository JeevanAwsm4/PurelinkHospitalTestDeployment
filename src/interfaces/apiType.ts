export interface IHomeData {
  receivers: number;
  your_request: number;
  active_donors: number;
  recent_requests: IRequestData[];
}
export interface IRequestData {
  uuid?: string;
  blood_group: string;
  donors_count: number;
  wanted_count: string;
  slot_duration?: string;
  datetime: string;
  status: string;
}

interface IDonor {
  name: string;
  blood_group: string;
  phone_no: string;
}

interface IDonationRequest {
  type_of_donation: string;
  blood_group: string;
  datetime: string;
  wanted_count: number;
  donor?: IDonor[];
  donors?: number;
}

export interface IContacts {
  name : string;
  current_data: IDonationRequest[];
  other_data: IDonationRequest[];
}
export interface ICityComposition {
  "A+": number;
  "B+": number;
  "O+": number;
  "A-": number;
  "B-": number;
  "O-": number;
  "AB+": number;
  "AB-": number;
}

interface IDonor {
  id: number;
  name: string;
  blood_group: string;
  rep_score: number;
  serial_number: number;
}

export interface IDonationRequestFull {
  uuid: string;
  type_of_donation: string;
  blood_group: string;
  datetime: string;
  wanted_count: number;
  donors_count: number;
  donor: IDonor[];
}
export interface IReportData {
  current_data: IDonationRequestFull[];
}

export interface ISubscriptionResponse {
  message: string;
  data: ISubscription[];
}
interface ISubscription {
  id: number;
  name: string;
  price: string;
  color: string;
  features: string[];
}
