import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
import { Layout, PageHeader, Spin } from 'antd';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { NotFound } from './components/not-found';
import css from './app.module.css';

const RepoDetailsAsync = React.lazy(
  async () => {
    const chunk = await import(/* webpackChunkName: 'details' */'./components/repo-details');
    return { default: chunk.RepoDetails };
  },
);

const RepoListAsync = React.lazy(
  async () => {
    const chunk = await import(/* webpackChunkName: 'home' */'./components/repo-list');
    return { default: chunk.RepoList };
  },
);

const AboutAsync = React.lazy(
  async () => {
    const chunk = await import(/* webpackChunkName: 'about' */'./components/about');
    return { default: chunk.About };
  },
);

const RepoDetailsPage = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader className={css.pageHeader} title={repo} onBack={() => navigate(-1) }/>
      <div className={css.contentInner}>
        <Suspense fallback={<Spin />}>
          <RepoDetailsAsync owner={owner} repo={repo} />
        </Suspense>
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <PageHeader className={css.pageHeader} title="Examples" />
      <div className={css.contentInner}>
        <Suspense fallback={<Spin />}>
          <RepoListAsync />
        </Suspense>
      </div>
    </>
  );
}; 

const AboutPage = () => {
  return (
    <>
      <PageHeader className={css.pageHeader} title="About" />
      <div className={css.contentInner}>
        <Suspense fallback={<Spin />}>
          <AboutAsync />
        </Suspense>
      </div>
    </>
  );
};

const NotFoundPage = () => {
  const location = useLocation();

  return (
    <>
      <PageHeader className={css.pageHeader} title="Not found" />
      <div className={css.contentInner}>
        <NotFound location={location} />
      </div>
    </>
  );
};

export const App = () => (
  <BrowserRouter>
    <Layout>
      <Header />
      <div className={css.contentContainer}>
        <Layout.Content className={css.content}>
          <Routes>
            <Route path="/repos/:owner/:repo" element={<RepoDetailsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout.Content>
      </div>
      <Footer />
    </Layout>
  </BrowserRouter>
);
