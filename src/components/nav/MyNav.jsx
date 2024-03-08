import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function MyNav({onSearch}) {
  const [searchTerm, setSearchTerm] =useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#">Navbar scroll</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/meal-favorites">Favorites</Nav.Link>

          </Nav>
          <Form className="d-flex flex-grow-1 justify-content-end">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e)=>setSearchTerm(e.target.value)}
            />
            <Button variant="outline-success" onClick={handleSearch}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;