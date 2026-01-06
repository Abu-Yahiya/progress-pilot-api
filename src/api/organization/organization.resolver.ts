import { ApiCommonActionOutput } from '@/src/shared/common/api-response';
import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import getGqlFields from '@/src/shared/utils/get-gql-fields';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Args, Info, Mutation, Query, Resolver } from '@nestjs/graphql';
import { RegistrationUserInput } from '../user/dto/registration-user.input';
import { AuthenticationService } from './../authentication/authentication.service';
import { UserService } from './../user/user.service';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { OrganizationListQueryInput } from './dto/organization-list.input';
import {
  InviteMemberToOrganizationInput,
  UpdateOrganizationInput,
  VerifyInviteMemberToOrganizationInput,
} from './dto/update-organization.input';
import {
  Organization,
  OrganizationWithPagination,
} from './entities/organization.entity';
import { OrganizationService } from './organization.service';

@Resolver(() => Organization)
export class OrganizationResolver {
  constructor(
    private readonly organizationService: OrganizationService,
    private readonly authService: AuthenticationService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Organization)
  createOrganization(
    @Args('payload')
    payload: CreateOrganizationInput,
  ) {
    return this.organizationService.create(payload);
  }

  @Query(() => OrganizationWithPagination, { name: 'organizations' })
  findAll(
    @Args('input', { nullable: true }) payload: OrganizationListQueryInput,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.organizationService.findAll(payload, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => OrganizationWithPagination, { name: 'myOrganizations' })
  myAllOrganizations(
    @Args('input', { nullable: true }) payload: OrganizationListQueryInput,
    @Args('_id', { type: () => String }) _id: string,
    @Info() info: any,
  ) {
    try {
      const fields = getGqlFields(info, 'nodes');
      return this.organizationService.findMyOrganizations(_id, payload, fields);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Query(() => Organization, { name: 'organization' })
  findOne(@Args('_id', { type: () => String }) _id: string) {
    return this.organizationService.findOne(_id);
  }

  @Query(() => Organization, { name: 'organizationByUID' })
  organizationByUID(@Args('orgUID', { type: () => String }) orgUID: string) {
    return this.organizationService.organizationByUID(orgUID);
  }

  @Mutation(() => Organization)
  updateOrganization(
    @Args('updatePayload')
    updatePayload: UpdateOrganizationInput,
    @Args('orgUID', { type: () => String }) orgUID: string,
  ) {
    try {
      return this.organizationService.update(
        updatePayload._id,
        orgUID,
        updatePayload,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => ApiCommonActionOutput)
  async sendInviteToMember(
    @Args('payload')
    payload: InviteMemberToOrganizationInput,
  ) {
    try {
      await this.organizationService.sendInvite(payload);
      return { isSuccess: true, message: 'Invite link has been sent.' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => ApiCommonActionOutput)
  async verifyMemberInvitation(
    @Args('payload')
    payload: VerifyInviteMemberToOrganizationInput,
  ) {
    try {
      // verify token
      const authUser = await this.authService.verifyToken(
        payload?.token,
        TokenTypes.ORGANIZATION_MEMBER_INVITATION_TOKEN,
      );

      // if valid token
      if (authUser) {
        // create new user or find existing user
        const user = await this.userService.createOrFindUser({
          email: authUser.email,
        } as RegistrationUserInput);

        // generate token
        const token = await this.authService.generateRefreshToken({
          email: user?.email,
          role: user?.role,
        });

        return {
          isSuccess: true,
          data: { token },
          message: 'Congrats, well done.',
        };
      }
      throw new UnauthorizedException('Access denied!');
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Boolean)
  async generateApiToken(
    @Args('_id', { type: () => String }) _id: string,
    @Args('orgUID', { type: () => String }) orgUID: string,
  ) {
    try {
      await this.organizationService.generateApiToken({ _id, orgUID });
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Boolean)
  async generateApiKey(
    @Args('_id', { type: () => String }) _id: string,
    @Args('orgUID', { type: () => String }) orgUID: string,
  ) {
    try {
      await this.organizationService.generateApiKey(_id, orgUID);
      return true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Boolean)
  async disableOrganization(
    @Args('_id', { type: () => String }) _id: string,
    @Args('orgUID', { type: () => String }) orgUID: string,
  ) {
    try {
      await this.organizationService.disable(_id, orgUID);
      true;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
