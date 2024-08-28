import { Controller, Get, Query, StreamableFile } from '@nestjs/common';
import { DocumentoService } from './documento.service';

@Controller('documento')
export class DocumentoController {
  constructor(private readonly documentoService: DocumentoService) {}

  
  @Get("/documento")
  async getDocument(@Query("id") id: string) {
    const document = await this.documentoService.getDocumento(id);
    return new StreamableFile(document, {
      type: 'application/pdf',
      disposition: `inline`,
    });
  }
}
