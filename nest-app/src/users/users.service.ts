import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private jwtService: JwtService
  ) { }

  async create(dto: CreateUserDto) {
    const user = await this.getUserByEmail(dto.email);
    if (user) {
      // If the user already exists, we check their name and password.
      const loginUser = await this.login(dto, user);
      return { status: 201, ...loginUser, user }; // return token
    }

    const hashPassword = await bcrypt.hash(dto.password, 5);
    const createUser = await this.userRepository.create({ ...dto, password: hashPassword });
    if (!createUser) {
      throw new HttpException("Error saving data.", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const token = this.generateToken(createUser.dataValues);

    console.log(createUser.dataValues);

    return { status: 201, token };
  }

  private async login(dto: CreateUserDto, user: User) {
    const passwordEquals = await bcrypt.compare(dto.password, user.password);

    if (!user && !passwordEquals) {
      throw new HttpException("Incorrect name or password.", HttpStatus.UNAUTHORIZED);
    }

    const token = this.generateToken(user);

    return token;
  }

  private generateToken(user: User) {
    const payload = { id: user.id, name: user.name, email: user.email };

    const token = this.jwtService.sign(payload);

    return {
      token
    };
  }

  async findOne(id: number) {
    const user = await this.getUserById(id);
    if (!user) {
      throw new HttpException("User not found.", HttpStatus.NOT_FOUND);
    }

    // remove field password
    delete user.dataValues.password;

    return user;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findByPk(id);
    return user;
  }

  async getUserByName(name: string) {
    const user = await this.userRepository.findOne({ where: { name } });
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }
}
