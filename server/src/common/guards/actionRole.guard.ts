import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { RoleEntity } from 'src/role/dto/role.entity';

export const ActionRoleGuard = (requiredRole: string) => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    prisma: PrismaService;
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }

    async canActivate(context: ExecutionContext) {
      // Get caretakerUuid and dogUuid
      const request = context.switchToHttp().getRequest();
      const body = request.body;
      const dogUuid = body?.dogUuid;
      const caretakerUuid = body?.caretakerUuid;
      console.log(dogUuid, caretakerUuid);
      if (!dogUuid || !caretakerUuid) return false;

      // Get shelter uuid where dog is
      const shelter = await this.prisma.dog.findFirst({
        where: {
          uuid: dogUuid,
        },
        select: {
          kennel: {
            select: {
              shelter: {
                select: {
                  uuid: true,
                },
              },
            },
          },
        },
      });
      const shelterUuid = shelter.kennel.shelter.uuid;

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
