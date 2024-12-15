import type { KanbanBoard } from '@/interface/issus.interface'
import { mockProjects } from './project.mock'
import { mockUsers } from './user.mock'

export const mockIssusData: KanbanBoard = {
  backlog: [
    {
      id: 1,
      name: "Implement user authentication",
      reference: "AUTH-001",
      description: "Add user authentication system with JWT tokens",
      status: "backlog",
      project: mockProjects[0],
      assignee: mockUsers[0],
      priority: "high",
      labels: ["feature", "security"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    },
    {
      id: 2,
      name: "Design database schema",
      reference: "DB-001",
      description: "Create initial database schema for the application",
      status: "backlog",
      project: mockProjects[0],
      assignee: mockUsers[1],
      priority: "medium",
      labels: ["design", "database"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    }
  ],
  planned: [
    {
      id: 3,
      name: "Setup CI/CD pipeline",
      reference: "DEV-001",
      description: "Configure GitHub Actions for automated deployment",
      status: "planned",
      project: mockProjects[1],
      assignee: mockUsers[2],
      priority: "high",
      labels: ["backend", "ci/cd"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    },
    {
      id: 4,
      name: "Create API documentation",
      reference: "DOC-001",
      description: "Write comprehensive API documentation using Swagger",
      status: "planned",
      project: mockProjects[1],
      assignee: mockUsers[0],
      priority: "medium",
      labels: ["documentation", "api"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    }
  ],
  inProgress: [
    {
      id: 5,
      name: "Implement search functionality",
      reference: "FEAT-001",
      description: "Add search feature with filters and sorting",
      status: "inProgress",
      project: mockProjects[2],
      assignee: mockUsers[1],
      priority: "high",
      labels: ["feature", "search"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    },
    {
      id: 6,
      name: "Create user dashboard",
      reference: "UI-001",
      description: "Design and implement main user dashboard",
      status: "inProgress",
      project: mockProjects[2],
      assignee: mockUsers[2],
      priority: "medium",
      labels: ["design", "ui"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    }
  ],
  completed: [
    {
      id: 7,
      name: "Setup project structure",
      reference: "SETUP-001",
      description: "Initialize project with Vue 3 and TypeScript",
      status: "completed",
      project: mockProjects[0],
      assignee: mockUsers[0],
      priority: "high",
      labels: ["setup", "project"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    },
    {
      id: 8,
      name: "Configure ESLint",
      reference: "TOOL-001",
      description: "Setup ESLint with proper configuration",
      status: "completed",
      project: mockProjects[1],
      assignee: mockUsers[1],
      priority: "low",
      labels: ["tooling", "eslint"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    }
  ],
  canceled: [
    {
      id: 9,
      name: "Implement WebSocket",
      reference: "FEAT-002",
      description: "Add real-time updates using WebSocket",
      status: "canceled",
      project: mockProjects[2],
      assignee: mockUsers[2],
      priority: "medium",
      labels: ["feature", "websocket"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    },
    {
      id: 10,
      name: "Add email notifications",
      reference: "NOTIF-001",
      description: "Implement email notification system",
      status: "canceled",
      project: mockProjects[0],
      assignee: mockUsers[0],
      priority: "low",
      labels: ["feature", "notifications"],
      createdAt: "2024-12-14",
      updatedAt: "2024-12-14"
    }
  ]
}
