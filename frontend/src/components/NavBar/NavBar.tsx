// src/components/NavBar/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.module.scss'

const NavBar: React.FC = () => {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/employees">Employees</Link>
      <Link to="/find-employee">Find by ID</Link>
    </nav>
  );
};

export default NavBar;
