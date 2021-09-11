import React, {useRef} from "react";
import styles from "./burger-constr.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {DELETE_CURRENT_ORDER_INGREDIENTS} from "../../services/actions/order";
import {useDispatch} from "react-redux";

const MainIngredient = ({moveImage, index, data}) => {
    const {_id} = data;
    const ref = useRef(null);

    const handleIngredientDelete = (data) => {
        dispatch({
            type: DELETE_CURRENT_ORDER_INGREDIENTS,
            data
        })
    };

    const dispatch = useDispatch();



    const [{isDragging}, dragRef] = useDrag({
        type: "place",
        item: {
           index, id: _id
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        })
    });

    const [, drop] = useDrop({
        accept: "place",
        hover(item) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            moveImage(dragIndex, hoverIndex);
            item.index = hoverIndex;
        }
    });


    dragRef(drop(ref));

    return (
        <div ref={ref}>
            {!isDragging &&
            <section ref={dragRef} className={styles.dragIngredients}>
                <div style={{width: 40}}>
                    <DragIcon type="primary"/>
                </div>

                <ConstructorElement
                    text={data.name}
                    price={data.price}
                    thumbnail={data.image}
                    handleClose={() => handleIngredientDelete(data)}
                />
            </section>
            }
        </div>
    );

}

export default MainIngredient;