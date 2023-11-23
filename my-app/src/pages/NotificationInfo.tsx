import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IRecipientProps } from '../components/RecipientCard';
import { BigNCard, INotificationProps } from '../components/NotificationCard';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import LoadAnimation from '../components/LoadAnimation';

type Response = {
    notification: INotificationProps;
    recipients: IRecipientProps[];
}

function stringToDate(date: Date | null) {
    return date ? new Date(date) : null;
}

const NotificationInfo: FC = () => {
    let { notification_id } = useParams()
    const [notification, setNotification] = useState<INotificationProps>()
    const [recipients, setRecipients] = useState<IRecipientProps[]>([])
    const [loaded, setLoaded] = useState<boolean>(false)

    useEffect(() => {
        fetch(`/api/notifications/${notification_id}`)
            .then(response => {
                setLoaded(true)
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                data.notification.creation_date = stringToDate(data.notification.creation_date);
                data.notification.formation_date = stringToDate(data.notification.formation_date);
                data.notification.completion_date = stringToDate(data.notification.completion_date);
                setNotification(data.notification)
                setRecipients(data.recipients)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <Navbar>
                <Nav>
                    <Link to="/notifications" className="nav-link p-0 text-dark" data-bs-theme="dark">
                        Уведомления
                    </Link>
                    <Nav.Item className='mx-1'>{">"}</Nav.Item>
                    <Nav.Item className="nav-link p-0 text-dark">
                        {`${notification ? notification.uuid : 'неизвестно'}`}
                    </Nav.Item>
                </Nav>
            </Navbar>
            {loaded ? (
                notification ? (
                    <BigNCard notification={notification} recipients={recipients} />
                ) : (
                    <h4 className='text-center'>Такого уведомления не существует</h4>
                )
            ) : (
                <LoadAnimation />
                )
            }
            {/* <LoadAnimation /> */}
        </ >
    )
}

export { NotificationInfo }