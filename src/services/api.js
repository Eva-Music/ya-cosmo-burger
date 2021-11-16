const url = 'https://norma.nomoreparties.space/api/ingredients';
const url_orders = 'https://norma.nomoreparties.space/api/orders';
const reset_email = ' https://norma.nomoreparties.space/api/password-reset';
const reset_password = 'https://norma.nomoreparties.space/api/password-reset/reset';

const login = 'https://norma.nomoreparties.space/api/auth/login'; // - эндпоинт для авторизации.
const register = 'https://norma.nomoreparties.space/api/auth/register'; // - эндпоинт для регистрации пользователя.
const logout = 'https://norma.nomoreparties.space/api/auth/logout'; // - эндпоинт для выхода из системы.
const refresh_token = 'https://norma.nomoreparties.space/api/auth/token'; // - эндпоинт обновления токена.

const get_update_user = 'https://norma.nomoreparties.space/api/auth/user'; //- эндпоинт получения данных о пользователе.

export const getIngredientsRequest = async () => {
        return await fetch(url)
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't get ingredients: ${err}`);
            })
};

export const getOrderNumberRequest = async (ingredients) => {
        return await fetch(url_orders, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"ingredients": ingredients})
        })
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't get order number: ${err}`);
            })
};

export const postEmailToReset = async (email) => {
        return await fetch(reset_email, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"email": email})
        })
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't post email to reset: ${err}`);
            })
};

export const postPasswordToReset = async (password, code) => {
        return await fetch(reset_password, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"password": password, "token": code})
        })
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't post password to reset: ${err}`);
            })
};

export const postRegister = async (email, password, name) => {
        return await fetch(register, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"email": email, "password": password, "name": name})
        })
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't register: ${err}`);
            })
};

export const loginRequest = async (email, password) => {
        return await fetch(login, {
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
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't login: ${err}`);
            })
};

export const getUserRequest = async (token) => {
        return await fetch(get_update_user, {
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
            .catch(err => {
                    Promise.reject(`Can't get user request: ${err}`);
            })
}

export const refreshTokenRequest = async (token) => {
        return await fetch(refresh_token, {
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
            .catch(err => {
                    Promise.reject(`Can't refresh token: ${err}`);
            })
};

export const logoutRequest = async (token) => {
        return await fetch(logout, {
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
            .then(res => res.ok ?
                res.json() :
                Promise.reject(`Ошибка ${res.status}`))
            .catch(err => {
                    Promise.reject(`Can't logout: ${err}`);
            })
};