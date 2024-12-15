export interface Sprint {
  id: number
  name: string
  startDate: string
  endDate: string
  status: 'active' | 'completed' | 'planned'
}
