import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { SmallRCard, IRecipientProps } from './RecipientCard'

export interface INotificationProps {
    uuid: string
    status: string
    creation_date: Date | null
    formation_date: Date | null
    completion_date: Date | null
    customer: string
    moderator: string
    notification_type: string
}

interface IExtendedNotificationProps{
    notification: INotificationProps;
    recipients: IRecipientProps[];
}

function formatDateToString(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-based
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

export const SmallNCard: FC<INotificationProps> = ({ uuid, status, creation_date, formation_date, completion_date, notification_type }) => (
    <Card className='w-100 mx-auto px-0 shadow text-center'>
        <Card.Body className='flex-grow-1'>
            <Card.Text>Статус: {status}</Card.Text>
            <Card.Text>Дата создания: {formatDateToString(creation_date)}</Card.Text>
            {formation_date ? (<Card.Text>Дата формирования: {formatDateToString(formation_date)}</Card.Text>) : (<></>)}
            {completion_date ? <Card.Text>Дата подтверждения: {formatDateToString(completion_date)}</Card.Text> : <></>}
            <Card.Text>Тип уведомления: {notification_type ? notification_type : "Неизвестен"}</Card.Text>
        </Card.Body>
        <Link to={`/notifications/${uuid}`} className="btn btn-primary">Подробнее</Link>
    </Card>
)

export const BigNCard: FC<IExtendedNotificationProps> = ({ notification, recipients}) => (
    <Card className='shadow-sm text-center text-md-start'>
        <div className='row m-0'>
            <Card.Body className='col-12 col-md-4 pe-md-0'>
                <Card.Text>Статус: {notification.status}</Card.Text>
                <Card.Text>Дата создания: {formatDateToString(notification.creation_date)}</Card.Text>
                {notification.formation_date ? (<Card.Text>Дата формирования: {formatDateToString(notification.formation_date)}</Card.Text>) : (<></>)}
                {notification.completion_date ? <Card.Text>Дата подтверждения: {formatDateToString(notification.completion_date)}</Card.Text> : <></>}
                <Card.Text>Тип уведомления: {notification.notification_type ? notification.notification_type : "Неизвестен"}</Card.Text>
            </Card.Body>
            <div className='col-12 col-md-8'>
                <div className='row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-xl-3 px-1'>
                    {recipients.map((recipient) => (
                        <div className='d-flex py-1 p-sm-2 p-md-2 justify-content-center' key={recipient.uuid}>
                            <SmallRCard  {...recipient} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </Card>
);