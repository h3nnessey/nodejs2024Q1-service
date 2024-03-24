import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransformPlainToInstance } from 'class-transformer';
import { User } from './entities';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @TransformPlainToInstance(User)
  async create(createUserDto: CreateUserDto) {
    return this.userRepository.save(createUserDto);
  }

  @TransformPlainToInstance(User)
  async findMany() {
    return this.userRepository.find();
  }

  @TransformPlainToInstance(User)
  async findOne(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @TransformPlainToInstance(User)
  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    return this.userRepository.save({
      ...user,
      password: newPassword,
    });
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);
  }
}
