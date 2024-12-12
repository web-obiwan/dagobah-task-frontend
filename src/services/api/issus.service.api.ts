import type {IssueInterface} from "@/interface/issus.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getIssueCollection = async (params: object): Promise<IssueInterface[]> => {
    const response = await axios.get('/issues', {params: {pagination: false, ...params}});
    return response.data.member as IssueInterface[];
}

export const getIssue = async (issueId: number | string): Promise<IssueInterface> => {
    const response = await axios.get('/issues/' + issueId);
    return response.data as IssueInterface;
}

export const updateIssue = async (issueId: string | number, data: object): Promise<IssueInterface> => {
    const response = await axios.put(`/issues/${issueId}`, data);
    return response.data as IssueInterface;
}

export const createIssue = async (data: object): Promise<IssueInterface> => {
    const response = await axios.post('/issues', data);
    return response.data as IssueInterface;
}

export const softDeleteIssue = async (issueId: string | number): Promise<boolean> => {
    const response = await axios.delete(`/issues/${issueId}`);
    return response.status == 200;
}
