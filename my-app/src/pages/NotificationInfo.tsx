import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { Card, Row, Col, Navbar, InputGroup, Form, Button, ButtonGroup } from 'react-bootstrap';

import { axiosAPI } from "../api";
import { getNotification } from '../api/Notifications';
import { AppDispatch, RootState } from "../store";
import { INotification, IRecipient } from "../models";
import { addToHistory } from "../store/historySlice";
import LoadAnimation from '../components/LoadAnimation';
import RecipientCard from '../components/RecipientCard';
import Breadcrumbs from '../components/Breadcrumbs';
import { MODERATOR } from '../components/AuthCheck';


const NotificationInfo = () => {
    let { notification_id } = useParams()
    const [notification, setNotification] = useState<INotification | null>(null)
    const [content, setContent] = useState<IRecipient[] | null>([])
    const role = useSelector((state: RootState) => state.user.role);
    const [loaded, setLoaded] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState(false)
    const [notification_type, setNType] = useState<string>('')
    const navigate = useNavigate()

    const getData = () => {
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
        setEdit(false);
    }

    useEffect(() => {
        dispatch(addToHistory({ path: location, name: "Уведомление" }))
        getData()
        setLoaded(true)

    }, [dispatch]);

    const delFromNotification = (id: string) => () => {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        axiosAPI.delete(`/notifications/delete_recipient/${id}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getData())
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
        }

        const moderator_confirm = (confirm: boolean) => () => {
            const accessToken = localStorage.getItem('access_token');
            axiosAPI.put(`/notifications/${notification?.uuid}/moderator_confirm`,
                { confirm: confirm },
                { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                .then(() => getData())
    }

    console.log(notification)

    return (
        <LoadAnimation loaded={loaded}>
            {notification ? (
                <>
                    <Navbar>
                        <Breadcrumbs />
                    </Navbar>
                    <Col className='p-3 pt-1'>
                        <Card className='shadow text center text-md-start'>
                            <Card.Body>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Статус</InputGroup.Text>
                                    <Form.Control readOnly value={notification.status} />
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                <InputGroup.Text className='t-input-group-text'>Создана</InputGroup.Text>
                                    <Form.Control readOnly value={notification.creation_date} />
                                </InputGroup>
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Сформирована</InputGroup.Text>
                                    <Form.Control readOnly value={notification.formation_date ? notification.formation_date : ''} />
                                </InputGroup>
                                {(notification.status == 'отклонена' || notification.status == 'завершена') && <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>{notification.status === 'отклонена' ? 'Отклонена' : 'Завершена'}</InputGroup.Text>
                                    <Form.Control readOnly value={notification.completion_date ? notification.completion_date : ''} />
                                </InputGroup>}
                                <InputGroup className='mb-1'>
                                    <InputGroup.Text className='t-input-group-text'>Тип уведомления</InputGroup.Text>
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
                                        <InputGroup.Text className='t-input-group-text'>Статус отправки</InputGroup.Text>
                                        <Form.Control readOnly value={notification.sending_status ? notification.sending_status : ''} />
                                        </InputGroup>
                                }
                                {notification.status == 'сформировано' && role == MODERATOR &&
                                    <ButtonGroup className='flex-grow-1 w-100'>
                                        <Button variant='primary' onClick={moderator_confirm(true)}>Подтвердить</Button>
                                        <Button variant='danger' onClick={moderator_confirm(false)}>Отменить</Button>
                                    </ButtonGroup>
                                }
                                {notification.status == 'черновик' &&
                                    <ButtonGroup className='flex-grow-1 w-100'>
                                        <Button variant='primary' onClick={confirm}>Сформировать</Button>
                                        <Button variant='danger' onClick={deleteN}>Удалить</Button>
                                    </ButtonGroup>}
                            </Card.Body>
                        </Card>
                        {content && <Row className='row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 px-1 mt-2'>
                            {content.map((recipient) => (
                                <div className='d-flex p-2 justify-content-center' key={recipient.uuid}>
                                    <RecipientCard  {...recipient}>
                                        {notification.status == 'черновик' &&
                                            <Button
                                                variant='outline-danger'
                                                className='mt-0 rounded-bottom'
                                                onClick={delFromNotification(recipient.uuid)}>
                                                Удалить
                                            </Button>}
                                    </RecipientCard>
                                </div>
                            ))}
                        </Row>}
                    </Col>
                </>
            ) : (
                <h4 className='text-center'>Такого уведомления не существует</h4>
            )}
        </LoadAnimation>
    )
}

export default NotificationInfo