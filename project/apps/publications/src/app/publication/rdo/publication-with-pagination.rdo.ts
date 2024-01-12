import { Expose } from 'class-transformer';
import { PublicationRdo } from './publication.rdo';

export class PublicationWithPaginationRdo<Rdo extends PublicationRdo = PublicationRdo> {
  @Expose()
  public entities: Rdo[];

  @Expose()
  public totalPages: number;

  @Expose()
  public totalItems: number;

  @Expose()
  public currentPage: number;

  @Expose()
  public itemsPerPage: number;
}
