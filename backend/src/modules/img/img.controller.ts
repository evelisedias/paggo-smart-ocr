import { Controller, Post, Get, Put, Body, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgDTO } from './img.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer'

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))  
  async create(@UploadedFile() file: Multer.File) {  
    return this.imgService.create(file);  
  }

  @Get()
  async findAll() {
    return this.imgService.findAll();  
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() data: ImgDTO) {
    return this.imgService.update(id, data);  
  }

  @Delete(':id')  
  async delete(@Param('id') id: number) {
    return this.imgService.delete(id); 
  }
}
