import { jsx as reactJsx, jsxs as reactJsxs, Fragment as ReactFragment } from 'react/jsx-runtime';
import { LocalizedDOM, LocalizedFragment } from './LocalizedDOM';
export { Fragment } from 'react/jsx-runtime';
export type { JSX } from 'react/jsx-runtime';

export const jsx: typeof reactJsx = (type, props, key) => typeof type === 'string'
  ? reactJsx(LocalizedDOM, { tag: type, originalProps: props || {}, children: (props as { children?: unknown })?.children }, key)
  : reactJsx(type === ReactFragment ? LocalizedFragment : type, props, key);
export const jsxs: typeof reactJsxs = (type, props, key) => typeof type === 'string'
  ? reactJsxs(LocalizedDOM, { tag: type, originalProps: props || {}, children: (props as { children?: unknown })?.children }, key)
  : reactJsxs(type === ReactFragment ? LocalizedFragment : type, props, key);
