import React from 'react';
import { Calendar } from 'react-feather';
import cx from 'classnames';

import css from './icon.module.css';

const glyphs = {
  calendar: Calendar
};

export const Icon = ({ className, glyph, ...restProps }) => {
  const Component = glyphs[glyph];
  return <Component className={cx(css.root, className)} size={16} {...restProps} />;
};
