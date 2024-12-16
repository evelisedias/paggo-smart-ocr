import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ImgModule } from './modules/img/img.module';  
import { UserModule } from './modules/user/user.module';  
import { OcrModule } from './modules/ocr/ocr.module'; 

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),  
      serveRoot: '/uploads',  
    }),
    ImgModule,  
    UserModule,  
    OcrModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
