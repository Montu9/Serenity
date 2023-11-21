import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserUuid } from 'src/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity })
  async findOnePrivate(@GetCurrentUserUuid() uuid: string) {
    return new UserEntity(await this.usersService.findOnePrivate(uuid));
  }

  @Patch()
  @ApiCreatedResponse({ type: UserEntity })
  async updatePrivate(
    @GetCurrentUserUuid() uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return new UserEntity(
      await this.usersService.updatePrivate(uuid, updateUserDto),
    );
  }

  @Delete()
  @ApiCreatedResponse({ type: UserEntity })
  async removePrivate(@GetCurrentUserUuid() uuid: string) {
    return new UserEntity(await this.usersService.removePrivate(uuid));
  }
}
