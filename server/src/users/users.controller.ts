import { Body, Controller, Delete, Get, Patch } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetCurrentUserUuid } from 'src/common/decorators';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './dto/user.entity';
import { UsersService } from './users.service';

@Controller('users')
@ApiTags('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ type: UserEntity })
  findOnePrivate(@GetCurrentUserUuid() uuid: string): Promise<UserEntity> {
    return this.usersService.findOnePrivate(uuid);
  }

  @Get('shelters')
  getUserShelters(@GetCurrentUserUuid() userUuid: string) {
    return this.usersService.getUserShelters(userUuid);
  }

  @Patch()
  @ApiOkResponse({ type: UserEntity })
  updateOnePrivate(
    @GetCurrentUserUuid() uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserEntity> {
    return this.usersService.updateOnePrivate(uuid, updateUserDto);
  }

  @Patch('password')
  @ApiOkResponse({ type: String })
  async updatePassword(
    @GetCurrentUserUuid() uuid: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.updatePassword(uuid, updatePasswordDto);
  }

  @Delete()
  @ApiCreatedResponse({ type: UserEntity })
  async removePrivate(@GetCurrentUserUuid() uuid: string): Promise<UserEntity> {
    return new UserEntity(await this.usersService.removePrivate(uuid));
  }
}
