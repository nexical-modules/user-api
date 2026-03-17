import { z } from 'zod';
import { createConfig } from '@/lib/core/config';
import * as UserModuleTypes from './sdk';

const userSchema = z.object({
  PUBLIC_USER_MODE: z.nativeEnum(UserModuleTypes.UserMode).default(UserModuleTypes.UserMode.PUBLIC),
  ROOT_USER_EMAIL: z.string().email().optional(),
  ROOT_USER_PASSWORD: z.string().min(8).optional(),
  ROOT_USER_NAME: z.string().min(1).default('TEAM_ADMIN'),
});

const config = createConfig(userSchema);

export const userConfig = {
  userMode: config.PUBLIC_USER_MODE ?? UserModuleTypes.UserMode.PUBLIC,
  rootUser: {
    email: config.ROOT_USER_EMAIL,
    password: config.ROOT_USER_PASSWORD,
    name: config.ROOT_USER_NAME ?? 'TEAM_ADMIN',
  },
};

export const isSingleMode = () => userConfig.userMode === UserModuleTypes.UserMode.SINGLE;
export const isPublicMode = () => userConfig.userMode === UserModuleTypes.UserMode.PUBLIC;
export const isAdminMode = () => userConfig.userMode === UserModuleTypes.UserMode.ADMIN;
