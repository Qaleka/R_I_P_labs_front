import { FC, useEffect, useState } from 'react';
import { SmallCard, IRecipientProps } from './RecipientCard';
//import './RecipientLayout.css'

type Response = {
    draft_notification: string;
    recipients: IRecipientProps[];
}

const RecipientLayout: FC = () => {
    const [recipients, setRecipients] = useState<IRecipientProps[]>([]);
    const [_, setDraftNotification] = useState('');

    useEffect(() => {
        fetch('/api/recipients')
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText)
                }
                return response.json() as Promise<Response>
            })
            .then(data => {
                console.log(data)
                setDraftNotification(data.draft_notification)
                setRecipients(data.recipients)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4'>
            {recipients && recipients.length > 0 ? (
                recipients.map((recipient) => (
                    <div className='d-flex py-1 px-0 p-sm-1 p-md-2'>
                        <SmallCard key={recipient.uuid} {...recipient} />
                    </div>
                ))
            ) : (
                <p>Loading containers...</p>
            )}
        </div>
    );
}

export default RecipientLayout;