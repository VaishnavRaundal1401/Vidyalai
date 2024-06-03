import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  position: sticky;
  top: 0;
  z-index:1000;

`;

const Navbar = styled.nav`
  background-color: #333;
  color: #fff;
  width: 100%;
  position: absolute;
  left: 0;
  z-index: 1000;
`;

const ListItem = styled.li`
  display: inline-block;
  margin-right: 20px;
  font-size: 18px;
  cursor: pointer;
  padding: 15px 
`;

const Link = styled.a`
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const TopNavbar = () => {
  return (
    <Container>
      <Navbar>
        <ul style={{ margin: 0, padding: 0 }}>
          <ListItem>
            <Link href={'/'}>Home</Link>
          </ListItem>
          <ListItem>
            <Link href={'/users'}>Users</Link>
          </ListItem>
        </ul>
      </Navbar>
    </Container>
  );
};

export default TopNavbar;
