import React, {useEffect} from "react";
import styles from "./modal-overlay.module.css"
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {

    useEffect(() => {
        document.addEventListener("keydown", onClose, false);

        return () => {
            document.removeEventListener("keydown", onClose, false);
        };
    }, []);

    return (
        <div className={styles.layout}>
            <div onClick={onClose} className={styles.close}>
                <div className={styles.icon}>
                    <CloseIcon type="primary"/>
                </div>
            </div>
        </div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;