import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Layout, Menu, Row } from 'antd';

import logoURL from '../assets/relative-ci.svg';
import css from './header.module.css';

export const Header = () => (
  <Layout.Header className={css.root}>
    <div className={css.inner}>
      <Link to="/" className={css.logo}>
        <img src={logoURL} height={32} alt="RelativeCI" />
      </Link>
      <Menu mode="horizontal" className={css.menu}>
        <Menu.Item key="home">
          <Link to="/">
            Home
          </Link>
        </Menu.Item>
        <Menu.Item key="about">
          <Link to="/about">
            About
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  </Layout.Header>
);
