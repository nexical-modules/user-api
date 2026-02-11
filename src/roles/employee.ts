// GENERATED CODE - DO NOT MODIFY
import { BaseRole } from './base-role';

/** */
export class EmployeeRole extends BaseRole {
  readonly name: string = 'EMPLOYEE';
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = ['user:read_self', 'user:update_self'];
}
