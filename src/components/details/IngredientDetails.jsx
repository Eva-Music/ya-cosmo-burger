import style from "./details.module.css";
import React from "react";
import PropTypes from "prop-types";

const IngredientDetails = ({data}) => {

    return (
        <div>
            <div>
                <p className="text text_type_main-medium">Детали ингредиента</p>
            </div>
            <section className={`p-10 ${style.main}`}>
                <img src={data.image_large} alt='ingredient'/>
                <div className={"mt-5"}>
                    <p className='text text_type_main-medium'>{data.name}</p>
                </div>
            </section>

            <div className={style.grid}>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Калории,ккал</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.calories} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Белки, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.proteins} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Жиры, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.fat} </p>
                    </div>
                </div>
                <div className={style.main}>
                    <div>
                        <p className='text text_type_main-small text_color_inactive'>
                            Углеводы, г</p>
                    </div>
                    <div>
                        <p className="text text_type_digits-default text_color_inactive">
                            {data.carbohydrates} </p>
                    </div>
                </div>
            </div>

        </div>
    );
}

IngredientDetails.propTypes = {
    data: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            type: PropTypes.string.isRequired,
            proteins: PropTypes.number.isRequired,
            fat: PropTypes.number.isRequired,
            carbohydrates: PropTypes.number.isRequired,
            calories: PropTypes.number.isRequired,
            price: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            image_mobile: PropTypes.string.isRequired,
            image_large: PropTypes.string.isRequired
        })
    ).isRequired
}

export default IngredientDetails;