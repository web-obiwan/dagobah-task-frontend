import type {RepositoryInterface} from "@/interface/repository.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getRepositoryCollection = async (): Promise<RepositoryInterface[]> => {
    const response = await axios.get('/repositories', {params: {pagination: false,}});
    return response.data.member as RepositoryInterface[];
}

export const getRepository = async (issueId: number | string): Promise<RepositoryInterface> => {
    const response = await axios.get('/repositories/' + issueId);
    return response.data as RepositoryInterface;
}

export const updateRepository = async (issueId: string | number, data: object): Promise<RepositoryInterface> => {
    const response = await axios.put(`/repositories/${issueId}`, data);
    return response.data as RepositoryInterface;
}

export const createRepository = async (data: object): Promise<RepositoryInterface> => {
    const response = await axios.post('/repositories', data);
    return response.data as RepositoryInterface;
}

export const softDeleteRepository = async (issueId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/repositories/${issueId}`);
    return response.status == 200;
}
