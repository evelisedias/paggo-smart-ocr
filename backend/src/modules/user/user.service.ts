import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import { UserDTO } from './user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: UserDTO) {
    const userExist = await this.prisma.user.findFirst({
      where: {
        email: data.email,
      },
    });

    if (userExist) {
      throw new HttpException('Usuário já existe', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,  
      },
    });

    return user;
  }
    //Realizar login

    async login (email: string, password: string) {
      const user = await this.prisma.user.findUnique({
        where: {email}
      });

      if (!user) {
        throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
      }
  
      return { message: 'Login bem-sucedido', user };  
    }

    

  async findAll() {
    return this.prisma.user.findMany();
  }

  async update(email: string, data: UserDTO) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email, 
      },
    });





    if (!userExist) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const updatedUser = await this.prisma.user.update({
      where: {
        email, 
      },
      data, 
    });

    return updatedUser;
  }
}
