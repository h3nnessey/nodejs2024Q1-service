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
import {
  ApiTags,
  ApiOperation,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
} from '@nestjs/swagger';
import {
  ApiInvalidBodyResponse,
  ApiInvalidUuidResponse,
  ApiUuidParam,
} from '@/common/swagger';
import { ParseUUIDv4Pipe } from '@/common/pipes';
import { UserService } from './user.service';
import { CreateUserDto, UpdatePasswordDto, UpdatedUserDto } from './dto';
import { User } from './entities';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({
    summary: 'Get all users',
    description: 'Gets all users',
  })
  @ApiOkResponse({
    type: [User],
    description: 'Users list',
  })
  @Get()
  async findMany() {
    return this.userService.findMany();
  }

  @ApiOperation({
    summary: 'Create new user',
    description: 'Creates a new user',
  })
  @ApiCreatedResponse({
    type: User,
    description: 'User created',
  })
  @ApiInvalidBodyResponse()
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({
    summary: 'Get user by id',
    description: 'Gets user by id',
  })
  @ApiUuidParam()
  @ApiOkResponse({
    type: User,
    description: 'User data',
  })
  @ApiInvalidUuidResponse()
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.userService.findOne(id);
  }

  @ApiOperation({
    summary: 'Update user password by id',
    description: 'Updates user password by id',
  })
  @ApiUuidParam()
  @ApiOkResponse({
    type: UpdatedUserDto,
    description: 'Updated user password',
  })
  @ApiInvalidUuidResponse()
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @ApiForbiddenResponse({
    description: 'Invalid oldPassword',
  })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDv4Pipe) id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.userService.update(id, updatePasswordDto);
  }

  @ApiOperation({
    summary: 'Delete user by id',
    description: 'Deletes user by id',
  })
  @ApiUuidParam()
  @ApiNoContentResponse({
    description: 'User deleted',
  })
  @ApiInvalidUuidResponse()
  @ApiNotFoundResponse({
    description: 'User not found',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', ParseUUIDv4Pipe) id: string) {
    return this.userService.delete(id);
  }
}
