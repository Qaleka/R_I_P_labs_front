import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigRCard, IRecipientProps } from '../components/RecipientCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';
import { getRecipient } from '../requests/GetRecipient'


const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const [recipient, setRecipient] = useState<IRecipientProps>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        getRecipient(recipient_id)
            .then(data => {
                setRecipient(data)
                setLoaded(true)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

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

export { RecipientInfo }