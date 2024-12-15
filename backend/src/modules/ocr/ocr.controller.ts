import { Controller, Post, Param } from '@nestjs/common';
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
  

  @Post('id')
  async extractText(@Param('id') id: number) {
    try {
      const image = await this.imgService.findById(id);

      if (!image){
        throw new Error ('Imagem não encontrada.');
      }

      const imagePath = path.join(__dirname, '..', '..', 'upload', image.title);

      const imageBuffer = fs.readFileSync(imagePath);

      const text = await this.ocrService.extractTextFromImage(imageBuffer)

      return { text }
    } catch (error) {
      console.error('Erro ao extrair o texto: ', error);
      throw new Error ('Erro ao extrair o texto da imagem')
    }
  }

}
