import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Search from './Search';
function NavScrollExample() {
  return (
    <Navbar bg="dark" variant='dark' expand="lg">
      <Container fluid>
        <Navbar.Brand href="/" style={{paddingLeft:"60px"}}><h2>LOGO</h2></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" ><i class="fa fa-search" aria-hidden="true"></i></Navbar.Toggle>
        <Navbar.Collapse id="navbarScroll" aria-hidden="true">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            
          </Nav>
          <Form className="d-flex">
          <Search />
          
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;