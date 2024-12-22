import type { User } from './user.interface';
import type { Issus } from './issus.interface';

export interface Repository {
  id: number;
  name: string;
  url: string;
  description?: string;
  language?: string;
  stars?: number;
  lastActivity?: string;
}

export interface ProjectMember {
  id: number;
  user: User;
  role: 'owner' | 'maintainer' | 'developer' | 'guest';
  joinedAt: string;
}

export interface ProjectSettings {
  isPrivate: boolean;
  allowIssues: boolean;
  allowMergeRequests: boolean;
  defaultBranch: string;
  description?: string;
  tags?: string[];
}

export interface Project {
  id: number;
  name: string;
  icon: string;
  slug: string;
  description?: string;
  repositories: Repository[];
  members: ProjectMember[];
  settings: ProjectSettings;
  issues?: Issus[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectStats {
  totalIssues: number;
  openIssues: number;
  closedIssues: number;
  totalRepositories: number;
  totalMembers: number;
  issuesByPriority: {
    high: number;
    medium: number;
    low: number;
  };
  issuesByStatus: {
    open: number;
    inProgress: number;
    done: number;
  };
}
