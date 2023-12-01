import { recipients } from './MockData';
import { IRecipientProps } from '../components/RecipientCard';

const api = '/api/recipients/'

export async function getRecipient(recipientId?: string): Promise<IRecipientProps | undefined> {
    if (recipientId === undefined) {
        return undefined
    }
    let url = api + recipientId
    return fetch(url)
        .then(response => {
            if (response.status >= 500 || response.headers.get("Server") == "GitHub.com") {
                return recipients.get(recipientId)
            }
            return response.json() as Promise<IRecipientProps | undefined>
        })
        .catch(_ => {
            return recipients.get(recipientId)
        })
}