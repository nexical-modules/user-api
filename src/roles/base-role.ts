// INITIAL GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ApiActor } from '@/lib/api/api-docs';
import { roleRegistry } from '@/lib/registries/role-registry';
import type { APIContext } from 'astro';

export abstract class BaseRole {
  abstract readonly name: string;
  protected readonly compatibleRoles: string[] = [];

  /**
   * Overridable method for contextual role resolution (e.g. team member check).
   * Default implementation returns true.
   */
  public async isCompatible(
    context: APIContext,
    input: Record<string, unknown> = {},
    data?: unknown,
  ): Promise<boolean> {
    return true;
  }

  public async check(
    context: APIContext,
    input: Record<string, unknown> = {},
    data?: unknown,
  ): Promise<void> {
    const actor = context.locals.actor as ApiActor;
    if (!actor) {
      throw new Error('Unauthorized: No actor found');
    }

    const { role: actorRole } = actor as { role: string };
    const normalizeRole = (r: unknown) => String(r).toUpperCase().replace(/-/g, '_');

    const normalizedActorRole = normalizeRole(actorRole);

    // Global System Bypass (Super Roles)
    if (['USER_ADMIN'].map(normalizeRole).includes(normalizedActorRole)) {
      return;
    }

    const normalizedRequiredRole = normalizeRole(this.name);

    // Direct match + Contextual Check
    if (normalizedActorRole === normalizedRequiredRole) {
      if (!(await this.isCompatible(context, input, data))) {
        throw new Error(`Forbidden: Role ${this.name} context check failed`);
      }
      return;
    }

    // Direct compatibility bypass (manual whitelist)
    if (this.compatibleRoles.map(normalizeRole).includes(normalizedActorRole)) {
      if (!(await this.isCompatible(context, input, data))) {
        throw new Error(
          `Forbidden: Role ${this.name} context check failed via compatibility whitelist`,
        );
      }
      return;
    }

    // Inheritance Check
    const checkInheritance = async (roleName: string, targetRole: string): Promise<boolean> => {
      const policy = roleRegistry.get(roleName) as any;
      if (!policy || !('inherits' in policy)) return false;
      const inherits = policy.inherits as string[];
      if (inherits.map(normalizeRole).includes(targetRole)) return true;
      for (const parent of inherits) {
        if (await checkInheritance(parent, targetRole)) return true;
      }
      return false;
    };

    if (await checkInheritance(this.name, normalizedActorRole)) {
      if (await this.isCompatible(context, input, data)) {
        return;
      }
      throw new Error(`Forbidden: Role ${this.name} context check failed via inheritance`);
    }

    throw new Error(`Forbidden: required role ${this.name} (actor is ${actorRole})`);
  }
}

export abstract class BaseRole {
  abstract readonly name: string;
  protected readonly compatibleRoles: string[] = [];

  /**
   * Overridable method for contextual role resolution (e.g. team member check).
   * Default implementation returns true.
   */
  public async isCompatible(
    context: APIContext,
    input: Record<string, unknown> = {},
    data?: unknown,
  ): Promise<boolean> {
    return true;
  }

  public async check(
    context: APIContext,
    input: Record<string, unknown> = {},
    data?: unknown,
  ): Promise<void> {
    const actor = context.locals.actor as ApiActor;
    if (!actor) {
      throw new Error('Unauthorized: No actor found');
    }

    const { role: actorRole } = actor as { role: string };
    const normalizeRole = (r: unknown) => String(r).toUpperCase().replace(/-/g, '_');

    const normalizedActorRole = normalizeRole(actorRole);

    // Global System Bypass (Super Roles)
    if (['USER_ADMIN'].map(normalizeRole).includes(normalizedActorRole)) {
      return;
    }

    const normalizedRequiredRole = normalizeRole(this.name);

    // Direct match + Contextual Check
    if (normalizedActorRole === normalizedRequiredRole) {
      if (!(await this.isCompatible(context, input, data))) {
        throw new Error(`Forbidden: Role ${this.name} context check failed`);
      }
      return;
    }

    // Direct compatibility bypass (manual whitelist)
    if (this.compatibleRoles.map(normalizeRole).includes(normalizedActorRole)) {
      if (!(await this.isCompatible(context, input, data))) {
        throw new Error(
          `Forbidden: Role ${this.name} context check failed via compatibility whitelist`,
        );
      }
      return;
    }

    // Inheritance Check
    const checkInheritance = async (roleName: string, targetRole: string): Promise<boolean> => {
      const policy = roleRegistry.get(roleName) as any;
      if (!policy || !('inherits' in policy)) return false;
      const inherits = policy.inherits as string[];
      if (inherits.map(normalizeRole).includes(targetRole)) return true;
      for (const parent of inherits) {
        if (await checkInheritance(parent, targetRole)) return true;
      }
      return false;
    };

    if (await checkInheritance(this.name, normalizedActorRole)) {
      if (await this.isCompatible(context, input, data)) {
        return;
      }
      throw new Error(`Forbidden: Role ${this.name} context check failed via inheritance`);
    }

    throw new Error(`Forbidden: required role ${this.name} (actor is ${actorRole})`);
  }
}
