// GENERATED CODE - DO NOT MODIFY
export abstract class BaseRole {
  abstract readonly name: string;

  public async check(context: unknown, permission: string): Promise<boolean> {
    const locals = (context as { locals?: Record<string, unknown> }).locals;
    const actor = locals?.actor || locals?.user;

    if (!actor) {
      throw new Error('Unauthorized: No actor found');
    }

    // Normalize role string to handle Prisma enum mapping of hyphens to underscores
    const normalizeRole = (r: unknown) => String(r).toUpperCase().replace(/-/g, '_');
    if (normalizeRole((actor as { role?: string }).role) !== normalizeRole(this.name)) {
      throw new Error(`Forbidden: required role ${this.name}`);
    }
    return true;
  }
}
