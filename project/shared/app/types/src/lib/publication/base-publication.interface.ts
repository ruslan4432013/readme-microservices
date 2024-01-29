import { PublicationStatus } from './publication-status.enum';
import { PublicationType } from './publication-type.enum';

import { Tag } from '../tag';

export interface BasePublication {
  id?: string
  tags?: Tag[]
  status: PublicationStatus
  publishedAt?: Date | null
  createdAt?: Date
  updatedAt?: Date
  isReposted: boolean
  currentOwnerId: string
  originalOwnerId: string
  sourceId: string
  type: PublicationType
  likes?: number,
  comments?: number,
}
