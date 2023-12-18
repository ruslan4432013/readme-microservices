import { PublicationStatus } from './publication-status.enum';

export interface Publication {
  id?: string
  tags?: string[]
  status: PublicationStatus
  createdAt: number
  updatedAt: number
  isReposted: boolean
  currentOwnerId: string
  originalOwnerId: string
  sourceId: string
}
