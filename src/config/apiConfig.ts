export const BASE_URL = "http://127.0.0.1:8000/api/v1";

export const API_ENDPOINTS = {
  LOGIN: `${BASE_URL}/auth/token/`,
  HOSPITAL_REGISTER: `${BASE_URL}/panel/signup/`,
  HOME_DATA: `${BASE_URL}/panel/home_data/`,
  USER_VERIFY: `${BASE_URL}/auth/token/refresh/`,
  VERIFY_DETAILS : `${BASE_URL}/panel/verify/`,
  HOSPITAL_REQUEST: `${BASE_URL}/panel/create_request/`,
  CONTACT: `${BASE_URL}/panel/contact/`,
  CITY_COMPOSITION: `${BASE_URL}/panel/city_composition_data/`,
  REPORT_DATA: `${BASE_URL}/panel/report_data/`,
  CREATE_REPORT: (hospitalId: string, donorId: number) => `${BASE_URL}/panel/report/${hospitalId}/${donorId}/`,
  SUBSCRIPTION: `${BASE_URL}/panel/subscriptions/`,
  SUBSCRIBE: `${BASE_URL}/panel/create_subscription/`,
};
