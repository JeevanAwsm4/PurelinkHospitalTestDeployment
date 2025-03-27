import { keralaDistricts } from "@/utils/utils";
import * as yup from "yup";
export const loginSchema = yup.object().shape({
  phone: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  password: yup
    .string()
    .required("password is required")
    .min(6, "Password must be at least 6 characters"),
});
export interface loginInputs {
  phone: string;
  password: string;
}


export interface registerInputs {
 username: string;
  email: string;
  password: string;
  address: string;
  phone_no: string;
  district: string;
}

export const registerSchema = yup.object().shape({
  username: yup
    .string()
    .required("Name is required")
    .max(20, "Name must be less than 20 characters"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters"),
  address: yup.string().required("Address is required"),
  phone_no: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Enter a valid 10-digit phone number"),
  district: yup
    .string()
    .required("District is required")
    .oneOf(keralaDistricts, "choose a valid district"),
});
