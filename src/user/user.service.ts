import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User } from './entities/user.entity';
import { v4 as uuidV4 } from 'uuid';
import { plainToClass } from 'class-transformer';

@Injectable()
export class UserService {
  private readonly users = new Map<string, User>();

  create(createUserDto: CreateUserDto) {
    const dateNow = Date.now();

    const user = {
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

    return user;
  }

  update(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    user.password = updatePasswordDto.newPassword;
    user.updatedAt = Date.now();
    user.version += 1;

    return plainToClass(User, user);
  }

  remove(id: string) {
    const user = this.users.get(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    this.users.delete(id);
  }
}
