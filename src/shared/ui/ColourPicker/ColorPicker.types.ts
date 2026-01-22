export interface ColorPickerProps {
    value: string;
    onChange: (value: string) => void;
    presetColors?: string[];
    className: string;
}