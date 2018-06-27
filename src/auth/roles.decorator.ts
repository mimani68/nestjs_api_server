
import { ReflectMetadata } from '@nestjs/common';

export const Roles = (...roles: Array<string>) => ReflectMetadata('roles', roles);