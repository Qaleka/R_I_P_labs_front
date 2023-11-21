import { FC } from 'react'
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export interface IRecipientProps {
    uuid: string
    fio: string
    email: string
    age: number
    adress: string
    image_url: string
}

export const SmallCard: FC<IRecipientProps> = ({ uuid,fio,email, image_url}) => (
    <Card className='card text-center'>
            <Card.Img variant='top' src={`http://${image_url}`} className='rounded object-fit-cover' />
        <Card.Body className='flex-grow-1'>
            <Card.Title>{fio}</Card.Title>
            <Card.Text>{email}</Card.Text>
        </Card.Body>
        <Link to={`/recipients/${uuid}`} className="btn btn-dark">Подробнее</Link>
    </Card>
)

export const BigCard: FC<IRecipientProps> = ({fio,email, age,adress, image_url}) => {
    return (
        <Card className='mx-auto shadow w-50 p-3 text-center text-md-start' >
             <div className='row'>
                <div className='col-12 col-md-8 px-md-0overflow-hidden'>
                    <Card.Img src={`http://${image_url}`} />
                </div>
                <Card.Body className='col-12 col-md-4 ps-md-0'>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <Card.Title>{fio}</Card.Title>
                            <Card.Text>Возраст: {age}</Card.Text>
                            <Card.Text>Почта: {email}</Card.Text>
                            <Card.Text>Адрес: {adress}</Card.Text>
                        </ListGroup.Item>
                    </ListGroup>
                    </Card.Body>
            </div>
        </Card>
    );
};
