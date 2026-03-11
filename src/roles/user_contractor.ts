// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import { roleRegistry } from '@/lib/registries/role-registry';
import { BaseRole } from './base-role';

/** */
export class UserContractorRole extends BaseRole {
  readonly name: string = 'USER_CONTRACTOR';
  readonly description: string = '';
  readonly inherits: string[] = [];
  readonly permissions: string[] = ['user:read_self'];
  protected readonly compatibleRoles: string[] = [];
}
roleRegistry.register(new UserContractorRole());
