import React, {useRef} from "react";
import styles from "./modal-overlay.module.css"
import PropTypes from "prop-types";

const ModalOverlay = ({onClose}) => {
    const ref = useRef();

    const handleClickOutside = (e) => {
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