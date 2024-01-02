import { format } from 'date-fns';

import { axiosAPI } from ".";
import { IRecipient, INotification } from "../models";

interface NotificationsResponse {
    notifications: INotification[]
}

function formatDate(date: Date | null): string {
    if (!date) {
        return ""
    }
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes} ${day}.${month}.${year}`;
}

export async function getNotifications(
    status: string,
    startDate: string | null,
    endDate: string | null
): Promise<INotification[]> {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return [];
    }
    return axiosAPI
        .get<NotificationsResponse>('/notifications', {
            params: {
                ...(status && { status: status }),
                ...(startDate && {
                    formation_date_start: format(new Date(startDate), 'yyyy-MM-dd HH:mm'),
                }),
                ...(endDate && {
                    formation_date_end: format(new Date(endDate), 'yyyy-MM-dd HH:mm'),
                }),
            },
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        })
        .then((response) =>
            response.data.notifications.map((tr: INotification) => ({
                ...tr,
                creation_date: formatDate(new Date(tr.creation_date)),
                formation_date: tr.formation_date
                    ? formatDate(new Date(tr.formation_date))
                    : null,
                completion_date: tr.completion_date
                    ? formatDate(new Date(tr.completion_date))
                    : null,
            }))
        );
}

interface NotificationResponse {
    recipients: IRecipient[]
    notification: INotification
}

export async function getNotification(id: string | undefined): Promise<NotificationResponse | null> {
    if (id === undefined) { return null; }
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
        return null;
    }

    return axiosAPI.get<NotificationResponse>(`/notifications/${id}`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            const modifiedNotification: INotification = {
                ...response.data.notification,
                creation_date: formatDate(new Date(response.data.notification.creation_date)),
                formation_date: response.data.notification.formation_date
                    ? formatDate(new Date(response.data.notification.formation_date))
                    : null,
                completion_date: response.data.notification.completion_date
                    ? formatDate(new Date(response.data.notification.completion_date))
                    : null,
            };

            return {
                ...response.data,
                notification: modifiedNotification,
            };
        })
}