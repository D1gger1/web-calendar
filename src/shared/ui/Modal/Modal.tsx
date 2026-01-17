import React from "react";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import closeBtn from '../../../assets/closeBtn.svg';

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Create event</h2>
                    <button onClick={onClose} className={styles.closeButton} aria-label="Close modal">
                        <img src={closeBtn} alt="close" className={styles.closeIcon} />
                    </button>
                </div>
                {children}
            </div>
        </div>
    )
}