import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ApiResponse, ApiTags, ApiOperation } from '@nestjs/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { UserService } from './user.service';
import { User, UpdatedUser } from './entities';
import { CreateUserDto, UpdatePasswordDto } from './dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Gets all users',
  })
  @ApiResponse({
    type: [User],
    description: 'Users list',
    status: HttpStatus.OK,
  })
  @Get()
  async findMany() {
    return await this.userService.findMany();
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Gets user by id',
  })
  @ApiResponse({
    type: User,
    description: 'User data',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create new user',
    description: 'Creates a new user',
  })
  @ApiResponse({
    type: User,
    description: 'Created user',
    status: HttpStatus.CREATED,
  })
  @ApiResponse({
    description: 'body does not contain required fields',
    status: HttpStatus.BAD_REQUEST,
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Update user password by id',
    description: 'Updates user password by id',
  })
  @ApiResponse({
    type: UpdatedUser,
    description: 'Updated user password',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @ApiResponse({
    description: 'Invalid oldPassword',
    status: HttpStatus.FORBIDDEN,
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return await this.userService.update(id, updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Deletes user by id',
  })
  @ApiResponse({
    description: 'Deleted user',
    status: HttpStatus.NO_CONTENT,
  })
  @ApiResponse({
    description: 'id is invalid (not UUID)',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiResponse({
    description: 'User not found',
    status: HttpStatus.NOT_FOUND,
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return await this.userService.delete(id);
  }
}
