import { JSX } from "react";

export interface MenuItem {
    name: string;
    icon: JSX.Element;
    path: string;
}

export interface User {
    id: number;
    avatar: string;
    name: string;
    bloodGroup: string;
    phoneNumber: string;
    district: string;
    address: string;
}

export interface DonationHistory {
    date: string;
    units: number;
    recipient: string;
    bloodType: string;
}

export interface TakeABreakDetails {
    fromDate: Date | null;
    toDate: Date | null;
    reason: string;
}