import React from "react";
import type { SelectProps } from "./Select.types";
import styles from "./Select.module.css";

export const Select: React.FC<SelectProps> = ({options, value, onChange}) => {
    return (
        <select value={value}  onChange={(e) => onChange(e.target.value)} className={styles.select}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    )
}  