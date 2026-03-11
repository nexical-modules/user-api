// GENERATED CODE - DO NOT MODIFY
import { ApiClient } from '@nexical/sdk-core';
import { AuthSDK as BaseAuthSDK } from './auth-sdk.js';
import { UserSDK as BaseUserSDK } from './user-sdk.js';
export * from './auth-sdk.js';
export * from './types.js';
export * from './user-sdk.js';

/** Main SDK for the user-api module. */
export class UserModule extends BaseUserSDK {
  public auth: BaseAuthSDK;
  public static readonly roles: Record<string, string> = {
    USER_ADMIN: 'USER_ADMIN',
    USER_EMPLOYEE: 'USER_EMPLOYEE',
    USER_CONTRACTOR: 'USER_CONTRACTOR',
  };

  constructor(client: ApiClient) {
    super(client);
    this.auth = new BaseAuthSDK(client);
  }
}
