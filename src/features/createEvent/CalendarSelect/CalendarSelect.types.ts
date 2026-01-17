export type CalendarOption = {
    id: string;
    title: string;
    color: string;
};

export type CalendarSelectProps = {
    value: CalendarOption;
    options: CalendarOption[];
    onChange: (option: CalendarOption) => void;
}