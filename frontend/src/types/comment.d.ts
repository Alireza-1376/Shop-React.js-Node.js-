import type { UserItems } from "./auth";


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
}

export type CommentType = {
    _id: string;
    user: UserItems;
    product: string;
    text: string;
    parent: string | null;
    createdAt: string;
    updatedAt: string;
};

export type AddCommentPayload = {
    productId: string;
    text: string;
    parentId: string | null;
};