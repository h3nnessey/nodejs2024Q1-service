import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private readonly users = new Map<string, User>();

  create(createUserDto: CreateUserDto) {
    const dateNow = Date.now();

    const user: User = {
      id: uuidV4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    };

    this.users.set(user.id, user);

    return plainToClass(User, user);
  }

  findAll() {
    return Array.from(this.users.values()).map((user) =>
      plainToClass(User, user),
    );
  }

  findOne(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return plainToClass(User, user);
  }

  update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    this.users.set(user.id, {
      ...user,
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    });

    return plainToClass(User, this.users.get(user.id));
  }

  remove(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users.delete(user.id);
  }
}
