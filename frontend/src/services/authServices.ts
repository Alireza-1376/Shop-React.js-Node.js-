import http from "./httpService";

export function sendPhoneNumber(data: { mobile: string }) {
    return http.post("/auth/register", data)
}

export function verifyOtp(data: { mobile: string , otp:string }) {
    return http.post("/auth/verify-otp", data)
}
