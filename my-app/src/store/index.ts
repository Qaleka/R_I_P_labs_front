import { configureStore } from "@reduxjs/toolkit";
import recipientReducer from "./recipientSlice";
import notificationReducer from "./notificationSlice";

export const store = configureStore({
    reducer: {
        recipient: recipientReducer,
        notification: notificationReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;