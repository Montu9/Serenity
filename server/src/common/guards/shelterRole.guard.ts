import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleEntity } from 'src/role/dto/role.entity';

export const ShelterRoleGuard = (requiredRole: string) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    prisma: PrismaService;
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }

    async canActivate(context: ExecutionContext) {
      // Get shelterUuid
      const request = context.switchToHttp().getRequest();
      const params = request.params;
      const shelterUuid = params.shelterUuid;
      if (!shelterUuid) return false;

      // Get userUuid
      const userUuid = request.user.sub;
      if (!userUuid) return false;

      // Check if user is member of shelter
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
