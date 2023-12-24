import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRecipient } from "../models";


interface recipientsState {
    recipients: IRecipient[] | undefined
    recipient: IRecipient | undefined
    searchText: string
}

const initialState: recipientsState = {
    recipients: undefined,
    recipient: undefined,
    searchText: '',
}

const recipientSlice = createSlice({
    name: 'recipient',
    initialState,
    reducers: {
        setFilter: (state, { payload }) => {
            state.searchText = payload
        },
        setRecipients: (state, { payload }) => {
            state.recipients = payload
        },
        setRecipient: (state, { payload }) => {
            state.recipient = payload
        },
        resetRecipient: (state) => {
            state.recipient = undefined;
        },
    },
});

export default recipientSlice.reducer;

export const { setFilter, setRecipients, setRecipient, resetRecipient } = recipientSlice.actions;