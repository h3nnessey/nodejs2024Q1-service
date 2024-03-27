import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash, compare } from 'bcrypt';
import { TransformPlainToInstance } from 'class-transformer';
import { User } from './entities';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  @TransformPlainToInstance(User)
  async create({ login, password }: CreateUserDto) {
    const hashedPassword = await hash(password, 10);

    return this.userRepository.save({ login, password: hashedPassword });
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

  async findByCredentials({ login, password }: CreateUserDto) {
    const user = await this.userRepository.findOne({ where: { login } });
    const isValidPassword = await compare(password, user?.password);

    if (!user || !isValidPassword) {
      throw new ForbiddenException('Invalid User Credentials');
    }

    return user;
  }

  @TransformPlainToInstance(User)
  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isValidOldPassword = await compare(oldPassword, user.password);

    if (!isValidOldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    const newHashedPassword = await hash(newPassword, 10);

    return this.userRepository.save({
      ...user,
      password: newHashedPassword,
    });
  }

  async delete(id: string) {
    const user = await this.findOne(id);

    await this.userRepository.remove(user);
  }
}
