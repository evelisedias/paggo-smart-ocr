import { Controller, Post, Get, Put, Body, Param, Delete, UseInterceptors, UploadedFile, Req } from '@nestjs/common';
import { ImgService } from './img.service';
import { ImgDTO } from './img.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { Multer } from 'multer'

@Controller('img')
export class ImgController {
  constructor(private readonly imgService: ImgService) { }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: multer.diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async create(@UploadedFile() file: Multer.File) {
    const filename = file.originalname;
    const newImage = await this.imgService.create ({
      title: filename,
      userId: 1
    })
    return {
      message: "upload realizado com sucesso!",
      Image:newImage
    }
  }


  @Get()
  async findAll() {
    return this.imgService.findAll();
  }

  @Get('/img')
  async getUserImages(@Req() request) {
    const filename = request.query.filename; 
    return this.imgService.getImagesByFilename(filename); 
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
