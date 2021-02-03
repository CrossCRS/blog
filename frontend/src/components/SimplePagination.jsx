import React from 'react';
import propTypes from 'prop-types';
import classNames from 'classnames';

import { Link } from 'react-router-dom';

function SimplePagination({ currentPage, pageCount }) {
  const displayNewerLink = (currentPage > 1);
  const displayOlderLink = (currentPage < pageCount);

  const containerClasses = classNames({
    'flex w-full': true,
    'justify-end': !displayNewerLink,
    'justify-between': displayNewerLink,
  });

  const linkClasses = classNames({
    'text-lg hover:text-green-500': true,
  });

  return (
    <div className={containerClasses}>
      {displayNewerLink && <Link className={linkClasses} to={`/page/${parseInt(currentPage, 10) - 1}`}>View newer posts</Link>}
      {displayOlderLink && <Link className={linkClasses} to={`/page/${parseInt(currentPage, 10) + 1}`}>View older posts</Link>}
    </div>
  );
}

SimplePagination.propTypes = {
  currentPage: propTypes.number.isRequired,
  pageCount: propTypes.number.isRequired,
};

export default SimplePagination;
