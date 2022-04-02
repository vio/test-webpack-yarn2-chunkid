import React from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate, useLocation } from "react-router-dom";
import { Layout, PageHeader } from 'antd';

import { Header } from './components/header';
import { Footer } from './components/footer';
import { RepoDetails } from './components/repo-details';
import { RepoList } from './components/repo-list';
import { About } from './components/about';
import { NotFound } from './components/not-found';
import css from './app.module.css';

const RepoDetailsPage = () => {
  const { owner, repo } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <PageHeader className={css.pageHeader} title={repo} onBack={() => navigate(-1) }/>
      <div className={css.contentInner}>
        <RepoDetails owner={owner} repo={repo} />
      </div>
    </>
  );
};

const HomePage = () => {
  return (
    <>
      <PageHeader className={css.pageHeader} title="Examples" />
      <div className={css.contentInner}>
        <RepoList />
      </div>
    </>
  );
}; 

const AboutPage = () => {
  return (
    <>
      <PageHeader className={css.pageHeader} title="About" />
      <div className={css.contentInner}>
        <About />
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
