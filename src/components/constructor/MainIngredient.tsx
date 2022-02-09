import React, {useRef} from "react";
import styles from "./burger-constr.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {useDrag, useDrop, XYCoord} from "react-dnd";
import {DELETE_CURRENT_ORDER_INGREDIENTS} from "../../services/constants";
import {useDispatch} from "../../services/hooks";
import {TIngredientsData} from "../../services/types/data";
import {DropTargetHookSpec} from "react-dnd/dist/types/hooks/types";


type TIngredientProps = {
    data: TIngredientsData;
    id: number;
    index: number;
    moveCard: (dragIndex: number, hoverIndex: number) => void;
}

const MainIngredient = ({moveCard, index, id, data}: TIngredientProps) => {
    const ref = useRef(null);
    const dispatch = useDispatch();

    const handleIngredientDelete = (index: number, itemId: string) => {
        dispatch({
            type: DELETE_CURRENT_ORDER_INGREDIENTS,
            index, itemId
        })
    };

    const [, drop] = useDrop({
        accept: 'cards',
        hover(item: any, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;
            if (dragIndex === hoverIndex) {
                return;
            }
            const elem: HTMLElement | any = ref.current;
            const hoverBoundingRect: DOMRect = elem?.getBoundingClientRect();
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            const clientOffset: any = monitor.getClientOffset();
            const hoverClientY = clientOffset?.y - hoverBoundingRect.top;

            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return;
            }

            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return;
            }

            moveCard(dragIndex, hoverIndex);

            item.index = hoverIndex;
        },
    });
    const [{ isDragging }, drag] = useDrag({
        type: 'cards',
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
            <section ref={ref} style={{ opacity }} className={styles.dragIngredients}>
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

export default MainIngredient;