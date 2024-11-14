import type { PluginCreator } from 'tailwindcss/types/config';

export function revealInvertPlugin(): PluginCreator {
  return function ({ addUtilities }) {
    addUtilities({
      '.reveal-invert::-ms-reveal': {
        filter: 'invert(100%)',
      },
    });
  };
}
