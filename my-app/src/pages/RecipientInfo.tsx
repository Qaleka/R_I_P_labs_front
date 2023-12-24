import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigRCard } from '../components/RecipientCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';
import { getRecipient } from '../api'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setRecipient, resetRecipient } from "../store/recipientSlice"


const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const recipient = useSelector((state: RootState) => state.recipient.recipient);
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        getRecipient(recipient_id)
            .then(data => {
                dispatch(setRecipient(data))
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            return () => {
                dispatch(resetRecipient());
            };
        }, [dispatch]);

    return (
        <>
        <Navbar>
                <Nav>
                <Link to="/recipients" className="nav-link p-0 text-dark" data-bs-theme="dark">
                    Получатели
                </Link>
                <Nav.Item className='mx-1'>{">"}</Nav.Item>
                <Nav.Item className="nav-link p-0 text-dark">
                    {`${recipient ? recipient.fio : 'неизвестно'}`}
                </Nav.Item>
                </Nav>
            </Navbar>
            {loaded ? (
                 recipient ? (
                    <BigRCard {...recipient} />
                 ) : (
                     <h3 className='text-center'>Такого получателя не существует</h3>
                 )
             ) : (
                <LoadAnimation />
            )
            }
        </>
    )
}

export default RecipientInfo 