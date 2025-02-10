import {IssueInterface, KanbanBoard} from '@/interface/issus.interface'
import {IssuesStatus} from "@/data/default/status.data.default.ts";
import {defaultProject} from "@/data/default/project.data.default.ts";
import {defaultSprint} from "@/data/default/sprint.data.default.ts";
import {defaultPriority} from "@/data/default/priority.data.default.ts";

export const issuesDataDefault: IssueInterface = {
    "@id": "",
    "@type": "Issue",
    id: 0,
    name: "",
    reference: "",
    storyPoint: null,
    description: null,
    repositories: [],
    project: defaultProject,
    sprint: defaultSprint,
    reporter: null,
    owner: null,
    reviewer: null,
    status: IssuesStatus.BACKLOG,
    priority: defaultPriority,
    labels: [],
    deadline: '',
    isArchived: false
}


export const kanbanBoardDataDefault: KanbanBoard = {
    backlog: [
        issuesDataDefault
    ],
    planned: [
        issuesDataDefault
    ],
    in_progress: [
        issuesDataDefault
    ],
    completed: [
        issuesDataDefault
    ],
    canceled: [
        issuesDataDefault
    ]
}
