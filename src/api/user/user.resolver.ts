import { GqlAuthGuard } from '@/src/app/config/jwtGqlGuard';
import { Roles } from '@/src/app/decorators/role.decorator';
import { RolesGuard } from '@/src/app/guards/role.guard';
import { ApiCommonActionOutput } from '@/src/shared/common/api-response';
import { CommonMatchInput } from '@/src/shared/dto/CommonFindOneDto';
import { mongodbFindObjectBuilder } from '@/src/shared/utils/filterBuilder';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import {
  BadRequestException,
  ForbiddenException,
  UseGuards,
} from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { LoginInput } from './dto/login-input.dto';
import { RegistrationUserInput } from './dto/registration-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, USER_ROLE, UserPagination } from './entities/user.entity';
import { UserService } from './user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly usersService: UserService) {}

  @Mutation(() => ApiCommonActionOutput)
  async registration(@Args('input') input: RegistrationUserInput) {
    try {
      const user = await this.usersService.signup(input);
      return {
        isSuccess: true,
        message: 'Registration successful.',
        data: user,
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => ApiCommonActionOutput)
  async login(@Args('payload') payload: LoginInput) {
    const authUser = await this.usersService.signIn(payload);
    if (authUser) {
      const token = await this.usersService.generateRefreshToken({
        email: authUser?.email,
        role: authUser.role,
      });

      return {
        isSuccess: true,
        data: { token },
        message: 'Your login successful.',
      };
    }
    throw new ForbiddenException('Access denied!');
  }

  @Query(() => UserPagination, { name: 'users' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  findAll(
    @Args('input', { nullable: true }) input: UserListQueryDto,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.usersService.findAll(input, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      return this.usersService.findOne(find);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  async updateUser(@Args('input') input: UpdateUserInput) {
    try {
      await this.usersService.update(input._id, input);
      return this.usersService.findOne({ _id: input._id });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(USER_ROLE.ADMIN)
  async removeUser(@Args('input') input: CommonMatchInput) {
    try {
      const find = mongodbFindObjectBuilder(input);
      const res = await this.usersService.remove(find);
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
