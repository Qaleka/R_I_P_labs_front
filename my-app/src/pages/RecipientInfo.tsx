import { FC, useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { BigRCard } from '../components/RecipientCard';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
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