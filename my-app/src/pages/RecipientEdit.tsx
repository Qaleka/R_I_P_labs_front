import { FC, useEffect, useState, ChangeEvent, useRef } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { Card, Row, Navbar, FloatingLabel, InputGroup, Form, Col, Button, ButtonGroup } from 'react-bootstrap';

import { axiosAPI, getRecipient } from '../api'
import { IRecipient } from '../models';

import { AppDispatch } from "../store";
import { addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import CardImage from '../components/CardImage';
import Breadcrumbs from '../components/Breadcrumbs';

const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const [recipient, setRecipient] = useState<IRecipient | undefined>(undefined)
    const [loaded, setLoaded] = useState<Boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;
    const [edit, setEdit] = useState<boolean>(false)
    const [image, setImage] = useState<File | undefined>(undefined);
    const inputFile = useRef<HTMLInputElement | null>(null);
    const navigate = useNavigate()

    useEffect(() => {
        if (!edit) {
        const getData = async () => {
            setLoaded(false);
            let data: IRecipient | undefined;
            let name: string;
            try {
                if (recipient_id == 'new') {
                    data = {
                        uuid: "",
                        fio: "",
                        email: "",
                        age: NaN,
                        image_url: "",
                        adress: "",
                    }
                    name = 'Новый получатель'
                    setEdit(true)
                } else {
                    data = await getRecipient(recipient_id);
                    name = data ? data.fio : ''
                }
                setRecipient(data);
                dispatch(addToHistory({ path: location, name: name }));
            } finally {
                setLoaded(true);
            }
        }

        getData();
}}, [dispatch]);

    const changeString = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipient(recipient ? { ...recipient, [e.target.id]: e.target.value } : undefined)
    }

    const changeNumber = (e: ChangeEvent<HTMLInputElement>) => {
        setRecipient(recipient ? { ...recipient, [e.target.id]: parseInt(e.target.value) } : undefined)
    }

    const deleteRecipient = () => {
        let accessToken = localStorage.getItem('access_token');
        axiosAPI.delete(`/recipients/${recipient_id}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => navigate('/recipients-edit'))
    }

    const save = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formElement = event.currentTarget;
        if (!formElement.checkValidity()) {
            return
        }
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            return
        }
        setEdit(false);
        const formData = new FormData();
        if (recipient) {
            Object.keys(recipient).forEach(key => {
                if ((recipient as any)[key]) {
                    formData.append(key, (recipient as any)[key])
                }
            });
        }
        if (image) {
            formData.append('image', image);
        }

        if (recipient_id == 'new') {
            axiosAPI.post(`/recipients`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                .then((response) => getRecipient(response.data).then((data) => setRecipient(data)))
        } else {
            axiosAPI.put(`/recipients/${recipient?.uuid}`, formData, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
                .then(() => getRecipient(recipient_id).then((data) => setRecipient(data)))
        }
    }

    const cancel = () => {
        setEdit(false)
        setImage(undefined)
        if (inputFile.current) {
            inputFile.current.value = ''
        }
        getRecipient(recipient_id)
            .then((data) => setRecipient(data))
    }

    const handleEditClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setEdit(true)
    }

    return (
        <LoadAnimation loaded={loaded}>
        {recipient ? (
            <>
                <Navbar>
                    <Breadcrumbs />
                </Navbar>
                <Card className='shadow mb-1'>
                    <Row className='m-0'>
                        <Col className='col-12 col-md-8 overflow-hidden p-0'>
                            <CardImage url={recipient.image_url} />
                        </Col>
                        <Col className='d-flex flex-column col-12 col-md-4 p-0'>
                            <Form noValidate validated={edit} onSubmit={save}>
                                <Card.Body className='flex-grow-1'>
                                    <InputGroup hasValidation className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>ФИО</InputGroup.Text>
                                        <Form.Control id='fio' required type='text' value={recipient.fio} readOnly={!edit} onChange={changeString} />
                                    </InputGroup>
                                    <FloatingLabel
                                        label="Адрес"
                                        className="mb-3">
                                        <Form.Control
                                            id='adress'
                                            value={recipient.adress}
                                            as="textarea"
                                            className='h-25'
                                            readOnly={!edit}
                                            required
                                            onChange={changeString} />
                                    </FloatingLabel>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Возраст</InputGroup.Text>
                                        <Form.Control id='age' required type='number' value={isNaN(recipient.age) ? '' : recipient.age} readOnly={!edit} onChange={changeNumber} />
                                    </InputGroup>
                                    <InputGroup className='mb-1'>
                                        <InputGroup.Text className='c-input-group-text'>Почта</InputGroup.Text>
                                        <Form.Control id='email' required value={recipient.email} readOnly={!edit} onChange={changeString} />
                                    </InputGroup>
                                    <Form.Group className="mb-1">
                                        <Form.Label>Выберите новое изображение</Form.Label>
                                        <Form.Control
                                            disabled={!edit}
                                            type="file"
                                            accept='image/*'
                                            ref={inputFile}
                                            onChange={(e: ChangeEvent<HTMLInputElement>) => setImage(e.target.files?.[0])} />
                                    </Form.Group>
                                </Card.Body>
                                    {edit ? (
                                        <ButtonGroup className='w-100'>
                                            <Button variant='primary' type='submit'>Сохранить</Button>
                                            {recipient_id != 'new' && <Button variant='danger' onClick={cancel}>Отменить</Button>}
                                        </ButtonGroup>
                                    ) : (
                                        <>
                                            <Button
                                                className='w-100'
                                                onClick={handleEditClick}>
                                                Изменить
                                            </Button>
                                            <Button variant='danger' className='w-100' onClick={deleteRecipient}>Удалить</Button>
                                        </>
                                    )}
                                </Form>
                            </Col>
                        </Row>
                </Card>
            </ >
        ) : (
            <h3 className='text-center'>Такого получателя не существует</h3>
        )}
    </LoadAnimation >
    )
}

export default RecipientInfo