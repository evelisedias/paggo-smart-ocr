import { Controller, Get, Param, HttpException, HttpStatus } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { ImgService } from '../img/img.service';
import * as fs from 'fs';
import * as path from 'path';

@Controller('ocr')
export class OcrController {
  constructor(
    private readonly ocrService: OcrService,
    private readonly imgService: ImgService
  ) {}

  @Get('extract-text/:id')
  async extractText(@Param('id') id: string) {
    try {
      const numericId = parseInt(id, 10);
      if (isNaN(numericId)) {
        throw new HttpException('ID inválido.', HttpStatus.BAD_REQUEST);
      }

      const image = await this.imgService.findById(numericId);
      if (!image) {
        throw new HttpException('Imagem não encontrada.', HttpStatus.NOT_FOUND);
      }

      const imagePath = path.join(process.cwd(), 'upload', image.title);
      if (!fs.existsSync(imagePath)) {
        throw new HttpException('Arquivo de imagem não encontrado.', HttpStatus.NOT_FOUND);
      }

      const imageBuffer = fs.readFileSync(imagePath);
      const text = await this.ocrService.extractTextFromImage(imageBuffer);

      return {
        message: 'Texto extraído com sucesso',
        imageTitle: image.title,
        extractedText: text,
      };
    } catch (error) {
      console.error('Erro ao extrair o texto: ', error);
      throw new HttpException(
        'Erro ao extrair o texto da imagem',
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
