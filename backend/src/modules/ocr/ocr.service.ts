import { Injectable } from '@nestjs/common';
import * as Tesseract from 'tesseract.js';

@Injectable()
export class OcrService {
  async extractTextFromImage (imageBuffer: Buffer): Promise<string>{
    try{
  
      const { data: {text}} = await Tesseract.recognize(imageBuffer, 'por')
      console.log('Texto Extraído: ', text);
      return text;
    } catch (error) {
      console.error('Erro ao extrair texto da imagem: ', error);
      throw new Error('Erro ao extrair texto da imagem')
    }
  }
}
