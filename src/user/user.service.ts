import { ForbiddenException, Injectable } from '@nestjs/common';
import { DatabaseService } from '@/database/database.service';
import { plainToClass } from 'class-transformer';
import { v4 as uuidV4 } from 'uuid';
import { User } from './entities';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@Injectable()
export class UserService {
  constructor(private readonly db: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const dateNow = Date.now();

    const user = await this.db.users.create({
      id: uuidV4(),
      login: createUserDto.login,
      password: createUserDto.password,
      version: 1,
      createdAt: dateNow,
      updatedAt: dateNow,
    });

    return plainToClass(User, user);
  }

  async findMany() {
    const users = await this.db.users.findMany();

    return users.map((user) => plainToClass(User, user));
  }

  async findOne(id: string) {
    const user = await this.db.users.findOne(id);

    return plainToClass(User, user);
  }

  async update(id: string, { newPassword, oldPassword }: UpdatePasswordDto) {
    const user = await this.db.users.findOne(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Wrong old password');
    }

    const updatedUser = await this.db.users.update(id, {
      password: newPassword,
      updatedAt: Date.now(),
      version: user.version + 1,
    });

    return plainToClass(User, updatedUser);
  }

  async delete(id: string) {
    await this.db.users.delete(id);
  }
}
