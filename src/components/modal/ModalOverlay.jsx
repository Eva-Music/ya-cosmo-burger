import React, {useEffect} from "react";
import styles from "./modal-overlay.module.css"
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose, children}) => {
    const modalRoot = document.getElementById("react-modals");

    useEffect(() => {
        document.addEventListener("keydown", onClose, false);

        return () => {
            document.removeEventListener("keydown", onClose, false);
        };
    }, []);

    return createPortal(
        <div className={styles.layout}>
            <div onClick={onClose} className={styles.close}>
                <CloseIcon type="primary"/>
            </div>
            {children}
        </div>,
        modalRoot
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;