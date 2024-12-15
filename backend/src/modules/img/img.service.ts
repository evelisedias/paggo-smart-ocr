import { Injectable } from '@nestjs/common';
import { ImgDTO } from './img.dto';
import { PrismaService } from '../../database/PrismaService';
import { Multer } from 'multer';
import { connect } from 'http2';


@Injectable()
export class ImgService {

  constructor(private prisma: PrismaService) {}

  async create(file: Multer.File) {
    try {
      const imagePath = `/uploads/${file.filename}`;
  
      const image = await this.prisma.img.create({
        data: {
            title: file.originalname,
            uploadedAt: new Date(),
            imagePath,
            user: {
              connect: { id: 11}
            },
            
        },
      });
  
      return image;
   
    } catch (error) {
      console.error('Erro ao criar a imagem:', error);
      throw new Error('Erro ao salvar a imagem.');
    }
  }
  

  async findAll() {
    return this.prisma.img.findMany();
  }

  async getImagesByUserId(userId: number) {
    return this.prisma.img.findMany({
      where: {
        userId: userId,
      }
    })
  }

  async findById(id: number) {
    try {
      const image = await this.prisma.img.findUnique({
        where: { id },
      });

      if (!image) {
        throw new Error('Imagem não encontrada');
      }

      return image;
    } catch (error) {
      console.error('Erro ao buscar imagem:', error);
      throw new Error('Erro ao buscar a imagem.');
    }
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

