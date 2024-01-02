import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Navbar, Nav, InputGroup, Form, Button, ButtonGroup } from 'react-bootstrap';

import { axiosAPI } from "../api";
import { getNotification } from '../api/Notifications';
import { AppDispatch } from "../store";
import { INotification, IRecipient } from "../models";
import { addToHistory } from "../store/historySlice";
import LoadAnimation from '../components/LoadAnimation';
import { SmallRCard } from '../components/RecipientCard';
import Breadcrumbs from '../components/Breadcrumbs';


const NotificationInfo = () => {
    let { notification_id } = useParams()
    const [notification, setNotification] = useState<INotification | null>(null)
    const [content, setContent] = useState<IRecipient[] | null>([])
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState(false)
    const [notification_type, setNType] = useState<string>('')
    const navigate = useNavigate()

    const getData = () => {
        setLoaded(false)
        getNotification(notification_id)
            .then(data => {
                if (data === null) {
                    setNotification(null)
                    setContent([])
                } else {
                    setNotification(data.notification);
                    setNType(data.notification.notification_type ? data.notification.notification_type : '')
                    setContent(data.recipients);

                }
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setLoaded(true)
    }

    const update = () => {
        let accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.put(`/notifications`,
            { notification_type: notification_type },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                }
            })
            .then(() => getData())
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        setEdit(false);
    }

    useEffect(() => {
        getData()
        dispatch(addToHistory({ path: location, name: "Уведомление" }))

    }, [dispatch]);

    const delFromNotification = (id: string) => () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.delete(`/notifications/delete_recipient/${id}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getData())
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const confirm = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.put('/notifications/user_confirm', null, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(_ => {
                getData()
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    const deleteN = () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.delete('/notifications', { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(_ => {
                navigate('/recipients')
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }

    return loaded ? (
        notification ? (
            <>
                <Navbar>
                    <Nav>
                        <Breadcrumbs />
                    </Nav>
                </Navbar>
                <Col className='p-3'>
                    <Card className='shadow text center text-md-start'>
                        <Card.Body>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>Статус</InputGroup.Text>
                                <Form.Control readOnly value={notification.status} />
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>Создана</InputGroup.Text>
                                <Form.Control readOnly value={notification.creation_date} />
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>Сформирована</InputGroup.Text>
                                <Form.Control readOnly value={notification.formation_date ? notification.formation_date : ''} />
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>{notification.status === 'отклонена' ? 'Отклонена' : 'Подтверждена'}</InputGroup.Text>
                                <Form.Control readOnly value={notification.completion_date ? notification.completion_date : ''} />
                            </InputGroup>
                            <InputGroup className='mb-1'>
                                <InputGroup.Text>Тип уведомления</InputGroup.Text>
                                <Form.Control
                                    readOnly={!edit}
                                    value={notification_type}
                                    onChange={(e) => setNType(e.target.value)}
                                />
                                {!edit && notification.status === 'черновик' && <Button onClick={() => setEdit(true)}>Изменить</Button>}
                                {edit && <Button variant='success' onClick={update}>Сохранить</Button>}
                                {edit && <Button
                                    variant='danger'
                                    onClick={() => {
                                        setNType(notification.notification_type ? notification.notification_type : '');
                                        setEdit(false)
                                    }}>
                                    Отменить
                                </Button>}
                            </InputGroup>
                            {notification.status != 'черновик' &&
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text>Статус отправки</InputGroup.Text>
                                    <Form.Control readOnly value={notification.sending_status ? notification.sending_status : ''} />
                                </InputGroup>}
                            {notification.status == 'черновик' &&
                                <ButtonGroup className='flex-grow-1 w-100'>
                                    <Button variant='success' onClick={confirm}>Сформировать</Button>
                                    <Button variant='danger' onClick={deleteN}>Удалить</Button>
                                </ButtonGroup>}
                        </Card.Body>
                    </Card>
                    {content && <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1 mt-2'>
                        {content.map((recipient) => (
                            <div className='d-flex p-2 justify-content-center' key={recipient.uuid}>
                                <SmallRCard  {...recipient}>
                                    {notification.status == 'черновик' &&
                                        <Button
                                            variant='outline-danger'
                                            className='mt-0 rounded-bottom'
                                            onClick={delFromNotification(recipient.uuid)}>
                                            Удалить
                                        </Button>}
                                </SmallRCard>
                            </div>
                        ))}
                    </Row>}
                </Col>
            </>
        ) : (
            <h4 className='text-center'>Такой перевозки не существует</h4>
        )
    ) : (
        <LoadAnimation />
    )
}

export default NotificationInfo