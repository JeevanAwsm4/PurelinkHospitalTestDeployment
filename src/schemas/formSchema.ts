import { time } from "console";
import * as yup from "yup";

export interface IRequestFormInputs {
  type_of_donation: string;
  blood_group: string;
  date: string;
  time: string;
  user_password: string;
  wanted_count: string;
  agree_terms:boolean
}

export const requestSchema = yup.object().shape({
  type_of_donation: yup.string().required("Donation type is required"),
  blood_group: yup.string().required("Blood group is required"),
  date: yup.string().required("Date is required"),
  time: yup.string().required("Time is required"),
  user_password: yup.string().required("Password is required"),
  wanted_count: yup.string().required("Wanted count is required"),
  agree_terms: yup.boolean().oneOf([true], "You must agree to the terms and conditions").required("Agreement is required")
});
