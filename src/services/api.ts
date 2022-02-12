import {TIngredientsData, TUser,} from './types/data';

const base_url = 'https://norma.nomoreparties.space/api/';

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

function checkResponse(res: Response) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}

export const getIngredientsRequest = async () : Promise<
    TResponseBody<'data', TIngredientsData>
    > =>
    await fetch(base_url + 'ingredients', {
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
    }).then(res => checkResponse(res))

export const getOrderNumberRequest = async (ingredients: ReadonlyArray<TIngredientsData & { id: number }>
) : Promise<TResponseBody<'order',
    {number: number}>> =>
    await fetch(base_url + 'orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"ingredients": ingredients})
    }).then(res => checkResponse(res))

export const postEmailToReset = async (email: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch(base_url + 'password-reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"email": email})
    }).then(res => checkResponse(res))

export const postPasswordToReset = async (password: string, code: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch(base_url + 'password-reset/reset', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"password": password, "token": code})
    }).then(res => checkResponse(res))

export const postRegister = async (email: string, name: string, password: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch(base_url + 'auth/register', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"email": email, "password": password, "name": name})
    }).then(res => checkResponse(res))

export const loginRequest = async (email: string, password: string):
    Promise<TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch(base_url + 'auth/login', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({"email": email, "password": password})
    }).then(res => checkResponse(res))

export const getUserRequest = async (token: string): Promise<
    TResponseBody<'user', TUser>> =>
    await fetch(base_url + 'auth/user', {
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
    }).then(res => checkResponse(res))

export const refreshTokenRequest = async (token: string):
    Promise<{success: boolean, refreshToken: string, accessToken: string}> =>
    await fetch(base_url + 'auth/token', {
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
    }).then(res => checkResponse(res))

export const logoutRequest = async (token: string): Promise<
    TResponseBody<'user', ReadonlyArray<TUser>>> =>
    await fetch(base_url + 'auth/logout', {
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
    }).then(res => checkResponse(res))