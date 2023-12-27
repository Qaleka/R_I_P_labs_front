import { AppDispatch, RootState } from "../store";
import { useEffect, forwardRef, ButtonHTMLAttributes } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { axiosAPI } from "../api";
import LoadAnimation from '../components/LoadAnimation';
import { setNotifications, setStatusFilter, setDateStart, setDateEnd } from "../store/notificationSlice";
import { INotification } from "../models";
import { format } from 'date-fns';
import DatePicker from 'react-datepicker';
import AuthCheck, { CUSTOMER, MODERATOR } from '../components/AuthCheck'
import { useLocation, Link } from 'react-router-dom';
import { Navbar, Form, Button, Table, Col, InputGroup } from 'react-bootstrap';
import { clearHistory, addToHistory } from "../store/historySlice";
import "react-datepicker/dist/react-datepicker.css"


interface ApiResponse {
    notifications: INotification[]
}

interface CustomInputProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    value?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const AllNotifications = () => {
    const notifications = useSelector((state: RootState) => state.notification.notifications);
    const statusFilter = useSelector((state: RootState) => state.notification.statusFilter);
    const dateStart = useSelector((state: RootState) => state.notification.formationDateStart);
    const dateEnd = useSelector((state: RootState) => state.notification.formationDateEnd);
    const role = useSelector((state: RootState) => state.user.role);
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getNotifications = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }

        axiosAPI.get<ApiResponse>('/notifications', {
            params: {
                ...(statusFilter && { status: statusFilter }),
                ...(dateStart && { formation_date_start: format(new Date(dateStart), 'yyyy-MM-dd HH:mm') }),
                ...(dateEnd && { formation_date_end: format(new Date(dateEnd), 'yyyy-MM-dd HH:mm') }),
            },
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch(setNotifications(response.data.notifications))
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        getNotifications();
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Уведомления" }))
        getNotifications();
    }, [dispatch]);

    const CustomInput = forwardRef<HTMLButtonElement, CustomInputProps>((props, ref) => (
        <Button
            variant="primary"
            ref={ref}
            size="sm"
            className="text-nowrap shadow-sm"
            style={{ paddingRight: '1.5rem', minWidth: '137px' }}
            {...props}
        >
            {props.value ? props.value : "Выберите дату"}
        </Button>
    ));

    return (
        <AuthCheck allowedRole={CUSTOMER}>
            <Navbar>
                <Form className="d-flex flex-row align-items-stretch flex-grow-1 gap-2" onSubmit={handleSearch}>
                <InputGroup size='sm'>
                        <InputGroup.Text >Статус</InputGroup.Text>
                        <Form.Select
                            defaultValue={statusFilter}
                            onChange={(status) => dispatch(setStatusFilter(status.target.value))}
                            className="shadow-sm"
                        >
                            <option value="">Любой</option>
                            <option value="сформирован">Сформирован</option>
                            <option value="завершён">Завершён</option>
                            <option value="отклонён">Отклонён</option>
                        </Form.Select>
                    </InputGroup>
                    <DatePicker
                        selected={dateStart ? new Date(dateStart) : null}
                        onChange={(date: Date) => dispatch(setDateStart(date))}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        isClearable
                        timeCaption="Время"
                        dateFormat="HH:mm MM.d.yyyy"
                        customInput={<CustomInput />}
                        className='text-nowrap'
                    />
                    <DatePicker
                        selected={dateEnd ? new Date(dateEnd) : null}
                        onChange={(date: Date) => dispatch(setDateEnd(date))}
                        showTimeSelect
                        timeFormat="HH:mm"
                        timeIntervals={60}
                        isClearable
                        timeCaption="Время"
                        dateFormat="HH:mm MM.d.yyyy"
                        customInput={<CustomInput />}
                        className='text-nowrap'
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
            {notifications ? (
                <Table bordered hover>
                    <thead>
                        <tr>
                            {role == MODERATOR && <th className='text-center'>Пользователь</th>}
                            <th className='text-center'>Статус</th>
                            <th className='text-center'>Дата создания</th>
                            <th className='text-center'>Дата формирования</th>
                            <th className='text-center'>Дата завершения</th>
                            <th className='text-center'>Тип Уведомления</th>
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
            ) : (
                <LoadAnimation />
                )
            }
        </ AuthCheck >
    );
}

export default AllNotifications 