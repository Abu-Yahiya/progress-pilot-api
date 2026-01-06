import { TokenTypes } from '@/src/shared/common/enums/token-types.enum';
import { AppPaginationResponse } from '@/src/shared/contracts/app-pagination-response';
import { SortType } from '@/src/shared/dto/CommonPaginationDto';
import { filterBuilder } from '@/src/shared/utils/filterBuilder';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { FilterQuery, Model } from 'mongoose';
import { Organization } from '../organization/entities/organization.entity';
import { LoginInput } from './dto/login-input.dto';
import { RegistrationUserInput } from './dto/registration-user.input';
import {
  UpdateUserAndEmployeeRoleInput,
  UpdateUserInput,
} from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * signup user
   * @param input payload
   * @returns
   */

  async signup(input: RegistrationUserInput) {
    const { email } = input;
    const isUserExist = await this.userModel.findOne({ email });

    if (isUserExist) {
      throw new BadRequestException(
        'This Email Already Used try with another email!',
      );
    }

    input.password = bcrypt.hashSync(input.password, 10);

    const createdUser = await this.userModel.create({
      name: input.email?.split('@')[0],
      ...input,
    });

    if (createdUser?._id) {
      try {
        return createdUser;
      } catch (error) {
        await this.userModel.deleteOne({ _id: createdUser?._id });
        throw new ForbiddenException('Failed to create employee account');
      }
    }

    throw new ForbiddenException('Registration Failed');
  }

  async signIn(payload: LoginInput) {
    const { email, password } = payload;

    // check is user exist
    const user = await this.userModel.findOne({ email });

    // if user is not exist
    if (!user) {
      throw new UnauthorizedException('Email is not correct!');
    }

    // check is password matched
    const isMatchedPass = await bcrypt.compare(password, user.password);

    // if password is incorrect
    if (!isMatchedPass) {
      throw new UnauthorizedException('You entered wrong password!');
    }

    return user;
  }

  /**
   * generate refresh token
   * @param payload user
   * @returns string
   */
  async generateRefreshToken(payload): Promise<string> {
    return this.jwtService.sign(
      { ...payload, type: TokenTypes.REFRESH_TOKEN },
      {
        secret: process.env.JWT_SECRET || 'refreshSecret',
        expiresIn: process.env.JWT_REFRESH_EXPIRES, // refresh token valid for 7 days
      },
    );
  }

  /**
   * create Or return find user
   * @param input payload
   * @returns
   */

  async createOrFindUser(input: RegistrationUserInput) {
    const { email } = input;
    const user = await this.userModel.findOne({ email });
    if (user) {
      return user;
    }

    return this.userModel.create({
      name: input.email?.split('@')[0],
      ...input,
    });
  }

  /**
   * get all users
   * @returns
   */
  async findAll(input: UserListQueryDto, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = filterBuilder(input.where, input.whereOperator);

    const cursor = this.userModel.find(where);

    // populate organizations
    if (fields.includes('organizations')) {
      cursor.populate({
        path: 'organizations',
        model: Organization.name,
      });
    }

    const count = await this.userModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
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
   * get single user
   * @param _id single user id
   * @returns
   */
  async findOne(filter: FilterQuery<UserDocument>, fields: string[] = []) {
    try {
      const data = await this.userModel.findOne(filter);

      if (!data) {
        throw new ForbiddenException('User not found');
      }
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * get single user by email address
   * @param _id single user email
   * @returns
   */
  async findOneByEmail(email: string) {
    try {
      const data = await this.userModel.findOne({ email });
      return data;
    } catch (err) {
      throw new ForbiddenException(err.message);
    }
  }

  /**
   * update user
   * @param _id user id
   * @param input update payload
   * @returns
   */
  async update(_id: string, updateUserInput: UpdateUserInput) {
    return this.userModel.findOneAndUpdate({ _id }, updateUserInput);
  }

  /**
   * employee and user role update
   * @param payload UpdateUserAndEmployeeRoleInput
   * @returns
   */
  async roleUpdate(payload: UpdateUserAndEmployeeRoleInput) {
    return this.userModel.findOneAndUpdate(
      { _id: payload?.user_id },
      { role: payload?.role },
    );
  }

  /**
   * delete user
   * @param filter
   * @returns
   */
  remove(filter: FilterQuery<UserDocument>) {
    return this.userModel.deleteOne(filter);
  }
}
