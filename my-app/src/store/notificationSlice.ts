import { createSlice } from "@reduxjs/toolkit";
import { INotification, IRecipient } from "../models";

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

interface notificationState {
    draft: string | null
    notifications: INotification[] | null
    notification: INotification | null
    notificationContent: IRecipient[]

    statusFilter: string
    formationDateStart: string | null
    formationDateEnd: string | null
}

const initialState: notificationState = {
    draft: null,
    notifications: null,
    notification: null,
    notificationContent: [],

    statusFilter: '',
    formationDateStart: null,
    formationDateEnd: null,
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setDraft: (state, { payload }) => {
            state.draft = payload
        },
        setNotifications: (state, { payload }) => {
            state.notifications = payload.map((notification: INotification) => ({
                ...notification,
                creation_date: formatDate(new Date(notification.creation_date)),
                formation_date: notification.formation_date ? formatDate(new Date(notification.formation_date)) : null,
                completion_date: notification.completion_date ? formatDate(new Date(notification.completion_date)) : null,
            }));
        },
        setNotification: (state, { payload }) => {
            state.notification = {
                ...payload,
                creation_date: formatDate(new Date(payload.creation_date)),
                formation_date: payload.formation_date ? formatDate(new Date(payload.formation_date)) : null,
                completion_date: payload.completion_date ? formatDate(new Date(payload.completion_date)) : null,
            }
        },
        setContent: (state, { payload }) => {
            state.notificationContent = payload
        },
        resetNotification: (state) => {
            state.notification = null
        },
        setStatusFilter: (state, { payload }) => {
            state.statusFilter = payload
        },
        setDateStart: (state, { payload }) => {
            state.formationDateStart = payload ? payload.toISOString() : null
        },
        setDateEnd: (state, { payload }) => {
            state.formationDateEnd = payload ? payload.toISOString() : null
        },
    },
});

export default notificationSlice.reducer;

export const { setDraft, setNotifications, setNotification, resetNotification, setStatusFilter, setDateStart, setDateEnd, setContent } = notificationSlice.actions;