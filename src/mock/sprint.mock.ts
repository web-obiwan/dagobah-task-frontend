import type { Sprint } from '@/interface/sprint.interface'

export const mockSprints: Sprint[] = [
  {
    id: 1,
    name: "Sprint 1 - Initial Setup",
    startDate: "2024-01-01",
    endDate: "2024-01-14",
    status: "COMPLETED"
  },
  {
    id: 2,
    name: "Sprint 2 - Core Features",
    startDate: "2024-01-15",
    endDate: "2024-01-28",
    status: "active"
  },
  {
    id: 3,
    name: "Sprint 3 - UI Enhancement",
    startDate: "2024-01-29",
    endDate: "2024-02-11",
    status: "PLANNED"
  }
]
