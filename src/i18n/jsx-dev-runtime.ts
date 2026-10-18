import { jsxDEV as reactJsxDEV, Fragment as ReactFragment } from 'react/jsx-dev-runtime';
import { LocalizedDOM, LocalizedFragment } from './LocalizedDOM';
export { Fragment } from 'react/jsx-dev-runtime';
export type { JSX } from 'react/jsx-dev-runtime';

export const jsxDEV: typeof reactJsxDEV = (type, props, key, isStatic, source, self) => typeof type === 'string'
  ? reactJsxDEV(LocalizedDOM, { tag: type, originalProps: props || {}, children: (props as { children?: unknown })?.children }, key, isStatic, source, self)
  : reactJsxDEV(type === ReactFragment ? LocalizedFragment : type, props, key, isStatic, source, self);
