import React from "react";
import type { DatePickerProps } from "./DatePicker.types";
import styles from "./DatePicker.module.css";

export const DatePicker: React.FC<DatePickerProps> = ({value, onChange, disabled}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(new Date(e.target.value));
    }

    const formattedValue = value.toISOString().split('T')[0];

    return(
        <input
            type="date"
            value={formattedValue}
            onChange={handleChange}
            disabled={disabled}
            className={styles.datePicker}
        />
    )
}