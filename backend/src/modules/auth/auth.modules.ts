import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { PrismaService } from 'src/database/PrismaService';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'O$ucessoetreinavel@01', 
      signOptions: { expiresIn: '1d' }, 
    }),
  ],
  controllers: [UserController],
  providers: [UserService, PrismaService, JwtStrategy],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
