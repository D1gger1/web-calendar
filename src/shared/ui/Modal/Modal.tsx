import React from "react";
import type { ModalProps } from "./Modal.types";
import styles from "./Modal.module.scss";
import closeBtn from '../../../assets/closeBtn.svg';

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
                <div className={styles.header}>
                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close modal"
                    >
                        <img src={closeBtn} alt="" className={styles.closeIcon} />
                    </button>
                </div>

                {children}
            </div>
        </div>
    );
};
