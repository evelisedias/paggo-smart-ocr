import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractTextFromImage(imageBuffer: Buffer, lang: string = 'por'): Promise<string> {
    try {
      const startTime = Date.now();

      const { data: { text } } = await Tesseract.recognize(imageBuffer, lang);
      console.log('Texto Extraído: ', text);
      
      const duration = (Date.now() - startTime) / 1000;
      console.log(`Extração concluída em ${duration} segundos`);
      
      return text;
    } catch (error) {
      console.error('Erro ao extrair texto da imagem: ', error);
      throw new HttpException('Erro ao extrair texto da imagem', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
