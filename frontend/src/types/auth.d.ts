export type CompleteProfileValueType = {
    username: string,
    email: string
}

export type VerifyOtpValueType = {
    mobile: string
    otp: string
}

export type UserItems = {
    cart: []
    comments: []
    createdAt: string
    email: string
    isProfileCompleted: boolean
    isVerifiedPhoneNumber: boolean
    likedProducts: []
    mobile: string
    role: string
    updatedAt: string
    username: string
    _id: string
} | undefined 

export type UserType = {
    user: UserItems
}