import {ProjectInterface} from "@/interface/project.interface.ts";
import {RepositoryInterface} from "@/interface/repository.interface.ts";

export interface GanttInterface {
    "@id": string;
    "@type": string;
    id?: number;
    name: string;
    project: ProjectInterface;
    repositories: RepositoryInterface[];
    begunAt: string;
    progress: number;
    duration: number;
    parent?: GanttInterface | null;
    childs?: GanttInterface[] | null;
}
