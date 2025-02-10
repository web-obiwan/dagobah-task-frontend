import type {LabelInterface} from "@/interface/label.interface.ts";
import axios from "@/plugin/xior/api.default.ts";

export const getLabelCollection = async (): Promise<LabelInterface[]> => {
    const response = await axios.get('/labels', {params: {pagination: false,}});
    return response.data.member as LabelInterface[];
}