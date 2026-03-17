// GENERATED CODE - DO NOT MODIFY
import { describe, expect, it } from 'vitest';
import { Permission } from '../../src/permissions';

describe('Permission', () => {
  it('should be defined', () => {
    expect(Permission).toBeDefined();
  });

  it('should have a check method', () => {
    expect(typeof Permission.check).toBe('function');
  });

  it('should call Permission.check and not throw', () => {
    // Smoke test for the permission check mapping
    expect(() =>
      Permission.check(
        'user:list' as unknown as Parameters<typeof Permission.check>[0],
        'USER_ADMIN',
      ),
    ).not.toThrow();
  });
});
