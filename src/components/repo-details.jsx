import React, { useEffect, useState } from 'react';
import useSWR from 'swr';
import { Alert, Divider, Spin, Typography } from 'antd';
import ReactMarkdown from 'react-markdown';

import { Repo } from './repo';
import { fetcher } from '../utils';

const { Title } = Typography;

const Meta = ({ owner, repo }) => {
  const { data, error } = useSWR(`/repos/${owner}/${repo}`, fetcher);

  if (error) {
    return <Alert type="error">{error.message}</Alert>;
  }

  if (!data) {
    return <Spin />;
  }

  return <Repo repo={data} title={null} />;
}

const ReadMe = ({ owner, repo }) => {
  const { data, error } = useSWR(`/repos/${owner}/${repo}/readme`, fetcher);
  const [markdown, setMarkdown] = useState('');

  useEffect(() => {
    const downloadReadme = async (url) => {
      const readmeResponse = await fetch(url);
      const readmeData = await readmeResponse.text();
      setMarkdown(readmeData);
    };

    if (data?.download_url) {
      downloadReadme(data.download_url);
    }
  }, [data?.download_url]);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return <Spin />;
  }

  return (
    <ReactMarkdown>{markdown}</ReactMarkdown>
  );
}

export const RepoDetails = (props) => {
  const { owner, repo } = props;

  return (
    <div>
      <Meta owner={owner} repo={repo} />
      <Divider />
      <ReadMe owner={owner} repo={repo} />
    </div>
  );
}
