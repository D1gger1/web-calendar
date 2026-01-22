export type SelectMenuProps = {
    label?: string;
    value: string;
    onChange: (value: string) => void; 
    disabled?: boolean;
}