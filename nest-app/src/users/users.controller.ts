import { Controller, Get, Post, Body, Param, ParseIntPipe, UseGuards, UsePipes } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { ValidationPipe } from 'src/pipes/validation.pipes';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('api/v1')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UsePipes(new ValidationPipe())
  @Post('/add-user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/get-user/:id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.usersService.findOne(+id);
  }
}
