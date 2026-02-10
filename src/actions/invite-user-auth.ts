// GENERATED CODE - DO NOT MODIFY
import type { ServiceResponse } from '@/types/service';
import { UserModuleTypes } from '@/lib/api';
import { HookSystem } from '@/lib/modules/hooks';
import type { APIContext } from 'astro';
import { db } from '@/lib/core/db';

export class InviteUserAuthAction {
  public static async run(
    input: UserModuleTypes.InviteUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<UserModuleTypes.Invitation>> {
    const email = String(input.email);
    const role = (input.role as UserModuleTypes.SiteRole) || UserModuleTypes.SiteRole.EMPLOYEE;

    const normalizedEmail = email.toLowerCase();
    const existingUser = await db.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      return { success: false, error: 'user.service.error.user_exists' };
    }

    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    try {
      const invitation = (await db.invitation.upsert({
        where: { email },
        update: { token, role, expires },
        create: { email, token, role, expires },
      })) as unknown as UserModuleTypes.Invitation;

      // Dispatch event to trigger email
      await HookSystem.dispatch('invitation.created', {
        id: invitation.id,
        email: invitation.email,
        token: invitation.token,
        role: invitation.role,
      });

      return { success: true, data: invitation };
    } catch (error: unknown) {
      console.error('Invite Error:', error);
      return { success: false, error: 'user.service.error.invite_failed' };
    }
  }
}
