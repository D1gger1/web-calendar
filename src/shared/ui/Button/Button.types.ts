export type ButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    children?: React.ReactNode;
}