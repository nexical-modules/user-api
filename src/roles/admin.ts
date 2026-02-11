// GENERATED CODE - DO NOT MODIFY
import { BaseRole } from './base-role';

/** */
export class AdminRole extends BaseRole {
  readonly name: string = 'ADMIN';
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
