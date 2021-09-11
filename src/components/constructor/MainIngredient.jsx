import React, {useRef} from "react";
import styles from "./burger-constr.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {CHANGE_CURRENT_ORDER_INGREDIENTS, DELETE_CURRENT_ORDER_INGREDIENTS} from "../../services/actions/order";
import {useDispatch, useSelector} from "react-redux";

const MainIngredient = ({index, id, data}) => {
    const ref = useRef(null);

    const handleIngredientDelete = (data) => {
        dispatch({
            type: DELETE_CURRENT_ORDER_INGREDIENTS,
            data
        })
    };

    const dispatch = useDispatch();

    const [, drop] = useDrop({
        accept: 'place',
        hover(item, monitor) {
            const [dragIndex, hoverIndex] = [item.index, index];
            if (dragIndex === hoverIndex) return;

            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset = monitor.getClientOffset();
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;

            dispatch({
                type: CHANGE_CURRENT_ORDER_INGREDIENTS, dragIndex, hoverIndex
            });

            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'place',
        item: () => {
            return {id, index}
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;

    drag(drop(ref));

    return (
        <div>
            <section ref={ref} style={{ opacity }} className={styles.dragIngredients}>
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
        </div>
    );

}

export default MainIngredient;