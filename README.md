# Package Tailwind Plugins

> Set of plugins for tailwind, such as text-shadow, scrollbar, etc

Install the plugin from npm:

```
$ npm install package-tailwind-plugins
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
module.exports = {
  theme: {
    // ...
    // Optional. Your plugin might not have any options at all.
    packageS: {
      // ...
      YOUR_PLUGIN_CUSTOM_OPTION: true,
      // ...
    },
  },
  variants: {
    // ...
    // Optional. Your plugin might not have any variants at all.
    packageS: ['responsive'],
    // ...
  },
  plugins: [
    // ...
    require('package-tailwind-plugins'),
    // ...
  ],
};
```

This plugin will generate following CSS:

```css
/* ... */
.example-utility-class {
  display: block;
}

.custom-utility-class {
  background-color: red;
}
/* ... */
```

## License

Package Tailwind Plugins is licensed under the MIT License.

## Credits

Created with [create-tailwind-plugin](https://github.com/Landish/create-tailwind-plugin).
