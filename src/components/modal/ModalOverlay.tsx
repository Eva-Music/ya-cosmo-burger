import React, {useRef} from "react";
import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";

type TModalOverlay = {
    onClose: () => void;
}

const ModalOverlay = ({onClose}: TModalOverlay) => {
    const ref: any = useRef();

    const handleClickOutside = (e: React.MouseEvent) => {
        if (ref && ref.current && ref.current.contains(e.target)) {
            onClose();
        }
    };

    return (
        <div onClick={handleClickOutside} ref={ref} className={styles.overlay}>
        </div>
    );
}

ModalOverlay.propTypes = {
    onClose: PropTypes.func.isRequired
}

export default ModalOverlay;