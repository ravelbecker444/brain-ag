import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Producer } from '../entities/producer.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): Producer => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
