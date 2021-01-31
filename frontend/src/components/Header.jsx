import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [isMenuHidden, setMenuHidden] = useState(true);

  const toggleMenuHidden = () => {
    setMenuHidden(!isMenuHidden);
  };

  const classes = {
    links: 'inline-block py-2 md:px-4 text-gray-800 hover:text-green-500',
    links_active: 'inline-block py-2 md:px-4 text-green-500 font-semibold',
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

      <ul className={`uppercase ${isMenuHidden && 'hidden'} md:flex`}>
        <li>
          <Link to="/" className={classes.links_active}>Home</Link>
        </li>
        <li>
          <Link to="/" className={classes.links}>About Me</Link>
        </li>
        <li>
          <Link to="/" className={classes.links}>Contact</Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;
