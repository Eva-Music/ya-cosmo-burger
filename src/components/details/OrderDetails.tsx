import style from './details.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useSelector} from "../../services/hooks";

const OrderDetails = () => {

    const store = useSelector(state => state);

    const {order} = store;

    return (
        <div style={{marginLeft: 46}} className={style.main}>
            <div>
                <p className="text text_type_digits-large">{order.currentOrderNumber}</p>
            </div>
            <div className="mt-15">
                <p className="text text_type_main-medium">идентификатор заказа</p>
            </div>
            <div className='m-25'>
                <CheckMarkIcon type='primary'/>
            </div>
            <div>
                <p className="text text_type_main-default">Ваш заказ начали готовить</p>
            </div>
            <div className='mt-5'>
                <p className="text text_type_main-default text_color_inactive">
                    Дождитесь готовности на орбитальной станции</p>
            </div>
        </div>
    );
}

export default OrderDetails;