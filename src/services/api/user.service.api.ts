import type {UserInterface} from "@/interface/user.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getUserCollection = async (): Promise<UserInterface[]> => {
    const response = await axios.get('/users', {params: {pagination: false,}});
    return response.data.member as UserInterface[];
}

export const getUser = async (issueId: number | string): Promise<UserInterface> => {
    const response = await axios.get('/users/' + issueId);
    return response.data as UserInterface;
}

export const updateUser = async (issueId: string | number, data: object): Promise<UserInterface> => {
    const response = await axios.put(`/users/${issueId}`, data);
    return response.data as UserInterface;
}

export const createUser = async (data: object): Promise<UserInterface> => {
    const response = await axios.post('/users', data);
    return response.data as UserInterface;
}

export const softDeleteUser = async (issueId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/users/${issueId}`);
    return response.status == 200;
}
