import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

import type { PluginCreator } from 'tailwindcss/types/config';

type OptionsProps = Partial<{
  offsets: number[];
  defaultOffsetX: string;
  defaultOffsetY: string;
  defaultBlur: string;
  defaultColor: string;
}>;

export function textShadowPlugin(options: OptionsProps = {}): PluginCreator {
  return function ({ matchUtilities, addBase, theme, addUtilities }) {
    // merge user options to default options
    const opt = Object.assign(
      {
        defaultOffsetX: '0px',
        defaultOffsetY: '0px',
        defaultBlur: '0px',
        defaultColor: '#000',
      },
      options,
    );

    // add default css variables
    addBase({
      '@defaults text-shadow': {
        '--tw-text-shadow-x': `${opt.defaultOffsetX}`,
        '--tw-text-shadow-y': `${opt.defaultOffsetY}`,
        '--tw-text-shadow-blur': `${opt.defaultBlur}`,
        '--tw-text-shadow-color': `${opt.defaultColor}`,
      },
    });

    // add new static utilities to tailwind to add shadow outline
    addUtilities({
      '.text-shadow-base': {
        textShadow: `var(--tw-text-shadow-x) var(--tw-text-shadow-y) var(--tw-text-shadow-blur) var(--tw-text-shadow-color)`,
      },
      '.text-shadow-outline': {
        textShadow: [
          '-1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 0px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          '-1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 0px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          '-1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 0px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
          ' 1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)',
        ].join(', '),
      },
    });

    // add new dynamic utilities to tailwind to manipulate shadow steps
    matchUtilities(
      {
        'text-shadow-x': (value: string) => ({
          '--tw-text-shadow-x': value,
        }),
        'text-shadow-y': (value: string) => ({
          '--tw-text-shadow-y': value,
        }),
        // 'text-shadow': (value: string) => ({
        // 	'--tw-text-shadow-x': value,
        // 	'--tw-text-shadow-y': value
        // }),
        'text-shadow-blur': (value: string) => ({
          '--tw-text-shadow-blur': value,
        }),
      },
      {
        values: theme('spacing'),
        type: 'length',
        supportsNegativeValues: true,
      },
    );

    // add new dynamic utilities to tailwind to manipulate shadow color
    matchUtilities(
      {
        'text-shadow': (value: string) => ({
          '--tw-text-shadow-color': value,
        }),
      },
      {
        values: flattenColorPalette(theme('colors')),
        // type: 'color'
      },
    );

    // add new dynamic utilities to tailwind from user config
    matchUtilities(
      {
        'text-shadow': (value: string) => ({ textShadow: value }),
      },
      { values: theme('textShadow') },
    );
  };
}
