import React from "react";
import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";


export const Button: React.FC<ButtonProps> = ({ label, onClick, disabled, children, className}) => {
    return(
        <button onClick={onClick} disabled={disabled} className={`${styles.button} ${className || ''}`}>
            {children || label}
        </button>
    )
}