import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function NavigationBar() {
    return (
        <Navbar expand="sm" className="bg-primary" data-bs-theme="dark">
            <Container className='recipient-fluid'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Item>
                            <Link to="/recipients" className="nav-link">Получатели</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/notifications" className="nav-link">Уведомления</Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
