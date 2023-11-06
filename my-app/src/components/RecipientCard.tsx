import { FC } from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import './RecipientCard.css'

export interface IRecipientProps {
    uuid: string
    fio: string
    email: string
    age: number
    adress: string
    image_url: string
}

export const SmallCard: FC<IRecipientProps> = ({ uuid,fio,email, age,adress, image_url}) => (
    <Card className='small_card'>
        <div className="image-recipient">
            <Card.Img variant='top' src={`http://${image_url}`} className='small_card_image' />
        </div>
        <Card.Body className='small_card_body'>
            <Card.Title>{fio}</Card.Title>
            <Card.Text>Почта: {email}</Card.Text>
        </Card.Body>
        <a href={`/recipients/${uuid}`} className="btn btn-primary card_button">Подробнее</a>
    </Card>
)

export const BigCard: FC<IRecipientProps> = ({  uuid,fio,email, age,adress, image_url}) => {
    return (
        <Card>
            <Card.Body>
                <div className='card_wrapper big_card_wrapper'>
                    <div className='card_image'>
                        <Card.Img src={`http://${image_url}`} />
                    </div>
                    <div className='big_card_body'>
                        <Card.Title>{fio}</Card.Title>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Card.Text>Возраст: {age}</Card.Text>
                                <Card.Text>Почта: {email}</Card.Text>
                                <Card.Text>Адрес: {adress}</Card.Text>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
};
