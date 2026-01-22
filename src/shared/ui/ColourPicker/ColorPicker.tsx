import React from "react";
import type { ColorPickerProps } from './ColorPicker.types';
import styles from "./ColorPicker.module.scss";

const defaultColors = [
    "#9F2957", "#D90056", "#E25D33", "#DFC45A", "#B8C42F", "#16AF6E",
    "#429488", "#397E49", "#a7afb4", "#6C7AC4", "#8332A4", "#6F42C1"
];

export const ColorPicker: React.FC<ColorPickerProps> = ({
    value,
    onChange,
    presetColors = defaultColors,
    className,
}) => {
    return (
        <div className={`${styles.palette} ${className ?? ''}`}>
            {presetColors.map((color) => (
                <button
                    key={color}
                    type="button"
                    className={`${styles.swatch} ${value === color ? styles.active : ""}`}
                    style={{ backgroundColor: color }}
                    onClick={() => onChange(color)}
                    aria-label={`Choose color ${color}`}
                />
            ))}
        </div>
    );
};
