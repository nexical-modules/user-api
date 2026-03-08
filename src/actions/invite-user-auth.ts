// GENERATED CODE - THE SIGNATURE IS MANAGED BY THE GENERATOR. YOU MAY MODIFY THE IMPLEMENTATION AND ADD CUSTOM IMPORTS.
import type { ServiceResponse } from '@/types/service';
import type { APIContext } from 'astro';
import { db } from '@/lib/core/db';
import type { InviteUserDTO, Invitation } from '../sdk/types';
import { HookSystem } from '@/lib/modules/hooks';

export class InviteUserAuthAction {
  public static async run(
    input: InviteUserDTO,
    context: APIContext,
  ): Promise<ServiceResponse<Invitation>> {
    const email = String(input.email);
    const normalizedEmail = email.toLowerCase();
    const role = (input.role as string) || 'USER_EMPLOYEE';
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        update: { token, role: role as any, expires },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        create: { email, token, role: role as any, expires },
      })) as Invitation;

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
