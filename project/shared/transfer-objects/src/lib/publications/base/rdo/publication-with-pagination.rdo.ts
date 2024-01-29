import { Expose } from 'class-transformer';

import { PublicationRDO } from './publication.rdo';

export class PublicationWithPaginationRDO<Rdo extends PublicationRDO = PublicationRDO> {
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
