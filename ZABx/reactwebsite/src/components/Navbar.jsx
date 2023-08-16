import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import MetamaskConnector from '../MetamaskConnector';

const Navbar = () => {
  const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #ecf0f1;

    .navbar-list {
      display: flex;
      gap: 4.5rem;
      padding: 2rem;
      align-items: center;
      list-style: none;

      .navbar-link {
        text-decoration: none;
        font-size: 1.6rem;
        text-transform: uppercase;
        color: #ecf0f1;
        transition: color 0.3s linear;

        &:hover,
        &:active {
          color: ${({ theme }) => theme.colors.helper};
        }
      }
    }

    .navbar-actions {
      display: flex;
      align-items: center;
    }
  `;

  return (
    <Nav>
      <ul className="navbar-list">
        <li>
          <NavLink className="navbar-link" to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/about">
            About
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/trade">
            Trade
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/earn">
            Earn
          </NavLink>
        </li>
        <li>
          <NavLink className="navbar-link" to="/contact">
            Contact Us
          </NavLink>
        </li>
      </ul>
      <div className="navbar-actions">
      <MetamaskConnector showDropdownOption={true} />
      </div>
    </Nav>
  );
};

export default Navbar;