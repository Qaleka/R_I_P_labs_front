import { recipients, draft_notification } from './MockData';
import { IRecipientProps } from '../components/RecipientCard';

export type Response = {
    draft_notification: string | null;
    recipients: IRecipientProps[];
}

export async function getAllRecipients(filter?: string): Promise<Response> {
    let url = '/api/recipients/'
    if (filter !== undefined) {
        url += `?fio=${filter}`
    }
    return fetch(url)
        .then(response => {
            if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
                return fromMock(filter)
            }
            return response.json() as Promise<Response>
        })
        .catch(_ => {
            return fromMock(filter)
        })
}

function fromMock(filter?: string): Response {
    let filteredRecipients = Array.from(recipients.values())
    if (filter !== undefined) {
        let fio = filter.toLowerCase()
        filteredRecipients = filteredRecipients.filter(
            (recipient) => recipient.fio.toLowerCase().includes(fio)
        )
    }
    return { draft_notification, recipients: filteredRecipients }
}