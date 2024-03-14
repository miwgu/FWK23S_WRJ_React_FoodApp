import { useState } from 'react';
import {Button, Image} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FaHeart } from "react-icons/fa6";
import { FaStar } from "react-icons/fa6";
import CoockMe_Logo from '../../assets/CoockMe_Logo.png';

function MyNav({onSearch}) {
  const [searchTerm, setSearchTerm] =useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  }

  return (
    <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
      <Container fluid>
        <Navbar.Brand href="#"><Image src={CoockMe_Logo} style={{height:'50px'}} />cookme</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/meal-favorites"><FaHeart color='red' />Favorites</Nav.Link>
            <Nav.Link href="/meal-rating"><FaStar color='gold' />Ratings</Nav.Link>

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