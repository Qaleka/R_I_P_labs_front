import { configureStore } from "@reduxjs/toolkit";
import recipientReducer from "./recipientSlice";
import notificationReducer from "./notificationSlice";
import historyReducer from "./historySlice";
import userReducer from "./userSlice";

export const store = configureStore({
    reducer: {
        recipient: recipientReducer,
        notification: notificationReducer,
        history: historyReducer,
        user: userReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;