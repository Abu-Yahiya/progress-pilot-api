import { InputType } from '@nestjs/graphql';
import { CommonPaginationDto } from '../../../shared/dto/CommonPaginationDto';

@InputType()
export class TaskListQueryDto extends CommonPaginationDto {}
