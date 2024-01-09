import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from '../api/Notifications';
import LoadAnimation from '../components/LoadAnimation';
import { setUser, setStatus, setDateStart, setDateEnd } from "../store/searchSlice";
import { INotification } from "../models";

import { axiosAPI } from '../api';
import { MODERATOR } from '../components/AuthCheck'
import { useLocation, Link } from 'react-router-dom';
import { Navbar, Form, Button, Table, InputGroup, ButtonGroup } from 'react-bootstrap';
import { clearHistory, addToHistory } from "../store/historySlice";
import "react-datepicker/dist/react-datepicker.css"

import DateTimePicker from '../components/DatePicker';

const AllNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const userFilter = useSelector((state: RootState) => state.search.user);
    const statusFilter = useSelector((state: RootState) => state.search.status);
    const startDate = useSelector((state: RootState) => state.search.formationDateStart);
    const endDate = useSelector((state: RootState) => state.search.formationDateEnd);
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [loaded, setLoaded] = useState(false)

    const getData = () => {
        getNotifications(userFilter, statusFilter, startDate, endDate)
            .then((data) => {
                setLoaded(true);
                setNotifications(data)
            })
        };
    
        const handleSearch = (event: React.FormEvent<any>) => {
            event.preventDefault();
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Уведомления" }))
        getData()
        const intervalId = setInterval(() => {
            getData();
        }, 2500);
        return () => clearInterval(intervalId);
    }, [dispatch, userFilter, statusFilter, startDate, endDate]);

    const moderator_confirm = (id: string, confirm: boolean) => () => {
        const accessToken = localStorage.getItem('access_token');
        axiosAPI.put(`/notifications/${id}/moderator_confirm`,
            { confirm: confirm },
            { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => setNotifications(prevNotifications => [...prevNotifications]))
    }

    return (
        <>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2" onSubmit={handleSearch}>
                {role == MODERATOR && <InputGroup size='sm' className='shadow-sm'>
                        <InputGroup.Text>Пользователь</InputGroup.Text>
                        <Form.Control value={userFilter} onChange={(e) => dispatch(setUser(e.target.value))} />
                    </InputGroup>}
                <InputGroup size='sm' className='shadow-sm'>
                        <InputGroup.Text >Статус</InputGroup.Text>
                        <Form.Select
                            defaultValue={statusFilter}
                            onChange={(status) => dispatch(setStatus(status.target.value))}
                        >
                            <option value="">Любой</option>
                            <option value="сформировано">Сформировано</option>
                            <option value="завершено">Завершено</option>
                            <option value="отклонено">Отклонено</option>
                        </Form.Select>
                    </InputGroup>
                    <DateTimePicker
                        selected={startDate ? new Date(startDate) : null}
                        onChange={(date: Date) => dispatch(setDateStart(date ? date.toISOString() : null))}
                    />
                    <DateTimePicker
                        selected={endDate ? new Date(endDate) : null}
                        onChange={(date: Date) => dispatch(setDateEnd(date ? date.toISOString() : null))}
                    />
                    <Button
                        variant="primary"
                        size="sm"
                        type="submit"
                        className="shadow-lg">
                        Поиск
                    </Button>
                </Form>
            </Navbar>
            < LoadAnimation loaded={loaded}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            {role == MODERATOR && <th className='text-center'>Создатель</th>}
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Статус отправки</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Тип уведомления</th>
                            <th className='text-center'></th>
                        </tr>
                        </thead>
                    <tbody>
                        {notifications.map((notification) => (
                            <tr key={notification.uuid}>
                                {role == MODERATOR && <td className='text-center'>{notification.customer}</td>}
                                <td className='text-center'>{notification.status}</td>
                                <td className='text-center'>{notification.sending_status}</td>
                                <td className='text-center'>{notification.creation_date}</td>
                                <td className='text-center'>{notification.formation_date}</td>
                                <td className='text-center'>{notification.completion_date}</td>
                                <td className='text-center'>{notification.notification_type}</td>
                                <td className='p-0 text-center align-middle'>
                                    <Table className='m-0'>
                                        <tbody>
                                            <tr>
                                                <td className='py-1 border-0' style={{ background: 'transparent' }}>
                                                    <Link to={`/notifications/${notification.uuid}`}
                                                        className='btn btn-sm btn-outline-primary text-decoration-none w-100' >
                                                        Подробнее
                                                    </Link>
                                                </td>
                                            </tr>
                                            {notification.status == 'сформировано' && role == MODERATOR && <tr>
                                                <td className='py-1 border-0' style={{ background: 'transparent' }}>
                                                    <ButtonGroup className='flex-grow-1 w-100'>
                                                        <Button variant='success' size='sm' onClick={moderator_confirm(notification.uuid, true)}>Подтвердить</Button>
                                                        <Button variant='danger' size='sm' onClick={moderator_confirm(notification.uuid, false)}>Отменить</Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>}
                                        </tbody>
                                    </Table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </LoadAnimation >
        </>
         )
}

export default AllNotifications 