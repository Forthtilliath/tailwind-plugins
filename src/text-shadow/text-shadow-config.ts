import { fromTheme, type Config } from 'tailwind-merge';
import {
  isArbitraryLength,
  isTshirtSize,
} from 'tailwind-merge/src/lib/validators';
// import { isArbitraryLength, isTshirtSize } from '../helpers/validators';

const colors = fromTheme('colors');
const spacing = fromTheme('spacing');

export type TextShadowConfig =
  | 'text-shadow'
  | 'text-shadow-x-spacing'
  | 'text-shadow-y-spacing'
  | 'text-shadow-blur-spacing'
  | 'text-shadow-color'
  | 'text-shadow-spacing';

export const textShadowTwMergeConfig = {
  classGroups: {
    'text-shadow': [{ 'text-shadow': ['base', 'outline'] }],
    'text-shadow-color': [{ 'text-shadow': [colors] }],
    'text-shadow-spacing': [
      { 'text-shadow': [spacing, isTshirtSize, isArbitraryLength] },
    ],
    'text-shadow-x-spacing': [
      { 'text-shadow-x': [spacing, isTshirtSize, isArbitraryLength] },
    ],
    'text-shadow-y-spacing': [
      { 'text-shadow-y': [spacing, isTshirtSize, isArbitraryLength] },
    ],
    'text-shadow-blur-spacing': [
      { 'text-shadow-blur': [spacing, isTshirtSize, isArbitraryLength] },
    ],
  },
} satisfies Partial<Config<TextShadowConfig, never>>;
