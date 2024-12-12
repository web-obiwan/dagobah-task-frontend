import type { User } from './user.interface';
import type { Issues } from './issus.interface';

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
  slug: string;
  description?: string;
  repositories: Repository[];
  members?: ProjectMember[];
  settings?: ProjectSettings;
  issues?: Issues[];
  createdAt: string;
  updatedAt: string;
}

export interface ProjectInterface {
  "@id": string;
  "@type": "Project";
  id: number;
  name: string;
  prefix: string;
  description: string | null;
}