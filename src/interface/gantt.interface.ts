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

/**
 * Interface for Gantt tasks
 */
export interface Task {
    id: string;
    name: string;
    start: string; // ISO format date string (YYYY-MM-DD)
    end?: string;  // ISO format date string (calculated from duration)
    duration: number;
    progress?: number;
    dependencies?: string[];
}

/**
 * Interface for Gantt chart configuration
 */
export interface GanttConfig {
    header_height: number;
    column_width: number;
    step: number;
    view_modes: string[];
    bar_height: number;
    bar_corner_radius: number;
    arrow_curve: number;
    padding: number;
    view_mode: string;
    date_format: string;
    language: string;
    on_click?: (task: Task) => void;
    on_date_change?: (task: Task, start: Date, end: Date) => void;
    on_progress_change?: (task: Task, progress: number) => void;
    on_view_change?: (mode: string) => void;
}

/**
 * API Gantt interface (matches backend model)
 */
export interface ApiGanttInterface {
    "@id": string;
    "@type": string;
    id?: number;
    name: string;
    begunAt: string; // ISO format date string
    progress: number;
    duration: number;
    parent?: ApiGanttInterface | string | null;
    childs?: ApiGanttInterface[] | null;
    project?: any;
    repositories?: any[];
}
