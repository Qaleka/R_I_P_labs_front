import { createSlice } from "@reduxjs/toolkit";

interface searchState {
    fio: string

    status: string
    formationDateStart: string | null
    formationDateEnd: string | null
}

const initialState: searchState = {
    fio: '',

    status: '',
    formationDateStart: null,
    formationDateEnd: null,
}

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setFio: (state, { payload }) => {
            state.fio = payload
        },
        setStatus: (state, { payload }) => {
            state.status = payload
        },
        setDateStart: (state, { payload }) => {
            state.formationDateStart = payload
        },
        setDateEnd: (state, { payload }) => {
            state.formationDateEnd = payload
        },
    },
});

export default searchSlice.reducer;

export const { setFio, setStatus, setDateStart, setDateEnd } = searchSlice.actions;