const url = 'https://norma.nomoreparties.space/api/ingredients';
const url_orders = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsRequest = async () => {
        return await fetch(url).then(res => {
                if (res.ok) {
                        return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
        })
};

export const getOrderNumberRequest = async (ingredients) => {
        return await fetch(url_orders, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"ingredients": ingredients})
        }).then(res => {
                if (res.ok) {
                        return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
        })
};
