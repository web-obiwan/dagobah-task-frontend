import type {SprintInterface} from "@/interface/sprint.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getSprintCollection = async (): Promise<SprintInterface[]> => {
    const response = await axios.get('/sprints', {params: {pagination: false,'order[createdAt]': 'desc' }});
    return response.data.member as SprintInterface[];
}

export const getSprint = async (issueId: number | string): Promise<SprintInterface> => {
    const response = await axios.get('/sprints/' + issueId);
    return response.data as SprintInterface;
}

export const updateSprint = async (issueId: string | number, data: object): Promise<SprintInterface> => {
    const response = await axios.put(`/sprints/${issueId}`, data);
    return response.data as SprintInterface;
}

export const createSprint = async (data: object): Promise<SprintInterface> => {
    const response = await axios.post('/sprints', data);
    return response.data as SprintInterface;
}

export const softDeleteSprint = async (issueId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/sprints/${issueId}`);
    return response.status == 200;
}
