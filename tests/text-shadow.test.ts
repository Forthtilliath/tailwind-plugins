import { Config } from 'tailwindcss';
import { expect, test } from 'vitest';
import { expectCss, run } from './helpers';
import { textShadowPlugin } from '../src/text-shadow';

test('addBase', async () => {
  const config = {
    plugins: [textShadowPlugin()],
    content: [
      {
        raw: String.raw`🫣`,
      },
    ],
    corePlugins: {
      preflight: true,
    },
  } satisfies Config;

  const result = await run(config, '@tailwind base');
  expect(result.css).toContain('--tw-text-shadow-x: 0px;');
  expect(result.css).toContain('--tw-text-shadow-y: 0px;');
  expect(result.css).toContain('--tw-text-shadow-blur: 0px;');
  expect(result.css).toContain('--tw-text-shadow-color: #000;');
});

test('addBase with user options', async () => {
  const config = {
    plugins: [textShadowPlugin({
      defaultOffsetX: '1px',
      defaultOffsetY: '2px',
      defaultBlur: '3px',
      defaultColor: '#f00',
    })],
    content: [
      {
        raw: String.raw`🫣`,
      },
    ],
    corePlugins: {
      preflight: true,
    },
  } satisfies Config;

  const result = await run(config, '@tailwind base');
  expect(result.css).toContain('--tw-text-shadow-x: 1px;');
  expect(result.css).toContain('--tw-text-shadow-y: 2px;');
  expect(result.css).toContain('--tw-text-shadow-blur: 3px;');
  expect(result.css).toContain('--tw-text-shadow-color: #f00;');
});

test('addUtilities base & outline', async () => {
  const config = {
    plugins: [textShadowPlugin()],
    content: [
      {
        raw: String.raw`
          <div class="text-shadow-base"></div>
          <div class="text-shadow-outline"></div>
        `,
      },
    ],
  } satisfies Config;

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .text-shadow-base {
        text-shadow: var(--tw-text-shadow-x) var(--tw-text-shadow-y) var(--tw-text-shadow-blur) var(--tw-text-shadow-color);
      }
      .text-shadow-outline {
        text-shadow: -1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  0px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color), -1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  0px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color), -1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  0px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)
      }
    `);
});

test('matchUtilities x, y & blur', async () => {
  const config = {
    plugins: [textShadowPlugin()],
    content: [
      {
        raw: String.raw`
          <div class="text-shadow-x-2"></div>
          <div class="text-shadow-y-4"></div>
          <div class="text-shadow-blur-8"></div>
        `,
      },
    ],
  } satisfies Config;

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .text-shadow-blur-8 {
        --tw-text-shadow-blur: 2rem
      }
      .text-shadow-x-2 {
        --tw-text-shadow-x: 0.5rem
      }
      .text-shadow-y-4 {
        --tw-text-shadow-y: 1rem
      }
    `);
});

test('matchUtilities colors', async () => {
  const config = {
    plugins: [textShadowPlugin()],
    content: [
      {
        raw: String.raw`
          <div class="text-shadow-red-500"></div>
          <div class="text-shadow-white"></div>
        `,
      },
    ],
  } satisfies Config;

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .text-shadow-red-500 {
        --tw-text-shadow-color: #ef4444
      }
      .text-shadow-white {
        --tw-text-shadow-color: #fff
      }
    `);
});

test('matchUtilities new from tailwind config', async () => {
  const config = {
    plugins: [textShadowPlugin()],
    content: [
      {
        raw: String.raw`
          <div class="text-shadow-test"></div>
        `,
      },
    ],
    theme: {
      textShadow: {
        test: '5px 5px 3px red'
      },
    },
  } satisfies Config;

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .text-shadow-test {
        text-shadow: 5px 5px 3px red
      }
    `);
});
