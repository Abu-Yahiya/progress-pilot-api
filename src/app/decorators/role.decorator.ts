import { USER_ROLE } from '@/src/api/user/entities/user.entity';
import { SetMetadata } from '@nestjs/common';

export const ROLE_KEY = 'role';
export const Roles = (...role: USER_ROLE[]) => {
  return SetMetadata(ROLE_KEY, role);
};
