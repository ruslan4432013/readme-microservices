import { Controller, Get, Param } from "@nestjs/common";
import { PublicationService } from "./publication.service";
import { fillPublicationDTO } from "./publication.helper";


@Controller()
export class PublicationController {

  constructor(
    private readonly publicationService: PublicationService
  ) {
  }

  @Get('')
  public async index() {
    const publications = await this.publicationService.getAllPublications()
    const entities = publications.entities
      .map((publication) => fillPublicationDTO(publication))
    return {
      ...publications,
      entities
    }
  }

  @Get('/:id')
  public async show(@Param('id') id: string) {
    const publication = await this.publicationService.getPublication(id);
    return fillPublicationDTO(publication)
  }
}
