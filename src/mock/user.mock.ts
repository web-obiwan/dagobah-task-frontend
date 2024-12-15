import type { User } from '@/interface/user.interface'

export const mockUsers: User[] = [
  {
    id: 1,
    name: "Luke Skywalker",
    email: "luke@jedi-order.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Luke"
  },
  {
    id: 2,
    name: "Leia Organa",
    email: "leia@resistance.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Leia"
  },
  {
    id: 3,
    name: "Han Solo",
    email: "han@millennium-falcon.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Han"
  }
]
