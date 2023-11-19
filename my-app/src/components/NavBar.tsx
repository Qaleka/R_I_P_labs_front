import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavigationBar() {
    return (
        <Navbar expand="sm" className="bg-primary bg-dark" data-bs-theme="dark" >
            <Container className='container-fluid'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link to={`${import.meta.env.BASE_URL}/recipients`} className="nav-link">Получатели</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to={`${import.meta.env.BASE_URL}/notifications`} className="nav-link">Уведомления</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
