import { AppDispatch, RootState } from "../store";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from '../api/Notifications';
import LoadAnimation from '../components/LoadAnimation';
import { setStatus, setDateStart, setDateEnd } from "../store/searchSlice";
import { INotification } from "../models";

import { MODERATOR } from '../components/AuthCheck'
import { useLocation, Link } from 'react-router-dom';
import { Navbar, Form, Button, Table, Col, InputGroup } from 'react-bootstrap';
import { clearHistory, addToHistory } from "../store/historySlice";
import "react-datepicker/dist/react-datepicker.css"

import DateTimePicker from '../components/DatePicker';

const AllNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])
    const statusFilter = useSelector((state: RootState) => state.search.status);
    const startDate = useSelector((state: RootState) => state.search.formationDateStart);
    const endDate = useSelector((state: RootState) => state.search.formationDateEnd);
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [loaded, setLoaded] = useState(false)

    const getData = () => {
        setLoaded(false)
        getNotifications(statusFilter, startDate, endDate)
            .then((data) => {
                setNotifications(data)
                setLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setLoaded(true)
            })
        };
    
        const handleSearch = (event: React.FormEvent<any>) => {
            event.preventDefault();
            getData()
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Уведомления" }))
        getData()
    }, [dispatch]);


    return (
        <>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2" onSubmit={handleSearch}>
                <InputGroup size='sm'>
                        <InputGroup.Text >Статус</InputGroup.Text>
                        <Form.Select
                            defaultValue={statusFilter}
                            onChange={(status) => dispatch(setStatus(status.target.value))}
                            className="shadow-sm"
                        >
                            <option value="">Любой</option>
                            <option value="сформирован">Сформирован</option>
                            <option value="завершён">Завершён</option>
                            <option value="отклонён">Отклонён</option>
                        </Form.Select>
                    </InputGroup>
                    <DateTimePicker
                        selected={endDate ? new Date(endDate) : null}
                        onChange={(date: Date) => dispatch(setDateStart(date ? date.toISOString() : null))}
                    />
                    <DateTimePicker
                        selected={startDate ? new Date(startDate) : null}
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
                            {role == MODERATOR && <th className='text-center'>Пользователь</th>}
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Тиа уведомления</th>
                            <th className='text-center'></th>
                        </tr>
                        </thead>
                    <tbody>
                        {notifications.map((notification) => (
                            <tr key={notification.uuid}>
                                {role == MODERATOR && <td className='text-center'>{notification.customer}</td>}
                                <td className='text-center'>{notification.status}</td>
                                <td className='text-center'>{notification.creation_date}</td>
                                <td className='text-center'>{notification.formation_date}</td>
                                <td className='text-center'>{notification.completion_date}</td>
                                <td className='text-center'>{notification.notification_type}</td>
                                <td className=''>
                                    <Col className='d-flex flex-col align-items-center justify-content-center'>
                                        <Link to={`/notifications/${notification.uuid}`} className='text-decoration-none' >
                                            <Button
                                                variant='outline-secondary'
                                                size='sm'
                                                className='align-self-center'
                                            >
                                                Подробнее
                                            </Button>
                                        </Link>
                                    </Col>
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