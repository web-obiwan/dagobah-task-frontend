import type {GanttInterface} from "@/interface/gantt.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

/**
 * Fetch collection of Gantt entities
 * @param params Query parameters
 * @returns Array of Gantt entities
 */
export const getGanttCollection = async (params: object): Promise<GanttInterface[]> => {
    const response = await axios.get('/gantts', {params: {pagination: false, ...params}});
    return response.data.member as GanttInterface[];
}

/**
 * Get a specific Gantt entity by ID
 * @param gattId Gantt ID
 * @returns Gantt entity
 */
export const getGantt = async (gattId: number | string): Promise<GanttInterface> => {
    const response = await axios.get('/gantts/' + gattId);
    return response.data as GanttInterface;
}

/**
 * Update an existing Gantt entity
 * @param gattId Gantt ID
 * @param data Updated data
 * @returns Updated Gantt entity
 */
export const updateGantt = async (gattId: string | number, data: object): Promise<GanttInterface> => {
    const response = await axios.put(`/gantts/${gattId}`, data);
    return response.data as GanttInterface;
}

/**
 * Create a new Gantt entity
 * @param data Gantt data
 * @returns Created Gantt entity
 */
export const createGantt = async (data: object): Promise<GanttInterface> => {
    const response = await axios.post('/gantts', data);
    return response.data as GanttInterface;
}

/**
 * Delete a Gantt entity
 * @param gattId Gantt ID
 * @returns Success status
 */
export const softDeleteGantt = async (gattId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/gantts/${gattId}`);
    return response.status == 200;
}
