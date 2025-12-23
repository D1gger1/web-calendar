import React from "react";
import type { InputProps } from "./Input.types";
import styles from "./Input.module.css";

export const Input: React.FC<InputProps> = ({value, onChange, placeholder}) => {
    return(
        <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className={styles.input}
        />
    )
}