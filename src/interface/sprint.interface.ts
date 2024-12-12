export interface Sprint {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'active' | 'COMPLETED' | 'PLANNED'
}

export interface SprintInterface {
  "@id": string
  "@type": "Sprint"
  id: number
  name: string
  begunAt: string
  endedAt: string
}