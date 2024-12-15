import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { DocumentService } from './document.service';
import { DocumentDTO } from './document.dto';

@Controller('documents')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Post()
   async create(@Body() data: DocumentDTO){
    return this.documentService.create(data)
    }
  
  @Get()
  async findAll() {
    return this.documentService.findAll();
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: DocumentDTO){
    return this.documentService.update(id, data);
  }

  @Delete(':id')
  async delete (@Param('id') id: number) {
    return this.documentService.delete(id)
  }
}
