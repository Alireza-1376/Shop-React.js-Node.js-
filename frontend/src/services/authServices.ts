import type { CompleteProfileValueType, UserType, VerifyOtpValueType } from "../types/auth";
import http from "./httpService";

export function sendPhoneNumber(data: { mobile: string }) {
    return http.post("/auth/register", data)
}

export function verifyOtp(data: VerifyOtpValueType) {
    return http.post("/auth/verify-otp", data)
}

export function completeProfile(data: CompleteProfileValueType) {
    return http.post("/auth/complete-profile", data)
}

export function getUser() {
    return http.get<UserType>("/auth/user").then((data) => data.data.user)
}


export function logout() {
    return http.delete("/auth/logout")
}
