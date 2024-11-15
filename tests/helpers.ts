import path from 'path';
import postcss from 'postcss';
import tailwindcss, { Config } from 'tailwindcss';
import { expect, type ExpectStatic } from 'vitest';

// Custom CSS matcher
expect.extend({
  // Compare two CSS strings with all whitespace removed
  // This is probably naive but it's fast and works well enough.
  toMatchCss(received, argument) {
    function stripped(string_: string) {
      return string_.replace(/\s/g, '').replace(';', '');
    }

    const pass = stripped(received) === stripped(argument);

    return {
      pass,
      actual: received,
      expected: argument,
      message: () => (pass ? 'All good!' : 'CSS does not match'),
    };
  },
});

type ExpectStaticWithCss = ExpectStatic & {
  toMatchCss(css: string): {
    pass: boolean;
    actual: any;
    expected: any;
    message: () => 'All good!' | 'CSS does not match';
  };
};

export function expectCss(css: string): ExpectStaticWithCss {
  return expect(css) as unknown as ExpectStaticWithCss;
}

export // Function to run the plugin
function run(
  config: Config,
  css = '@tailwind utilities',
  plugin = tailwindcss,
) {
  let { currentTestName } = expect.getState();

  config = {
    ...{
      corePlugins: {
        preflight: false,
      },
    },
    ...config,
  };

  return postcss(plugin(config)).process(css, {
    from: `${path.resolve(__filename)}?test=${currentTestName}`,
  });
}
