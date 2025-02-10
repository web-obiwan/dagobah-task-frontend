import {RepositoryInterface} from "@/interface/repository.interface.ts";
import {defaultProject} from "@/data/default/project.data.default.ts";

export const defaultRepository: RepositoryInterface = {
    "@id": "",
    "@type": "Repository",
    id: 0,
    name: "",
    description: "",
    project: defaultProject,
    gitlabId: 0
}