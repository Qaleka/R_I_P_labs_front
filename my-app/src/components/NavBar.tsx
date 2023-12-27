import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from "react-redux";

import { RootState } from "../store";

function NavigationBar() {
    const userLogin = useSelector((state: RootState) => state.user.login);
    return (
        <Navbar expand="lg" className="bg-primary bg-primary" >
            <div className='container-xl px-2 px-sm-3'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-grow-1">
                        <Nav.Item>
                            <Link to="" className="nav-link ps-0">Главная</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/recipients" className="nav-link">Получатели</Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Link to="/notifications" className="nav-link">Уведомления</Link>
                        </Nav.Item>
                        {userLogin &&
                            <Navbar.Collapse className="justify-content-end">
                                <Navbar.Text>
                                    {userLogin}
                                </Navbar.Text>
                            </Navbar.Collapse>
                        }
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
