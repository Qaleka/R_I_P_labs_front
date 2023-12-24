import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IRecipient } from "../models";


interface notificationState {
    draft: string | null
}

const initialState: notificationState = {
    draft: null
}

const notificationSlice = createSlice({
    name: 'recipientFilter',
    initialState,
    reducers: {
        setDraft: (state, { payload }) => {
            state.draft = payload
        },
    },
});

export default notificationSlice.reducer;

export const { setDraft } = notificationSlice.actions;