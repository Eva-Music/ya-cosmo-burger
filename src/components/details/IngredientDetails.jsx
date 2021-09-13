import style from "./details.module.css";
import React from "react";
import spinner from "../../images/spinner.svg";
import {useSelector} from "react-redux";

const IngredientDetails = () => {

    const {
        currentIngredient
    } = useSelector(state => state.order);

    return (
        <div className={style.main}>
            <div>
                <p className="text text_type_main-medium">Детали ингредиента</p>
            </div>
            {currentIngredient ? <section className={`p-10 ${style.main}`}>
                <img src={currentIngredient.image_large} alt='ingredient'/>
                <div className={"mt-5"}>
                    <p className='text text_type_main-medium'>{currentIngredient.name}</p>
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
                            {currentIngredient.calories} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Белки, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {currentIngredient.proteins} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Жиры, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {currentIngredient.fat} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Углеводы, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {currentIngredient.carbohydrates} </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default IngredientDetails;