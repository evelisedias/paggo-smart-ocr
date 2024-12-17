import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'src/database/PrismaService';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt'; 
import { UserDTO } from './user.dto';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService 
  ) {}

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

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    const payload = { userId: user.id, email: user.email };
    const token = this.jwtService.sign(payload); 

    return { 
      message: 'Login bem-sucedido', 
      token 
    };  
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
