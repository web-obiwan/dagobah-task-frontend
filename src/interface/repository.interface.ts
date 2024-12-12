import {ProjectInterface} from "@/interface/project.interface.ts";

export interface RepositoryInterface {
    "@id": string
    "@type": "Repository"
    id: number
    name: string
    description: string
    project: ProjectInterface
    gitlabId: number
}