import { CircleCheck, CircleDotDashed, CircleFadingArrowUp, CircleGauge, CircleOff } from "lucide-vue-next";
import type { IssuesStatus } from "@/interface/issus.interface";

type IssusStatusTransformerType = {
    name: string;
    icon: any;
    color: string;
};

const statusMap: Record<IssuesStatus, IssusStatusTransformerType> = {
    BACKLOG: {
        name: 'Backlog',
        icon: CircleDotDashed,
        color: 'text-orange-500'
    },
    PLANNED: {
        name: 'Planned',
        icon: CircleGauge,
        color: 'text-blue-500'
    },
    IN_PROGRESS: {
        name: 'In Progress',
        icon: CircleFadingArrowUp,
        color: 'text-orange-500'
    },
    COMPLETED: {
        name: 'Completed',
        icon: CircleCheck,
        color: 'text-indigo-500'
    },
    CANCELED: {
        name: 'Canceled',
        icon: CircleOff,
        color: 'text-red-500'
    }
};

export const issusStatusTransformer = (status: IssuesStatus): IssusStatusTransformerType => {
    return statusMap[status] || statusMap.CANCELED;
};