import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BigRCard } from '../components/RecipientCard';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';
import { getRecipient } from '../api'
import { AppDispatch, RootState } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { setRecipient, resetRecipient } from "../store/recipientSlice"
import { addToHistory } from "../store/historySlice"
import Breadcrumbs from '../components/Breadcrumbs';

const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const recipient = useSelector((state: RootState) => state.recipient.recipient);
    const [loaded, setLoaded] = useState<boolean>(false)
    const dispatch = useDispatch<AppDispatch>();
    const location = useLocation().pathname;

    console.log()

    useEffect(() => {
        getRecipient(recipient_id)
            .then(data => {
                dispatch(setRecipient(data))
                dispatch(addToHistory({ path: location, name: data ? data.fio : "неизвестно" }))
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
            return () => {
                dispatch(resetRecipient());
            };
        }, [dispatch]);

        return loaded ? (
            recipient ? (
                <>
                    <Navbar>
                        <Nav>
                            <Breadcrumbs />
                        </Nav>
                    </Navbar>
                    <BigRCard {...recipient} />
                </ >
            ) : (
                <h3 className='text-center'>Такого получателя не существует</h3>
            )
        ) : (
            <LoadAnimation />
    )
}

export default RecipientInfo 