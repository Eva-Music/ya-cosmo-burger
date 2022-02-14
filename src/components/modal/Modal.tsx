import React, {useEffect} from "react";
import styles from "./modal.module.css";
import ModalOverlay from "./ModalOverlay";
import {createPortal} from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

type TModal = {
    children: React.ReactNode;
    onClose: () => void;
}

export const Modal = ({children, onClose}: TModal) => {
    const modalRoot: HTMLElement | any = document.getElementById("react-modals");

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
