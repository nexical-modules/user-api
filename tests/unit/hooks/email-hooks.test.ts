// GENERATED CODE - DO NOT MODIFY
import { HookSystem } from '@/lib/modules/hooks';
import { describe, expect, it, vi } from 'vitest';
import { init } from '../../../src/hooks/email-hooks';

vi.mock('@/lib/modules/hooks', () => ({
  HookSystem: {
    on: vi.fn(),
    filter: vi.fn(),
  },
}));

describe('email-hooks', () => {
  it('should initialize correctly', async () => {
    await init();
    expect(HookSystem.on.mock.calls.length + HookSystem.filter.mock.calls.length).toBeGreaterThan(
      0,
    );
  });
});
