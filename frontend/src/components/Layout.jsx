/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';

import Header from './Header';
import Footer from './Footer';

import bgimage from '../img/background.jpg';

function Layout({ children }) {
  return (
    <div className="min-h-screen font-body">
      <Header />

      <div className="w-full h-80" style={{ backgroundImage: `url(${bgimage})`, backgroundAttachment: 'fixed', backgroundPositionX: 'center' }}>
        <div className="w-full h-full flex flex-col justify-center items-center bg-green-500 bg-opacity-60">
          <h1 className="text-white text-center text-5xl md:text-6xl m-0 uppercase">Sample Blog</h1>
          <h3 className="text-white text-center m-0">We write about stuff</h3>
        </div>
      </div>
      <div className="w-full pt-2 bg-white">
        <main className="max-w-4xl mx-auto">
          {children}
        </main>
      </div>

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
