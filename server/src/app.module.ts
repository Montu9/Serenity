import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { APP_FILTER, APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(httpAdapter);
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
