import React, {useEffect} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

const Modal = ({children, onClose}) => {
    const modalRoot = document.getElementById("react-modals");

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

Modal.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default Modal;
