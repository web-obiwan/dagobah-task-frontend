import type {ProjectInterface} from "@/interface/project.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getProjectCollection = async (): Promise<ProjectInterface[]> => {
    const response = await axios.get('/projects', {params: {pagination: false,}});
    return response.data.member as ProjectInterface[];
}

export const getProject = async (issueId: number | string): Promise<ProjectInterface> => {
    const response = await axios.get('/projects/' + issueId);
    return response.data as ProjectInterface;
}

export const updateProject = async (issueId: string | number, data: object): Promise<ProjectInterface> => {
    const response = await axios.put(`/projects/${issueId}`, data);
    return response.data as ProjectInterface;
}

export const createProject = async (data: object): Promise<ProjectInterface> => {
    const response = await axios.post('/projects', data);
    return response.data as ProjectInterface;
}

export const softDeleteProject = async (issueId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/projects/${issueId}`);
    return response.status == 200;
}
