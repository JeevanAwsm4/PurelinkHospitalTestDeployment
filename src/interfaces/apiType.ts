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

export interface IDonor {
  id: string;
  name: string;
  phone_no: string;
  blood_group: string;
}

interface IDonationRequest {
  uuid : string,
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
  duration_display: string;
  is_active: boolean; // Add this property
}
