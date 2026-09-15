import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findUserById(id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateUserDTO: UpdateUserDTO) {
    return this.usersService.update(id, updateUserDTO);
  }

  @Delete()
  async remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
