import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DocumentModule } from './modules/document/document.module';
import { ImgModule } from './modules/img/img.module';


@Module({
  imports: [UserModule, DocumentModule, ImgModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
