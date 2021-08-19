import React, {useEffect, useRef} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({children, onClose, isVisible}) => {
    const modalRoot = document.getElementById("react-modals");
    const ref = useRef();

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (isVisible && ref.current) {
                onClose();
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside);
        document.addEventListener("keydown", onClose, false);
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside);
            document.removeEventListener("keydown", onClose, false);
        }
    }, []);


    return createPortal(
            <div ref={ref}>
                <ModalOverlay/>

                <div onClick={onClose} className={styles.close}>
                    <div className={styles.icon}>
                        <CloseIcon type="primary"/>
                    </div>
                </div>

                <div className={styles.inner}>
                    {children}
                </div>
            </div>,
        modalRoot
    );
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default Modal;
