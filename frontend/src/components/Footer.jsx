import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook, faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';

import TextLink from './core/TextLink';

import axiosInstance from './api/axiosInstance';

function Footer() {
  const classSocial = 'inline-block text-2xl py-2 px-4 text-gray-700 hover:text-green-500';

  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    axiosInstance.get('/pages?footer=true')
      .then((response) => {
        if (!response.error) {
          setMenuItems(response.data);
        }
      })
      .catch((/* error */) => {
        // console.log(error);
      });
  }, []);

  return (
    <footer className="flex flex-col items-center w-full p-6 bg-white">
      <div className="flex">
        <Link to="/" className={classSocial}>
          <FontAwesomeIcon icon={faTwitter} />
        </Link>
        <Link to="/" className={classSocial}>
          <FontAwesomeIcon icon={faFacebook} />
        </Link>
        <Link to="/" className={classSocial}>
          <FontAwesomeIcon icon={faGithub} />
        </Link>
        <Link to="/" className={classSocial}>
          <FontAwesomeIcon icon={faLinkedinIn} />
        </Link>
      </div>

      <div className="flex">
        {menuItems.map((item) => <TextLink key={item._id} to={`/${item.name}`} light>{item.title}</TextLink>)}
      </div>

      <div className="text-gray-600 font-light text-sm py-2">&copy; Norbert Budzyński 2021</div>
    </footer>
  );
}

export default Footer;
