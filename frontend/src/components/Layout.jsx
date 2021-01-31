/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen font-body">
      <Header />

      <div className="w-full bg-green-500 h-72 flex justify-center items-center">
        <h1 className="text-white text-6xl">Placeholder</h1>
      </div>
      <main className="max-w-4xl mx-auto mt-2">
        {children}
      </main>

      <Footer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.any,
};

Layout.defaultProps = {
  children: '',
};

export default Layout;
