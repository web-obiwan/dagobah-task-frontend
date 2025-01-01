import {CircleCheck, CircleDotDashed, CircleFadingArrowUp, CircleGauge, CircleOff} from "lucide-vue-next";
import {IssuesStatus} from "@/interface/issus.interface.ts";

type IssusStatusTransformerType = {
    name: string;
    icon: never;
    color: string;
};

export const issusStatusTransformer = (status: IssuesStatus): IssusStatusTransformerType => {
    let dateReturn = {
        name: 'Backlog',
        icon: CircleDotDashed,
        color: 'text-orange-500'
    }
    switch (status) {
        case 'backlog':
            dateReturn = {
                name: 'Backlog',
                icon: CircleDotDashed,
                color: 'text-orange-500'
            }
            break
        case 'planned':
            dateReturn = {
                name: 'Planned',
                icon: CircleGauge,
                color: 'text-bleu-500'
            }
            break
        case 'inProgress':
            dateReturn = {
                name: 'In Progress',
                icon: CircleFadingArrowUp,
                color: 'text-orange-500'
            }
            break
        case 'completed':
            dateReturn = {
                name: 'Completed',
                icon: CircleCheck,
                color: 'text-indigo-500'
            }
            break
        case 'canceled': {
            dateReturn = {
                name: 'Canceled',
                icon: CircleOff,
                color: 'text-red-500'
            }
        }
        break
        default:
            dateReturn = {
                name: 'Canceled',
                icon: CircleOff,
                color: 'text-red-500'
            }
            break
    }

    return <IssusStatusTransformerType>dateReturn
}