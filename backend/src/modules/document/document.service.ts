import { Injectable } from '@nestjs/common';
import { DocumentDTO} from './document.dto';
import { PrismaService } from 'src/database/PrismaService';

@Injectable()
export class DocumentService {

  constructor(private prisma: PrismaService){}
  async create (data: DocumentDTO){
    const document = await this.prisma.document.create({
      data,
    })
    return document;
}

  async findAll(){
    return this.prisma.document.findMany();
  }

  async update (id: number, data: DocumentDTO){
    return this.prisma.document.update({
      where: { id },
      data,
    })
  }

  async delete (id: number) {
    return this.prisma.document.delete({
      where: { id },
    })
  }

}
