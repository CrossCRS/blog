import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const classes = {
    social: 'inline-block text-2xl py-2 px-4 text-gray-700 hover:text-green-500',
    links: 'inline-block py-2 px-4 text-gray-700 font-light hover:text-green-500',
  };

  return (
    <footer className="flex flex-col items-center w-full p-6 bg-white">
      <ul className="flex">
        <li>
          <Link to="/" className={classes.social}>
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classes.social}>
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classes.social}>
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classes.social}>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </Link>
        </li>
      </ul>

      <ul className="flex">
        <li>
          <Link to="/" className={classes.links}>Contact</Link>
        </li>
        <li>
          <Link to="/" className={classes.links}>Terms</Link>
        </li>
        <li>
          <Link to="/" className={classes.links}>Privacy</Link>
        </li>
      </ul>

      <div className="text-gray-600 font-light text-sm py-2">&copy; Norbert Budzyński 2021</div>
    </footer>
  );
}

export default Footer;
