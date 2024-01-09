import { createSlice } from "@reduxjs/toolkit";

interface searchState {
    fio: string

    user: string
    status: string
    formationDateStart: string | null
    formationDateEnd: string | null
}

const initialState: searchState = {
    fio: '',

    user: '',
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
        setUser: (state, { payload }) => {
            state.user = payload
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
        reset: (state) => {
            state = initialState
        }
    },
});

export default searchSlice.reducer;

export const { reset, setFio, setUser, setStatus, setDateStart, setDateEnd } = searchSlice.actions;