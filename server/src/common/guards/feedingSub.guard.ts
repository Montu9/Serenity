import {
  CanActivate,
  ExecutionContext,
  Injectable,
  mixin,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

export const FeedingSubGuard = () => {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    prisma: PrismaService;
    constructor(prisma: PrismaService) {
      this.prisma = prisma;
    }

    async canActivate(context: ExecutionContext) {
      // Get feeding id
      const request = context.switchToHttp().getRequest();
      const params = request.params;
      const actionId = parseInt(params.actionId);
      if (!actionId) return false;

      // Get userUuid
      const userUuid = request.user.sub;
      if (!userUuid) return false;

      const feeding = await this.prisma.feeding.findFirst({
        where: {
          id: actionId,
        },
        select: {
          user: {
            select: {
              uuid: true,
            },
          },
          dog: {
            select: {
              kennel: {
                select: {
                  shelter: {
                    select: {
                      users: {
                        where: {
                          User: {
                            uuid: userUuid,
                          },
                        },
                        select: {
                          role: true,
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      });

      if (feeding && feeding.user && feeding.user.uuid === userUuid)
        return true;

      if (
        feeding &&
        feeding.dog &&
        feeding.dog.kennel.shelter.users[0].role.name == 'ADMIN'
      )
        return true;
      else return false;
    }
  }

  const guard = mixin(RoleGuardMixin);
  return guard;
};
