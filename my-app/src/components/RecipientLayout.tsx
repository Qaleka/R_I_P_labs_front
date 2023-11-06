import { FC, useEffect, useState } from 'react';
import { SmallCard, IRecipientProps } from './RecipientCard';
import './RecipientLayout.css'

type Response = {
    draft_notification: string;
    recipients: IRecipientProps[];
}

const RecipientLayout: FC = () => {
    const [recipients, setRecipients] = useState<IRecipientProps[]>([]);
    const [draftNotification, setDraftNotification] = useState('');

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
        <div className='recipient_layout'>
            {recipients && recipients.length > 0 ? (
                recipients.map((recipient) => (
                    <SmallCard key={recipient.uuid} {...recipient} />
                ))
            ) : (
                <p>Loading containers...</p>
            )}
        </div>
    );
}

export default RecipientLayout;