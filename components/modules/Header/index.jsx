import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Container, Image, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../../../styles/header.scss';
import { getCurrentUserInfo, logoutUtils } from '../../../utils/auth';

function Header (props) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const user = getCurrentUserInfo();
    setCurrentUser(user);
  }, []);

  const logoutHandler = () => {
    logoutUtils();
    setCurrentUser(null);
  }

  return (
    <Navbar
      className="py-2 shadow-sm"
      collapseOnSelect
      bg="white"
      expand="lg"
      sticky="top"
      style={{ transition: '.35s all ease' }}
      variant="light"
      {...props}
    >
      <Container>
        <div className="d-flex flex-nowrap align-items-center w-100">
          <Navbar.Brand href="/">
            <Link href="/">
              <Image
                className="img-fluid"
                alt="Backpack Buddy"
                src="/images/default-logo.png"
              />
            </Link>
          </Navbar.Brand>
          <Navbar.Toggle className="ml-auto" aria-controls="bb-navbar-nav" />
        </div>
        <Navbar.Collapse id="bb-navbar-nav">
          <Nav
            className="ml-auto p-2 p-lg-0 align-items-center"
            defaultActiveKey={useRouter().pathname}
          >
            {[
              {
                url: '/',
                name: 'Home',
              },
              {
                url: '/destinasi',
                name: 'Destinasi',
              },
              {
                url: '/contact',
                name: 'Contact',
              },
              {
                url: '/about',
                name: 'About',
              },
            ].map(({ url, name, }) => (
              <Link href={url} key={name}>
                <Nav.Link
                  className="px-lg-3 text-nowrap"
                  style={{ fontSize: '1.1em' }}
                  href={url}
                >
                  {name}
                </Nav.Link>
              </Link>
            ))}
            <Nav.Link className="px-lg-3" style={{ fontSize: '1.2rem' }}> | </Nav.Link>
            {currentUser?.username ? (
              <NavDropdown title={currentUser?.username}>
                <Link href="/profile">
                  <NavDropdown.Item href="/profile">
                    Profil
                </NavDropdown.Item>
                </Link>
                <Link href="/profile/itinerary">
                  <NavDropdown.Item href="/profile/itinerary">
                    Ransel
                </NavDropdown.Item>
                </Link>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logoutHandler}>Keluar</NavDropdown.Item>
              </NavDropdown>
            ) : [
              {
                url: '/login',
                name: 'Login',
              },
              {
                url: '/register',
                name: 'Buat Akun',
                classes: 'btn btn-primary text-white ml-2 px-3 w-100',
              },
            ].map(({ url, name, classes }) => (
              <Link href={url} key={name}>
                <Nav.Link
                  className={`px-lg-3 text-nowrap ${classes}`}
                  style={{ fontSize: '1.1em' }}
                  href={url}
                >
                  {name}
                </Nav.Link>
              </Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
