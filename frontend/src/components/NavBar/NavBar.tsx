// src/components/NavBar/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuildingUser } from '@fortawesome/free-solid-svg-icons';


const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
        <div className={styles.logo}>
        <FontAwesomeIcon icon={faBuildingUser} size="lg" />
        </div>
    <div className={styles.navLinks}>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/find-employee">Find by ID</Link>
      <Link to="/employees/new">Create Employee</Link>
      <Link to="/employees/archived">Archived Employees </Link>
      </div>
    </nav>
    
  );
};

export default NavBar;
