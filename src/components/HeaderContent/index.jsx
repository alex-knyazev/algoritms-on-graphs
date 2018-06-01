import React from 'react';
import { Link } from 'react-router-dom';

import routes from '@/constants/routes';

import styles from './index.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <ul>
        <li>
          <Link to={routes.LAB1}>Лабораторная 1</Link>
        </li>
        <li>
          <Link to={routes.LAB2}>Лабораторная 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
