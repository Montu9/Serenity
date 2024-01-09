import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleEntity } from 'src/role/dto/role.entity';

export const KennelRoleGuard = (requiredRole: string) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    prisma: PrismaService;
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }

    async canActivate(context: ExecutionContext) {
      // Get kennelUuid
      const request = context.switchToHttp().getRequest();
      const params = request.params;
      const kennelUuid = params.kennelUuid;
      if (!kennelUuid) return false;

      // Get shelter uuid where kennel is attached to
      const kennel = await this.prisma.kennel.findFirst({
        where: {
          uuid: kennelUuid,
        },
        select: {
          shelter: {
            select: {
              uuid: true,
            },
          },
        },
      });
      if (!kennel) return false;
      const shelterUuid = kennel?.shelter.uuid;

      // Get userUuid
      const userUuid = request.user.sub;
      if (!userUuid) return false;

      // Check if user
      const userRole = await this.prisma.usersShelters.findFirst({
        where: {
          User: {
            uuid: userUuid,
          },
          Shelter: {
            uuid: shelterUuid,
          },
        },
        select: {
          role: true,
        },
      });

      return checkRole(userRole?.role, requiredRole);
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};

function checkRole(userRole: RoleEntity | null, requiredRole: string): boolean {
  if (!userRole) return false;

  return (
    (requiredRole === 'ADMIN' && userRole.name === requiredRole) ||
    requiredRole === 'CARETAKER'
  );
}
