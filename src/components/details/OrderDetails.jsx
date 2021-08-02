import style from './details.module.css'
import {CheckMarkIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const OrderDetails = ({uuid}) => {
    return (
        <div className={`mt-8 ml-8 ${style.main}`}>
            <div>
                <p className="text text_type_digits-large">{uuid}</p>
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

OrderDetails.propTypes = {
    uuid: PropTypes.string.isRequired
}

export default OrderDetails;