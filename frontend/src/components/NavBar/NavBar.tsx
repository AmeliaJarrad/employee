// src/components/NavBar/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './NavBar.module.scss'

const NavBar: React.FC = () => {
  return (
    <nav className={styles.navBar}>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/find-employee">Find by ID</Link>
      <Link to="/employees/new">Create Employee</Link>
      <Link to="/employees/archived">Archived Employees </Link>
    </nav>
  );
};

export default NavBar;
