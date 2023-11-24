import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleEntity } from 'src/role/dto/role.entity';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RoleEntity[]> {
    const roles = await this.prisma.role.findMany();
    return roles.map((role) => new RoleEntity(role));
  }
}
