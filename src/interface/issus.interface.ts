import {User, UserInterface} from './user.interface';
import {Sprint, SprintInterface} from './sprint.interface';
import type { ProjectInterface } from './project.interface.ts';
import {RepositoryInterface} from "@/interface/repository.interface.ts";
import {PriorityInterface} from "@/interface/priority.interface.ts";
import {LabelInterface} from "@/interface/label.interface.ts";
import {ResponseInterface} from "@/interface/response-api.interface.ts";

export type IssuesStatus = 'BACKLOG' | 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELED';

export interface Issues {
  id: number;
  name: string;
  reference: string;  // e.g., "GAT-01"
  description: string;
  status: IssuesStatus;
  priority: 'low' | 'medium' | 'high';
  project: ProjectInterface;
  sprint?: Sprint;
  assignee?: User | null;
  labels?: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IssueInterface {
  "@id": string
  "@type": "Issue"
  id: number
  name: string
  reference: string
  storyPoint: number | null
  description: string | null
  repositories: RepositoryInterface[]
  project: ProjectInterface
  sprint: SprintInterface
  reporter: UserInterface | null
  owner: UserInterface | null
  reviewer: UserInterface | null
  status: IssuesStatus
  priority: PriorityInterface
  labels: LabelInterface[]
  deadline: string | null
  isArchived: boolean
}

export interface IssueResponseInterface extends ResponseInterface {
  member : IssueInterface[]
}

export interface KanbanBoard {
  backlog: IssueInterface[];
  planned: IssueInterface[];
  in_progress: IssueInterface[];
  completed: IssueInterface[];
  canceled: IssueInterface[];
}
