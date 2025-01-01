import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
} from "lucide-vue-next";
import {IssuesPriority} from "@/interface/issus.interface.ts";

type IssuesPriorityTransformerType = {
    name: string;
    icon: never;
    color: string;
};

export const issuesPriorityTransformer = (status: IssuesPriority): IssuesPriorityTransformerType => {
    let dateReturn = {
        name: 'Medium',
        icon: ArrowRight,
        color: 'text-yellow-500'
    }
    switch (status) {
        case 'high':
            dateReturn = {
                name: 'High',
                icon: ArrowUp,
                color: 'text-red-500'
            }
            break
        case 'medium':
            dateReturn = {
                name: 'Medium',
                icon: ArrowRight,
                color: 'text-yellow-500'
            }
            break
        case 'low':
            dateReturn = {
                name: 'Low',
                icon: ArrowDown,
                color: 'text-blue-500'
            }
            break
        default:
            dateReturn = {
                name: 'Medium',
                icon: ArrowRight,
                color: 'text-yellow-500'
            }
            break
    }

    return <IssuesPriorityTransformerType>dateReturn
}