import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { MailService } from '@/src/shared/mail-service/mail.service';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/entities/user.entity';
import { CreateOrganizationInput } from './dto/create-organization.input';
import { OrganizationListQueryInput } from './dto/organization-list.input';
import { UpdateOrganizationInput } from './dto/update-organization.input';
import { ORG_STATUS, Organization } from './entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private readonly organizationModel: Model<Organization>,
    private jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}

  /**
   * Create a new organization
   * @param payload CreateOrganizationInput
   * @returns
   */
  async create(payload: CreateOrganizationInput) {
    // check if organization with same business email already exist
    const isExistOrg = await this.organizationModel.findOne({
      businessEmail: payload?.businessEmail,
    });

    // throw err
    if (isExistOrg) {
      throw new ForbiddenException(
        'Organization with this email already exist',
      );
    }

    // generate unique orgUID for organization
    const orgUID = await this.generateOrgUID(payload?.name);

    // return organization with
    return this.organizationModel.create({
      ...payload,
      orgUID,
    });
  }

  /**
   * find all organizations
   * @param payload - OrganizationListQueryInput
   * @param fields - string[]
   * @returns [Organization]
   */
  async findAll(payload: OrganizationListQueryInput, fields: string[] = []) {
    const { page = 1, limit = 10 } = payload;
    const filter = filterBuilder(payload.where, payload.whereOperator);
    const cursor = this.organizationModel.find(filter);

    const count = await this.organizationModel.countDocuments(filter);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [payload?.sortBy]: payload?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    return new AppPaginationResponse(data, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * find my organizations
   * @param payload - OrganizationListQueryInput
   * @param fields - string[]
   * @returns [Organization]
   */
  async findMyOrganizations(
    _id: string,
    payload: OrganizationListQueryInput,
    fields: string[] = [],
  ) {
    const { page = 1, limit = 10 } = payload;
    const filter = filterBuilder(payload.where, payload.whereOperator);
    const cursor = this.organizationModel.find(filter);

    const count = await this.organizationModel.countDocuments(filter);
    // const skip = (page - 1) * limit;
    const organizations = await cursor;

    // console.log(myOrganizations);
    // const data = await cursor
    //   .sort({ [payload?.sortBy]: payload?.sort == SortType.DESC ? -1 : 1 })
    //   .skip(skip)
    //   .limit(limit);

    return new AppPaginationResponse(organizations, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * find by _id
   * @param _id string
   * @returns
   */
  findOne(_id: string) {
    return this.organizationModel.findOne({ _id });
  }

  /**
   * find by orgUID
   * @param orgUID string
   * @returns
   */
  organizationByUID(orgUID: string) {
    return this.organizationModel.findOne({ orgUID });
  }

  /**
   * update organization
   * @param id string
   * @param orgUID string
   * @param updateOrganizationInput
   * @returns
   */
  update(
    id: string,
    orgUID: string,
    updateOrganizationInput: UpdateOrganizationInput,
  ) {
    return this.organizationModel.updateOne(
      {
        _id: id,
        orgUID,
      },
      updateOrganizationInput,
    );
  }

  /**
   * update organization employees
   * @param orgUID string
   * @param payload
   * @returns
   */
  updateOrganizationEmployees(_id: string, employeeId: string) {
    return this.organizationModel.updateOne(
      {
        _id,
      },
      { $addToSet: { employees: employeeId } }, // $push to add new data to the employees array
      { new: false },
    );
  }

  /**
   * generate api key
   * @param _id - string
   * @param orgUID - string
   */
  async generateApiKey(_id: string, orgUID: string) {
    const apiKey = '_' + orgUID + '_' + _id + '_' + Date.now();
    return this.organizationModel.updateOne(
      { _id, orgUID },
      {
        $set: {
          'settings.apiKey': apiKey,
        },
      },
    );
  }

  /**
   * generate api token
   * @param payload: {_id: string, orgUID: string}
   */

  async generateApiToken(payload) {
    const token = await this.jwtService.sign(
      { ...payload, type: TokenTypes.API_TOKEN },
      {
        secret: process.env.JWT_SECRET || 'api_token_secret',
        expiresIn: process.env.JWT_API_TOKEN_EXPIRES, // api token valid for 100 years
      },
    );

    return this.organizationModel.updateOne(
      { _id: payload?._id, orgUID: payload?.orgUID },
      {
        $set: {
          'settings.apiToken': token,
        },
      },
    );
  }

  /**
   * disable an organization
   * @param _id string
   * @param orgUID string
   * @returns
   */
  disable(_id: string, orgUID: string) {
    return this.organizationModel.updateOne(
      { _id, orgUID },
      {
        status: ORG_STATUS.Disable,
      },
    );
  }

  /**
   * generate uid for organization
   * @param orgName organization name
   * @returns orgUid - string
   */
  async generateOrgUID(orgName: String) {
    try {
      const date = new Date();
      const randomId = date.getTime().toString().slice(10, 13);

      const numberOfOrgs = await this.organizationModel?.countDocuments();
      const slug = orgName.toLowerCase().replace(/\s+/g, '-');

      return `@${slug}-${date?.getFullYear()}-${randomId}-${numberOfOrgs + 1}`;
    } catch (error) {
      throw new BadRequestException('Failed to generate organization UID');
    }
  }

  /**
   * generate invite token and send it to the email address
   * @param payload
   * @returns string
   */
  async sendInvite(payload) {
    // find organization with the orgId
    const organization = await this.organizationModel.findById(payload?.orgId);
    if (!organization) {
      throw new BadRequestException('Organization not found');
    }

    const inviteToken = await this.jwtService.sign(
      { ...payload, type: TokenTypes.ORGANIZATION_MEMBER_INVITATION_TOKEN },
      {
        secret: process.env.JWT_SECRET || 'inviteTokenSecret',
        expiresIn: '1d', // invite token valid for 1 days
      },
    );

    const url = `${process.env.APP_URL}/auth/verify-invitation?orgId=${payload?.orgId}?token=${inviteToken}`;

    return this.mailService.sendMail(payload?.email, `${url}`);
  }
}
