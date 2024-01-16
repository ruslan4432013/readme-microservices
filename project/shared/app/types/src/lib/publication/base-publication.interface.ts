import { Tag } from "../tag";
import { PublicationStatus } from "./publication-status.enum";
import { PublicationType } from "./publication-type.enum";

export interface BasePublication {
  id?: string
  tags?: Tag[]
  status: PublicationStatus
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
