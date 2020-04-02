import React, { useState, useContext } from 'react';

import styled, { ThemeContext } from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import Toggle from './Toggle';

const HeaderWrapper = styled.header`
  height: 60px;
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 0 16px;
  position: fixed;
  top: 0;
  background-image: linear-gradient(
    to right,
    ${props => props.theme.primaryColor},
    ${props => props.theme.secondaryColor}
  );
  border-bottom: 3px solid ${props => props.theme.secondaryColor};
`;

const Menu = styled.nav`
  display: ${p => (p.open ? 'block' : 'none')};
  position: absolute;
  width: 100%;
  top: 60px;
  left: 0;
  padding: 8px;
  box-sizing: border-box;
  background: ${props => (props.theme.id === 'dark' ? 'black' : 'white')};
  border-bottom: 3px solid ${props => props.theme.secondaryColor};
  color: ${props => (props.theme.id === 'dark' ? 'white' : 'black')};

  @media (min-width: 768px) {
    display: flex;
    background: none;
    left: initial;
    top: initial;
    position: relative;
    margin: auto 0 auto auto;
    width: initial;
    border-bottom: none;
  }
`;

const StyledLink = styled(Link)`
  padding: 4px 8px;
  display: block;
  text-align: center;
  box-sizing: border-box;
  margin: auto 0;
  font-weight: ${p => (p.active === 'active' ? 'bold' : 'normal')};
  color: ${props => (props.theme.id === 'dark' ? 'white' : 'black')};
`;

const MobileMenuIcon = styled.div`
  margin: auto 0 auto auto;
  width: 25px;
  min-width: 25px;
  padding: 5px;

  > div {
    /*height: 3px;*/
    background: black;
    margin: 5px 0;
    width: 100%;
    border: 2px solid
      ${props => (props.theme.id === 'dark' ? 'white' : 'black')};
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export default function Header() {
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const { id, setTheme } = useContext(ThemeContext);

  return (
    <HeaderWrapper>
      <MobileMenuIcon onClick={() => setMenuOpen(menuOpen => !menuOpen)}>
        <div />
        <div />
        <div />
      </MobileMenuIcon>
      <Menu open={menuOpen}>
        <StyledLink to='/' active={pathname === '/' ? 'active' : ''}>
          Home
        </StyledLink>
        <StyledLink to='/login' active={pathname === '/login' ? 'active' : ''}>
          Login
        </StyledLink>
        <Toggle isActive={id === 'dark'} onToggle={setTheme} />
      </Menu>
    </HeaderWrapper>
  );
}
