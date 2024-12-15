import { Injectable } from '@nestjs/common';
import { ImgDTO } from './img.dto';
import { PrismaService } from '../../database/PrismaService';
import { Multer } from 'multer';

@Injectable()
export class ImgService {

  constructor(private prisma: PrismaService) {}

  async create(file: Multer.File) {
    const imagePath = `/uploads/${file.filename}`;
  
    const image = await this.prisma.img.create({
      data: {
        title: file.originalname,
        uploadedAt: new Date(),
        userId: 1, 
      },
    });
  
    return image;
  }

  async findAll() {
    return this.prisma.img.findMany();
  }

  async update (id: number, data: ImgDTO){
    return this.prisma.img.update({
      where: {id},
      data,
    })
  }

  async delete (id: number){
    return this.prisma.img.delete({
      where: { id },
    })
  }
  
}

