import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import CardImage from '../components/CardImage';
import { Card, Row, Navbar, ListGroup } from 'react-bootstrap';
import LoadAnimation from '../components/LoadAnimation';
import { getRecipient } from '../api'
import { IRecipient } from '../models';
import { AppDispatch } from "../store";
import { useDispatch } from "react-redux";
import { addToHistory } from "../store/historySlice"
import Breadcrumbs from '../components/Breadcrumbs';

const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const [recipient, setRecipient] = useState<IRecipient | undefined>(undefined)
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    console.log()

    useEffect(() => {
        getRecipient(recipient_id)
            .then(data => {
                setRecipient(data);
                dispatch(addToHistory({ path: location, name: data ? data.fio : "неизвестно" }));
                setLoaded(true);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
        }, [dispatch]);

        return (
            <LoadAnimation loaded={loaded}>
                {recipient ? (
                    <>
                        <Navbar>
                            <Breadcrumbs />
                            </Navbar>
                    <Card className='mx-auto shadow w-50 p-3 text-center text-md-start'>
                        <Row>
                            <div className='col-12 col-md-8 overflow-hidden text-center'>
                                <CardImage url={recipient.image_url} />
                                <Card.Title>{recipient.fio}</Card.Title>
                            </div>
                            <Card.Body className='col-12 col-md-4 ps-md-0'>
                                <ListGroup variant="flush">
                                    <ListGroup.Item>
                                        <Card.Text>Почта: {recipient.email}</Card.Text>
                                        <Card.Text>Возраст: {recipient.age}</Card.Text>
                                        <Card.Text>Адрес: {recipient.adress}</Card.Text>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card.Body>
                        </Row>
                    </Card>
                </ >
            ) : (
                <h3 className='text-center'>Такого получателя не существует</h3>
            )}
        </LoadAnimation>
    )
}

export default RecipientInfo 