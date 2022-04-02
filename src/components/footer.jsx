import React from 'react';
import { Layout, Typography } from 'antd';

import css from './footer.module.css';

export const Footer = () => (
  <Layout.Footer className={css.root}>
    <Typography.Text type="secondary">Made by <a href="https://relative-ci.com">RelativeCI</a></Typography.Text>
  </Layout.Footer>
);
