import { Config } from 'tailwindcss';
import { expect, test } from 'vitest';
import { examplePlugin } from './example';
import { expectCss, run } from './helpers';

test('addBase', async () => {
  const config = {
    plugins: [examplePlugin],
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
  expect(result.css).toContain('*, ::before, ::after');
});

test('addUtilities', async () => {
  const config = {
    plugins: [examplePlugin],
    content: [
      {
        raw: String.raw`
          <div class="content-hidden"></div>
          <div class="content-visible"></div>
        `,
      },
    ],
  };

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .content-hidden {
          content-visibility: hidden
      }
      .content-visible {
          content-visibility: visible
      }
    `);
});

test('matchUtilities', async () => {
  const config = {
    plugins: [examplePlugin],
    content: [
      {
        raw: String.raw`<div class="tab-2"></div>`,
      },
    ],
  };

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .tab-2 {
          tab-size: 2
      }
    `);
});

test('addComponents', async () => {
  const config = {
    content: [
      {
        raw: String.raw`<div class="btn"></div>`,
      },
    ],
    plugins: [
      examplePlugin({
        className: 'btn',
      }),
    ],
  };

  const result = await run(config, '@tailwind components');
  expectCss(result.css).toMatchCss(String.raw`
      .btn {
          padding: .5rem 1rem;
          font-weight: 600
      }
    `);
});

test('addVariant', async () => {
  const config = {
    plugins: [examplePlugin],
    content: [
      {
        raw: String.raw`<div class="optional:hidden"></div>`,
      },
    ],
  };

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .optional\:hidden:optional {
          display: none
      }
    `);
});

test('addVariant (array)', async () => {
  const config = {
    plugins: [examplePlugin],
    content: [
      {
        raw: String.raw`<div class="hocus:opacity-0"></div>`,
      },
    ],
  };

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      .hocus\:opacity-0:hover {
          opacity: 0
      }
      .hocus\:opacity-0:focus {
          opacity: 0
      }
    `);
});

test('addVariant (media)', async () => {
  const config = {
    plugins: [examplePlugin],
    content: [
      {
        raw: String.raw`<div class="supports-grid:hidden"></div>`,
      },
    ],
  };

  const result = await run(config);
  expectCss(result.css).toMatchCss(String.raw`
      @supports (display: grid) {
          .supports-grid\:hidden {
              display: none
          }
      }
    `);
});
