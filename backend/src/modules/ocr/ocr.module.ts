import { Module } from '@nestjs/common';
import { OcrService } from './ocr.service';
import { OcrController } from './ocr.controller';
import { PrismaService } from 'src/database/PrismaService';
import { ImgService } from '../img/img.service';

@Module({
  controllers: [OcrController],
  providers: [OcrService, ImgService, PrismaService],
})
export class OcrModule {}
