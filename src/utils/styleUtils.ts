import type { CSSProperties } from '@linaria/core';

export const reset = {
  a: {
    color: 'inherit',
    textDecoration: 'none',
  } as React.CSSProperties,
} as Record<'a', CSSProperties>;

/** Fake css function for syntax highlighting */
export function css(...args: any) {
  return args as string;
}
