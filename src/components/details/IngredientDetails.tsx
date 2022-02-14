import style from "./details.module.css";
import React from "react";
import spinner from "../../images/spinner.svg";
import {useSelector} from "../../services/hooks";

const IngredientDetails = () => {

    const store = useSelector(state => state);

    const {order} = store;

    return (
        <>
            {order.currentIngredient &&
            <div className={style.main}>
                <div>
                    <p className="text text_type_main-medium">Детали ингредиента</p>
                </div>
                {order.currentIngredient ? <section className={`p-10 ${style.main}`}>
                    <img src={order.currentIngredient.image_large} alt='ingredient'/>
                    <div className={"mt-5"}>
                        <p className='text text_type_main-medium'>{order.currentIngredient.name}</p>
                    </div>
                </section> : <img src={spinner} alt="load"/>}

                <div className={style.grid}>
                    <div className={style.main}>
                        <div>
                            <p className='text text_type_main-small text_color_inactive'>
                                Калории,ккал</p>
                        </div>
                        <div>
                            <p className="text text_type_digits-default text_color_inactive">
                                {order.currentIngredient.calories} </p>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div>
                            <p className='text text_type_main-small text_color_inactive'>
                                Белки, г</p>
                        </div>
                        <div>
                            <p className="text text_type_digits-default text_color_inactive">
                                {order.currentIngredient.proteins} </p>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div>
                            <p className='text text_type_main-small text_color_inactive'>
                                Жиры, г</p>
                        </div>
                        <div>
                            <p className="text text_type_digits-default text_color_inactive">
                                {order.currentIngredient.fat} </p>
                        </div>
                    </div>
                    <div className={style.main}>
                        <div>
                            <p className='text text_type_main-small text_color_inactive'>
                                Углеводы, г</p>
                        </div>
                        <div>
                            <p className="text text_type_digits-default text_color_inactive">
                                {order.currentIngredient.carbohydrates} </p>
                        </div>
                    </div>
                </div>

            </div>
            }
            </>
    );
}

export default IngredientDetails;