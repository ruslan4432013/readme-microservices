import { Expose, Type } from "class-transformer";
import { TagRdo } from "../../publication-tag/rdo/publication-tag.rdo";

export class PublicationRdo {
  @Expose()
  id: string

  @Expose()
  type: string

  @Expose()
  likes: number

  @Expose()
  comments: number

  @Expose()
  createdAt: Date

  @Expose()
  currentOwnerId: string

  @Expose()
  link: string;

  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];

  @Expose()
  name: string;

}
