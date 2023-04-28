export interface IUserDto {
    id: number;
    email: string;
    isActivated: boolean;
}

interface IUser {
    id: number;
    email: string;
    isActivated: boolean;
}

export interface IReturnRegistration {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IGetUsers {
    id: number;
    email: string;
    password: string;
    is_activated: boolean;
    activation_link: string;
}

export interface IGetReviews {
    user_id: number;
    name_user: string;
    email: string;
    date_create: string;
    message: string;
}

export interface IUserData {
    email: string;
    id: number;
    isActivated: boolean;
    iat: number;
    exp: number;
}

export interface ITokenFromDb {
    user_id: number;
    refresh_token: string;
}

export interface IContactUser {
    name: string;
    email: string;
    id_exchange: string;
    message: string;
}

export interface IWallet {
    id: number;
    name_wallet: string;
    address_wallet: string;
}
