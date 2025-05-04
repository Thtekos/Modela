import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import type { FieldValues, ResolverResult, FieldError } from 'react-hook-form';

const Schema = z.object({
  random: z.number()
    .min(0, 'Cannot be lower than 0')
    .max(255, 'Cannot be greater than 255')
});

type SchemaType = z.infer<typeof Schema>;

const validData = {
  random: 123
};

const invalidData = {
  random: 999
};

const fields = {
  random: {
    ref: { name: 'random' },
    name: 'random'
  }
};

const defaultOptions = {
  fields,
  shouldUseNativeValidation: false
};

describe('zodResolver', () => {
  it('should return values when validation passes', async () => {
    const result = await zodResolver(Schema)(validData, undefined, defaultOptions) as ResolverResult<SchemaType>;

    expect(result).toEqual({
      errors: {},
      values: validData
    });
  });

  it('should return error when validation fails', async () => {
    const result = await zodResolver(Schema)(invalidData, undefined, defaultOptions) as ResolverResult<SchemaType>;
    const errors = result.errors as Record<string, FieldError>;

    expect(Object.keys(errors).length).toBeGreaterThan(0);
    expect(errors.random?.message).toBe('Cannot be greater than 255');
  });

  it('should handle multiple validation rules', async () => {
    const SchemaWithMultipleRules = z.object({
      random: z.number()
        .min(0, 'Cannot be lower than 0')
        .max(255, 'Cannot be greater than 255')
        .int('Must be an integer')
    });

    type MultipleRulesType = z.infer<typeof SchemaWithMultipleRules>;

    const result = await zodResolver(SchemaWithMultipleRules)(
      { random: -1 },
      undefined,
      {
        ...defaultOptions,
        criteriaMode: 'all'
      }
    ) as ResolverResult<MultipleRulesType>;
    const errors = result.errors as Record<string, FieldError>;

    expect(Object.keys(errors).length).toBeGreaterThan(0);
    expect(errors.random?.message).toBe('Cannot be lower than 0');
  });

  it('should handle optional fields', async () => {
    const OptionalSchema = z.object({
      random: z.number()
        .min(0, 'Cannot be lower than 0')
        .max(255, 'Cannot be greater than 255')
        .optional()
    });

    type OptionalSchemaType = z.infer<typeof OptionalSchema>;

    const result = await zodResolver(OptionalSchema)(
      {},
      undefined,
      defaultOptions
    ) as ResolverResult<OptionalSchemaType>;

    expect(result).toEqual({
      errors: {},
      values: {}
    });
  });

  it('should handle nested objects', async () => {
    const NestedSchema = z.object({
      data: z.object({
        random: z.number()
          .min(0, 'Cannot be lower than 0')
          .max(255, 'Cannot be greater than 255')
      })
    });

    type NestedSchemaType = z.infer<typeof NestedSchema>;

    const nestedOptions = {
      shouldUseNativeValidation: false,
      fields: {
        'data.random': {
          ref: { name: 'data.random' },
          name: 'data.random'
        }
      }
    };

    const result = await zodResolver(NestedSchema)(
      { data: { random: 999 } },
      undefined,
      nestedOptions
    ) as ResolverResult<NestedSchemaType>;
    const errors = result.errors as { data?: { random?: FieldError } };

    expect(Object.keys(errors).length).toBeGreaterThan(0);
    expect(errors.data?.random?.message).toBe('Cannot be greater than 255');
  });

  it('should handle type coercion', async () => {
    const CoercionSchema = z.object({
      random: z.coerce.number()
        .min(0, 'Cannot be lower than 0')
        .max(255, 'Cannot be greater than 255')
    });

    type CoercionSchemaType = z.infer<typeof CoercionSchema>;

    const result = await zodResolver(CoercionSchema)(
      { random: '123' },
      undefined,
      defaultOptions
    ) as ResolverResult<CoercionSchemaType>;

    expect(result).toEqual({
      errors: {},
      values: { random: 123 }
    });
  });
}); 