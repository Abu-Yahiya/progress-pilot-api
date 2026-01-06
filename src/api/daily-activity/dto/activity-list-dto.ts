import { CommonPaginationDto } from '@/src/shared/dto/CommonPaginationDto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class ActivityListQueryDto extends CommonPaginationDto {}
