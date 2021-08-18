import React from "react";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import PropTypes from "prop-types";
import {createPortal} from "react-dom";

const Modal = ({children, onClose}) => {
    const modalRoot = document.getElementById("react-modals");

    return createPortal(
            <div>
                <ModalOverlay onClose={onClose}/>

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
