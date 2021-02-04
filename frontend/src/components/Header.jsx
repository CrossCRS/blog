import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import TextLink from './core/TextLink';

function Header() {
  const [isMenuHidden, setMenuHidden] = useState(true);

  const toggleMenuHidden = () => {
    setMenuHidden(!isMenuHidden);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between w-full p-6 bg-white">
      <div className="flex flex-grow justify-between">
        <Link to="/" className="text-gray-800 text-2xl font-medium uppercase tracking-wider">SAMPLE BLOG</Link>

        <div className="block md:hidden">
          <button type="button" onClick={toggleMenuHidden} className="flex items-center px-3 py-2 border-2 rounded text-gray-800 border-gray-800 hover:text-green-500 hover:border-green-500">
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </div>

      <div className={`flex uppercase ${isMenuHidden && 'hidden'} flex-col md:flex-row`}>
        <TextLink to="/" active>Home</TextLink>
        <TextLink to="/">About Me</TextLink>
        <TextLink to="/">Contact</TextLink>
      </div>
    </header>
  );
}

export default Header;
