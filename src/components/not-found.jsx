import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

export const NotFound = ({ location }) => (
  <div>
    <Typography.Paragraph><code>{location.pathname}</code> does not exit.</Typography.Paragraph>
    <Link to="/">Go to homepage</Link>
  </div>
);
