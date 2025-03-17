/**
 * Calculates the end date from a start date and duration
 * @param startDate Start date string in ISO format (YYYY-MM-DD)
 * @param durationDays Duration in days
 * @returns End date string in ISO format (YYYY-MM-DD)
 */
export const calculateEndDate = (startDate: string, durationDays: number): string => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + durationDays);
    return date.toISOString().slice(0, 10);
};

/**
 * Formats a date string to a human-readable format
 * @param dateString Date string in ISO format
 * @returns Formatted date string
 */
export const formatDate = (dateString: string): string => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {year: 'numeric', month: 'short', day: 'numeric'});
};

/**
 * Gets today's date in ISO format (YYYY-MM-DD)
 * @returns Today's date in ISO format
 */
export const getTodayISOString = (): string => {
    return new Date().toISOString().slice(0, 10);
};

/**
 * Calculates the number of days between two dates
 * @param startDate Start date
 * @param endDate End date
 * @returns Number of days between the dates
 */
export const calculateDuration = (startDate: Date, endDate: Date): number => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

/**
 * Formats a date to ISO format (YYYY-MM-DD)
 * @param date Date object
 * @returns ISO formatted date string
 */
export const formatToISODate = (date: Date): string => {
    return date.toISOString().slice(0, 10);
};

/**
 * Extracts the date part from an ISO datetime string
 * @param isoDatetime ISO datetime string
 * @returns Date part only (YYYY-MM-DD)
 */
export const extractDateFromISO = (isoDatetime: string): string => {
    return isoDatetime.split('T')[0];
};
