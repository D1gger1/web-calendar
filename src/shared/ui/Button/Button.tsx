import React from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.css";


export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, children }) => {
    return(
        <button onClick={onClick} disabled={disabled} className={styles.button}>
            {label}
            {children}
        </button>
    )
}