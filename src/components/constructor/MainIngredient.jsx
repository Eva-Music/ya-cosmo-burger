import React, {useRef} from "react";
import styles from "./burger-constr.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop} from "react-dnd";
import {CHANGE_CURRENT_ORDER_INGREDIENTS, DELETE_CURRENT_ORDER_INGREDIENTS} from "../../services/actions/order";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";

const MainIngredient = ({index, moveCard, id, data}) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const handleIngredientDelete = (index, itemId) => {
        dispatch({
            type: DELETE_CURRENT_ORDER_INGREDIENTS,
            index, itemId
        })
    };

    const [, drop] = useDrop({
        accept: 'place',
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }
            // Time to actually perform the action
            moveCard(dragIndex, hoverIndex);
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        },
    });

    const [{ isDragging }, drag] = useDrag({
        type: 'place',
        item: () => {
            return { id, index };
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    const opacity = isDragging ? 0 : 1;
    drag(drop(ref));

    return (
        <div>
            <section ref={ref} style={{ opacity }} draggable={true} className={styles.dragIngredients}>
                <div style={{width: 40}}>
                    <DragIcon type="primary"/>
                </div>

                <ConstructorElement
                    text={data.name}
                    price={data.price}
                    thumbnail={data.image}
                    handleClose={() => handleIngredientDelete(index, data._id)}
                />
            </section>
        </div>
    );

}

MainIngredient.propTypes = {
    index: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    data: PropTypes.shape({
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
    }).isRequired,
}

export default MainIngredient;