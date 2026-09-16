/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import bcrypt from 'bcrypt';
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(data: CreateUserDTO) {
    try {

      const hashPassword = await bcrypt.hash(data.password, 10);

      const newUser = await this.prisma.user.create({
        data: {
          userName: data.userName,
          email: data.email,
          password: hashPassword,
          birthDate: new Date(data.birthDate),
        },
      });

      const { password: _password, ...userWithoutPassword } = newUser;
      return userWithoutPassword;
    } catch (error: any) {
      if (error.code === 'P2002') {
        throw new ConflictException('This email address is already in use.');
      }
      throw error;
    }
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const { password: _password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    if (!users) {
      throw new NotFoundException('Users not found.');
    }

    return users.map((user) => {
      const { password: _password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async update(id: string, data: UpdateUserDTO) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: { id },
        data: {
          userName: data.userName,
          email: data.email,
          password: data.password,
          birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        },
      });

      const { password: _password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found');
      }
      throw error;
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (error: any) {
      if (error.code === 'P2025') {
        throw new NotFoundException('User not found.');
      }
      throw error;
    }
  }
}
