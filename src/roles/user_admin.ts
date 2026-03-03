// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { BaseRole } from './base-role';

/** */
export class UserAdminRole extends BaseRole {
  readonly name: string = 'USER_ADMIN';
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = [
    'user:list',
    'user:create',
    'user:update',
    'user:delete',
    'user:invite',
    'auth:sudo',
  ];
}
