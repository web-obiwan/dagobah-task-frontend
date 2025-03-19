/**
 * Generates a unique ID for a task
 * Format: 'task_' + timestamp + '_' + random number
 * @returns Unique task ID
 */
export const generateTaskId = (): string => {
    return 'task_' + Date.now() + '_' + Math.floor(Math.random() * 1000);
};

/**
 * Generates a UUID v4
 * @returns UUID string
 */
export const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

/**
 * Checks if an ID is valid (not empty and correctly formatted)
 * @param id ID to check
 * @returns True if ID is valid
 */
export const isValidId = (id: string | undefined | null): boolean => {
    if (!id) return false;
    return id.length > 0;
};

/**
 * Extracts numeric ID from a resource URI
 * Example: "/api/gantts/123" returns "123"
 * @param uri Resource URI
 * @returns Extracted ID or empty string if not found
 */
export const extractIdFromUri = (uri: string): string => {
    const parts = uri.split('/');
    return parts[parts.length - 1] || '';
};
