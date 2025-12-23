import React from "react";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.css";

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <button onClick={onClose}></button>
                {children}
            </div>

        </div>
    )
}