import React from "react";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";


export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    children,
    className,
}) => {
    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div
                className={`${styles.modalContent} ${className ?? ''}`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
};
