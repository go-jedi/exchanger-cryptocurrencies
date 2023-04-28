interface IUser {
    id: number;
    email: string;
    isActivated: boolean;
}

export interface IReviews {
    user_id: number;
    name_user: string;
    email: string;
    date_create: string;
    message: string;
}

export interface IUserDto {
    accessToken: string;
    refreshToken: string;
    user: IUser;
}

export interface IWallet {
    id: number;
    name_wallet: string;
    address_wallet: string;
}
