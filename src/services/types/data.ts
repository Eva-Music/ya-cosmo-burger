export type TUser = {
    readonly name: string;
    readonly password: string;
    readonly email: string;
    readonly accessToken: string;
    readonly refreshToken: string;
};

export type TIngredientsCounter = {
    readonly id: number;
    count: number;
    readonly isBun: boolean;
};

export type TIngredientsData = {
    readonly _id: string;
    readonly name: string;
    readonly type: string;
    readonly proteins: number;
    readonly fat: number;
    readonly carbohydrates: number;
    readonly calories: number;
    readonly price: number;
    readonly image: string;
    readonly image_mobile: string;
    readonly image_large: string;
}

export type TIngredientsResponse = {
    readonly success: boolean;
    readonly data: Array<TIngredientsData>;
};