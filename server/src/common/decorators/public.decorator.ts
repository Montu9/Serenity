import { SetMetadata } from '@nestjs/common/decorators';

export const Public = () => SetMetadata('isPublic', true);
