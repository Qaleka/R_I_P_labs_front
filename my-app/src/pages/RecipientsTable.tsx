import { useEffect, useState } from 'react';
import { Navbar, Form, Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link } from 'react-router-dom';

import { getAllRecipients, axiosAPI } from '../api'
import { IRecipient } from '../models'

import { AppDispatch, RootState } from "../store";
import { setFio } from "../store/searchSlice"
import { clearHistory, addToHistory } from "../store/historySlice"

import LoadAnimation from '../components/LoadAnimation';
import CardImage from '../components/CardImage';


const RecipientTable = () => {
    const searchText = useSelector((state: RootState) => state.search.fio);
    const [recipients, setRecipients] = useState<IRecipient[]>([])
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    const getRecipients = () =>
        getAllRecipients(searchText)
            .then(data => {
                setRecipients(data.recipients)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });


    const handleSearch = (event: React.FormEvent<any>) => {
        event.preventDefault();
        setRecipients([])
        getRecipients();
    }

    useEffect(() => {
        dispatch(clearHistory())
        dispatch(addToHistory({ path: location, name: "Управление получателями" }))
        getRecipients();
    }, [dispatch]);

    const deleteRecipient = (uuid: string) => () => {
        let accessToken = localStorage.getItem('access_token');
        axiosAPI.delete(`/recipients/${uuid}`, { headers: { 'Authorization': `Bearer ${accessToken}`, } })
            .then(() => getRecipients())
    }
    return (
        <>
            <Navbar>
                <Form className="d-flex flex-row flex-grow-1 gap-2" onSubmit={handleSearch}>
                    <Form.Control
                        type="text"
                        placeholder="Поиск"
                        className="form-control-sm flex-grow-1 shadow"
                        data-bs-theme="primary"
                        value={searchText}
                        onChange={(e) => dispatch(setFio(e.target.value))}
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
            < LoadAnimation loaded={recipients.length > 0}>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th className='text-center'>Изображение</th>
                            <th className='text-center'>ФИО</th>
                            <th className='text-center'>Адрес</th>
                            <th className='text-center'>Почта</th>
                            <th className='text-center text-nowrap'>Возраст</th>
                            <th className=''></th>
                        </tr>
                    </thead>
                    <tbody>
                        {recipients.map((recipient) => (
                            <tr key={recipient.uuid}>
                                <td style={{ width: '15%' }} className='p-0'>
                                    <CardImage url={recipient.image_url} />
                                </td>
                                <td className='text-center'>{recipient.fio}</td>
                                <td className='text-center'>{recipient.adress}</td>
                                <td className='text-center'>{recipient.email}</td>
                                <td className='text-center'>{recipient.age}</td>
                                <td className='text-center align-middle'>
                                    <table className='table m-0'>
                                        <tr>
                                            <Link
                                                to={`/recipients-edit/${recipient.uuid}`}
                                                className='btn btn-sm btn-outline-primary text-decoration-none w-100' >
                                                Редактировать
                                            </Link>
                                        </tr>
                                        <tr><td className='p-1'></td></tr>
                                        <tr>
                                            <Button
                                                variant='outline-danger'
                                                size='sm'
                                                className='w-100'
                                                onClick={deleteRecipient(recipient.uuid)}>
                                                Удалить
                                            </Button>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </LoadAnimation >
        </>
    )
}

export default RecipientTable