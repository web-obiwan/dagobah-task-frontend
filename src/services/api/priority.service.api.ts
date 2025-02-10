import type {PriorityInterface} from "@/interface/priority.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getPriorityCollection = async (): Promise<PriorityInterface[]> => {
    const response = await axios.get('/priorities', {params: {pagination: false,}});
    return response.data.member as PriorityInterface[];
}