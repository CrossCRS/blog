/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import DOMPurify from 'dompurify';
import marked from 'marked';

import PostPreviewSkeleton from '../components/PostPreviewSkeleton';
import axiosInstance from '../components/api/axiosInstance';

function CustomPagePage() {
  const { pageName } = useParams();

  const [page, setPage] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/pages/${pageName}`)
      .then((response) => {
        if (!response.error) {
          response.data.content = DOMPurify.sanitize(marked(response.data.content));
          setPage(response.data);
          setHasError(false);
        } else {
          setHasError(true);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.log(error);
        setHasError(true);
        setIsFetching(false);
      });
  }, [pageName]);

  if (hasError) {
    return (
      <h4 className="font-medium text-gray-500 text-xl text-center my-16">Page Not Found</h4>
    );
  }

  if (isFetching) {
    return (
      <div>
        <PostPreviewSkeleton />
      </div>
    );
  }

  return (
    <div className="bg-white py-6 px-6 my-6 md:my-12 shadow-md border border-gray-200 rounded-md">
      <h2 className="my-0 font-medium text-2xl text-gray-900">{page.title}</h2>
      <p className="text-gray-600 my-4" dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export default CustomPagePage;
