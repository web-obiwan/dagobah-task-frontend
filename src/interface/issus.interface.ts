import type { User } from './user.interface';
import type { Sprint } from './sprint.interface';

export type IssuesStatus = 'backlog' | 'planned' | 'inProgress' | 'completed' | 'canceled';
export type IssuesPriority = 'high' | 'medium' | 'low';

export interface Project {
  id: number;
  name: string;
  icon?: string;  // Optional icon property
}

export interface Issus {
  id: number;
  name: string;
  reference: string;  // e.g., "GAT-01"
  description: string;
  status: IssuesStatus;
  priority: 'low' | 'medium' | 'high';
  project: Project;
  sprint?: Sprint;
  assignee?: User;
  labels?: string[];
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface KanbanBoard {
  backlog: Issus[];
  planned: Issus[];
  inProgress: Issus[];
  completed: Issus[];
  canceled: Issus[];
}
