export type TUser = {
    name: string;
    password: string;
    email: string;
    accessToken: string;
    refreshToken: string;
};

export type TIngredientsCounter = {
    id: string;
    count: number;
    isBun: boolean;
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
