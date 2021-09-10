const url = 'https://norma.nomoreparties.space/api/ingredients';
const url_orders = 'https://norma.nomoreparties.space/api/orders';

export const getIngredientsRequest = async () => {
        return await fetch(url).then(res => res.json());
};

export const getOrderNumberRequest = async (ingredients) => {
        return await fetch(url_orders, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({"ingredients": ingredients})
        }).then(res => res.json());
};
