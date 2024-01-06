import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaClientExceptionFilter, PrismaModule } from 'nestjs-prisma';
import { APP_FILTER, APP_GUARD, HttpAdapterHost } from '@nestjs/core';
import { AtGuard } from './common/guards';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { SheltersModule } from './shelters/shelters.module';
import { RoleModule } from './role/role.module';
import { GendersModule } from './genders/genders.module';
import { BreedsModule } from './breeds/breeds.module';
import { DogConditionsModule } from './dog-conditions/dog-conditions.module';
import { DogStatusesModule } from './dog-statuses/dog-statuses.module';
import { IntakeTypesModule } from './intake-types/intake-types.module';
import { DogsModule } from './dogs/dogs.module';
import { KennelsModule } from './kennels/kennels.module';
import { CaretakersModule } from './caretakers/caretakers.module';
import { WalksModule } from './walks/walks.module';
import { FeedingsModule } from './feedings/feedings.module';
import { MedicateModule } from './medicate/medicate.module';
import { CleaningsModule } from './cleanings/cleanings.module';
import { MailingModule } from './mailing/mailing.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule.forRoot({ isGlobal: true }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    SheltersModule,
    RoleModule,
    GendersModule,
    BreedsModule,
    DogConditionsModule,
    DogStatusesModule,
    DogStatusesModule,
    IntakeTypesModule,
    DogsModule,
    KennelsModule,
    CaretakersModule,
    WalksModule,
    FeedingsModule,
    MedicateModule,
    CleaningsModule,
    MailingModule,
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
