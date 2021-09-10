import React, {useEffect} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import {
    DELETE_CURRENT_INGREDIENT,
    DELETE_ORDER_NUMBER
} from "../../services/actions/order";
import {useDispatch, useSelector} from "react-redux";

const Modal = ({children}) => {
    const modalRoot = document.getElementById("react-modals");

    const dispatch = useDispatch();

    const {
        modalContent
    } = useSelector(state => state.order)

    const onClose = () => {
        if (modalContent === 'ingredient') {
            dispatch({
                type: DELETE_CURRENT_INGREDIENT,
            });
        } else {
            dispatch({
                type: DELETE_ORDER_NUMBER,
            });
        }
    }

    useEffect(() => {
        document.addEventListener("keydown", onClose, false);
        return () => {
            document.removeEventListener("keydown", onClose, false);
        }
    }, []);

    return createPortal(
            <div>
                <ModalOverlay onClose={onClose}/>

                <div className={styles.window}>
                    <div onClick={onClose} className={styles.close}>
                        <div className={styles.icon}>
                            <CloseIcon type="primary"/>
                        </div>
                    </div>

                    <div className={styles.inner}>
                        {children}
                    </div>
                </div>
            </div>,
        modalRoot
    );
}

export default Modal;
