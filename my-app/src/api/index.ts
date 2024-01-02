import { recipients, draft_notification } from './MockData';
import { IRecipient } from '../models';
import axios, { AxiosRequestConfig } from 'axios';


const ip = 'localhost'
const port = '3000'
export const imagePlaceholder = `${import.meta.env.BASE_URL}placeholder.jpg`

export const axiosAPI = axios.create({ baseURL: `http://${ip}:${port}/api/`, timeout: 2000 });
export const axiosImage = axios.create({ baseURL: `http://${ip}:${port}/images/`, timeout: 1000 });


export type Response = {
    draft_notification: string   | null;
    recipients: IRecipient[];
}

export async function getAllRecipients(filter?: string): Promise<Response> {
    let url = 'recipients';
    if (filter !== undefined) {
        url += `?fio=${filter}`;
    }
    const headers: AxiosRequestConfig['headers'] = {};
    let accessToken = localStorage.getItem('access_token');
    if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return axiosAPI.get<Response>(url, { headers })
        .then(response => response.data)
        .catch(_ => fromMock(filter))
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

export async function getRecipient(recipientId?: string): Promise<IRecipient | undefined> {
    if (recipientId === undefined) {
        return undefined
    }
    let url = 'recipients/' + recipientId
    return axiosAPI.get<IRecipient>(url)
        .then(response => response.data)
        .catch(_ => recipients.get(recipientId))
}