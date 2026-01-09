export const formatHour = (hour: number): string => {
    const period = hour < 12 ?'am' : 'pm'
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;

    return `${formattedHour} ${period}`
}