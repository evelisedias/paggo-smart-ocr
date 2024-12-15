import { Module } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgController } from './img.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [ImgController],
  providers: [ImgService, PrismaService],
})
export class ImgModule {}
