export interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

export interface UserInterface {
  "@id": string
  "@type": "User"
  id: number
  username: string
  email: string
}
