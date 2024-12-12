import {
    ArrowDown,
    ArrowRight,
    ArrowUp,
    TriangleAlert
} from "lucide-vue-next";

type IssuesPriorityTransformerType = {
    name: string;
    icon: never;
    color: string;
};

export const issuesPriorityTransformer = (status: string): IssuesPriorityTransformerType => {
    let dateReturn = {
        name: 'Medium',
        icon: ArrowRight,
        color: 'text-yellow-500'
    }
    switch (status?.toLowerCase()) {
        case 'hight':
            dateReturn = {
                name: 'Hight',
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
        case 'critical':
            dateReturn = {
                name: 'Critical',
                icon: TriangleAlert,
                color: 'text-red-700'
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