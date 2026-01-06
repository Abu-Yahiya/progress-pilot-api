import { ArgumentsHost, BadRequestException, Catch } from '@nestjs/common';
import { GqlArgumentsHost, GqlExceptionFilter } from '@nestjs/graphql';

@Catch(BadRequestException)
export class GraphQLExceptionFilter implements GqlExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const gqlHost = GqlArgumentsHost.create(host);
    return {
      message: exception.message || 'An unexpected error occurred',
      code: 'BAD_REQUEST',
    };
  }
}
