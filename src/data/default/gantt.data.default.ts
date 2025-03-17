import {GanttInterface} from "@/interface/gantt.interface.ts";
import {defaultProject} from "@/data/default/project.data.default.ts";
import {defaultRepository} from "@/data/default/repository.data.default.ts";

export const ganttDataDefault: GanttInterface = {
    "@id": "",
    "@type": "",
    id: 0,
    name: "",
    project: defaultProject,
    repositories: [defaultRepository],
    begunAt: "",
    progress: 0,
    duration: 0,
    parent: null,
    childs: null
}
