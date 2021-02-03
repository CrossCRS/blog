import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import TextLink from './core/TextLink';

function Footer() {
  const classSocial = 'inline-block text-2xl py-2 px-4 text-gray-700 hover:text-green-500';

  return (
    <footer className="flex flex-col items-center w-full p-6 bg-white">
      <ul className="flex">
        <li>
          <Link to="/" className={classSocial}>
            <FontAwesomeIcon icon={faTwitter} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classSocial}>
            <FontAwesomeIcon icon={faFacebook} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classSocial}>
            <FontAwesomeIcon icon={faGithub} />
          </Link>
        </li>
        <li>
          <Link to="/" className={classSocial}>
            <FontAwesomeIcon icon={faLinkedinIn} />
          </Link>
        </li>
      </ul>

      <ul className="flex">
        <li>
          <TextLink to="/" light>Contact</TextLink>
        </li>
        <li>
          <TextLink to="/" light>Terms</TextLink>
        </li>
        <li>
          <TextLink to="/" light>Privacy</TextLink>
        </li>
      </ul>

      <div className="text-gray-600 font-light text-sm py-2">&copy; Norbert Budzyński 2021</div>
    </footer>
  );
}

export default Footer;
