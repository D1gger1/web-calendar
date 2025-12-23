import React from "react";
import type { CheckboxProps } from "./Checkbox.types";
import styles from "./Checkbox.module.css";

export const Checkbox: React.FC<CheckboxProps> = ({ checked, onChange, label, disabled, children}) => {
    return (
        <label className={styles.checkboxLabel} >
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} disabled={disabled} className={styles.checkboxInput}/>
            {label}
            {children}
        </label>
    );
}
