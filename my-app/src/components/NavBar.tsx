import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { Nav, Navbar, Button } from 'react-bootstrap';

import { axiosAPI } from '../api';
import { AppDispatch, RootState } from "../store";
import { resetLogin, resetRole } from "../store/userSlice";
import { reset } from "../store/searchSlice";

import { CUSTOMER, MODERATOR } from "./AuthCheck";

function NavigationBar() {
    const userLogin = useSelector((state: RootState) => state.user.login);
    const userRole = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();

    const logout = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.get('/user/logout', { headers: { 'Authorization': `Bearer ${accessToken}` } })
            .then(_ => {
                dispatch(resetLogin())
                dispatch(resetRole())
                dispatch(reset())
                localStorage.clear()
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }
    return (
        <Navbar expand="lg" className="bg-primary" >
            <div className='container-xl px-2 px-sm-3'>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto flex-grow-1">
                    <Link to="/recipients" className="nav-link">Получатели</Link>
                    {(userRole === MODERATOR || userRole === CUSTOMER) && <Link to="/notifications" className="nav-link">Уведомления</Link>}
                    {userRole === MODERATOR && <Link to="/recipients-edit" className="nav-link text-nowrap ">Таблица получателей</Link>}
                        <Navbar.Collapse className="justify-content-end">
                            {userLogin ? (
                                <>
                                    <Navbar.Text className="px-sm-2">
                                        Пользователь: {userLogin}
                                    </Navbar.Text>

                                    <Button
                                        variant='danger'
                                        onClick={logout}>
                                        Выход
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to='/authorization' className="nav-link" style={{ backgroundColor: '#12CEF8', padding: '8px', borderRadius: '5px',  marginRight: '10px' }}>Войти</Link>
                                    <Link to='/registration' className="nav-link" style={{ backgroundColor: '#12CEF8', padding: '8px', borderRadius: '5px' }}>Регистрация</Link>
                                </>
                            )}
                        </Navbar.Collapse>
                    </Nav>
                </Navbar.Collapse>
            </div>
        </Navbar>
    );
}

export default NavigationBar;
