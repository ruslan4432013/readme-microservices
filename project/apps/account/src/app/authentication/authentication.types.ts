import { PublicationUserEntity } from '../publication-user/publication-user.entity';

export interface RequestWithUser {
  user?: PublicationUserEntity;
}
