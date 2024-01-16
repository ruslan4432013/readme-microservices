import { Expose, Type  } from "class-transformer";
import { TagRdo } from "../../../../publication-tag/rdo/publication-tag.rdo";

export class TextPublicationRdo {
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
  name: string;

  @Expose()
  announcement: string;

  @Expose()
  text: string;

  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];
}
