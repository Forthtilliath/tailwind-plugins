# Tailwind Plugins

> Set of plugins for tailwind, such as text-shadow, scrollbar, etc

Install the plugin from npm:

```
$ npm install tailwind-plugins
```

Then add the plugin to your `tailwind.config.js` file:

```js
// tailwind.config.js
import { textShadowPlugin } from '@forthtilliath/tailwind-plugins';

module.exports = {
  // ...
  plugins: [textShadowPlugin()]
};
```

This plugin will generate following CSS:

```css
/* ... */
*, ::before, ::after {
  --tw-text-shadow-x: 0px;
  --tw-text-shadow-y: 0px;
  --tw-text-shadow-blur: 0px;
  --tw-text-shadow-color: #000;
}
.text-shadow-base {
  text-shadow: var(--tw-text-shadow-x) var(--tw-text-shadow-y) var(--tw-text-shadow-blur) var(--tw-text-shadow-color);
}
.text-shadow-outline {
  text-shadow: 
    -1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     0px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     1px -1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color), 
    -1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     0px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     1px  0px var(--tw-text-shadow-blur) var(--tw-text-shadow-color), 
    -1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     0px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color),  
     1px  1px var(--tw-text-shadow-blur) var(--tw-text-shadow-color)
}
.text-shadow-x-[spacing] {
  --tw-text-shadow-x: [spacing];
}
.text-shadow-y-[spacing] {
  --tw-text-shadow-y: [spacing];
}
.text-shadow-blur-[spacing] {
  --tw-text-shadow-blur: [spacing];
}
.text-shadow-[color] {
  --tw-text-shadow-color: [color];
}
/* ... */
```

## License

Tailwind Plugins is licensed under the MIT License.
