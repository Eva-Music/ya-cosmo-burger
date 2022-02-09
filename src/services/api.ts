import {TIngredientsData, TUser,} from './types/data';

type TResponseBody<TDataKey extends string = '', TDataType = {}> = {
    [key in TDataKey]: TDataType
} & {
    success: boolean;
    message?: string;
    headers?: Headers;
};

interface CustomBody<T extends any> extends Body {
    json(): Promise<T>;
};

interface CustomResponse<T> extends CustomBody<T> {
    readonly headers: Headers;
    readonly ok: boolean;
    readonly redirected: boolean;
    readonly status: number;
    readonly statusText: string;
    readonly trailer: Promise<Headers>;
    readonly type: ResponseType;
    readonly url: string;
    clone(): Response;
}

export const getIngredientsRequest = async () : Promise<
    TResponseBody<'data', ReadonlyArray<TIngredientsData>>
    > =>
    await fetch('https://norma.nomoreparties.space/api/ingredients', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('refreshToken')
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(res => res.json())
        .then(data => data);


export const getOrderNumberRequest = async (ingredients: ReadonlyArray<TIngredientsData & { id: number }>
) : Promise<TResponseBody<'order',
    {number: number}>> =>
    await fetch('https://norma.nomoreparties.space/api/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ingredients": ingredients})
    })
        .then(res => res.json())
        .then(data => data);

export const postEmailToReset = async (email: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch('https://norma.nomoreparties.space/api/password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email})
    })
        .then(res => res.json())
        .then(data => data);

export const postPasswordToReset = async (password: string, code: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch('https://norma.nomoreparties.space/api/password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password, "token": code})
    })
        .then(res => res.json())
        .then(data => data);

export const postRegister = async (email: string, name: string, password: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch('https://norma.nomoreparties.space/api/auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"email": email, "password": password, "name": name})
    })
        .then(res => res.json())
        .then(data => data);

export const loginRequest = async (email: string, password: string):
    Promise<TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch('https://norma.nomoreparties.space/api/auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({"email": email, "password": password})
    })
        .then(res => res.json())
        .then(data => data);

export const getUserRequest = async (token: string): Promise<
    TResponseBody<'user', TUser>> =>
    await fetch('https://norma.nomoreparties.space/api/auth/user', {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer'
    })
        .then(res => res.json())
        .then(data => data);

export const refreshTokenRequest = async (token: string): Promise<
    TResponseBody<'tokens', {refreshToken: string, accessToken: string} >> =>
    await fetch('https://norma.nomoreparties.space/api/auth/token', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({"token": `${token}`})
    })
        .then(res => res.json())
        .then(data => data);

export const logoutRequest = async (token: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch('https://norma.nomoreparties.space/api/auth/logout', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({"token": `${token}`})
    })
        .then(res => res.json())
        .then(data => data)
