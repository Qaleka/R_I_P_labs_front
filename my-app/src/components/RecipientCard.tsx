import { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom';
import {Card, ButtonGroup} from 'react-bootstrap';
import CardImage from './CardImage';
import { IRecipient } from '../models'




interface RecipientCardProps extends IRecipient {
    children: ReactNode;
}
const RecipientCard: FC<RecipientCardProps> = ({ children, uuid, fio, email, image_url}) => (
    <Card className='card text-center' key={uuid}>
            <CardImage url={image_url} className='rounded object-fit-cover' />
        <Card.Body className='flex-grow-1'>
            <Card.Title>{fio}</Card.Title>
            <Card.Text>{email}</Card.Text>
        </Card.Body>
        <ButtonGroup vertical>
            <Link to={`/recipients/${uuid}`} className="btn btn-primary">Подробнее</Link>
            <>{children}</>
        </ButtonGroup>
    </Card>
)


export default RecipientCard;