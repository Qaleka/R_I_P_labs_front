import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigRCard, IRecipientProps } from '../components/RecipientCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';


const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const [recipient, setRecipient] = useState<IRecipientProps>()
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/recipients/${recipient_id}`)
            .then(response => {
                setLoaded(true)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<IRecipientProps>
            })
            .then(data => {
                setRecipient(data)
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
                     <h4 className='text-center'>Такого получателя не существует</h4>
                 )
             ) : (
                <LoadAnimation />
            )
            }
        </>
    )
}

export { RecipientInfo }