import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { BigCard, IRecipientProps } from '../components/RecipientCard';

const RecipientInfo: FC = () => {
    let { recipient_id } = useParams()
    const [recipient, setRecipient] = useState<IRecipientProps>()

    useEffect(() => {
        fetch(`/api/recipients/${recipient_id}`)
            .then(response => {
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
            {recipient ? (
                <div className='p-3'>
                    <BigCard {...recipient} />
                </div>
            ) : (<p>Loading recipients...</p>)}
        </>
    )
}

export { RecipientInfo }