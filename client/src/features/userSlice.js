import { createSlice } from "@reduxjs/toolkit";
import appApi from "../services/appApi";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        newMessages: {},
    },
    reducers: {
        addNotifications: (state, { payload }) => {
            if (!state.newMessages) {
                state.newMessages = {};
            }
            if (state.newMessages[payload]) {
                state.newMessages[payload] += 1;
            } else {
                state.newMessages[payload] = 1;
            }
        },
        resetNotifications: (state, { payload }) => {
            if (state.newMessages && state.newMessages[payload]) {
                delete state.newMessages[payload];
            }
        },
    },
    extraReducers: (builder) => {
        builder.addMatcher(appApi.endpoints.signupUser.matchFulfilled, (state, { payload }) => {
            state.user = payload;
        });
        builder.addMatcher(appApi.endpoints.loginUser.matchFulfilled, (state, { payload }) => {
            state.user = payload;
        });
        builder.addMatcher(appApi.endpoints.logoutUser.matchFulfilled, () => {
            return {
                user: null,
                newMessages: {},
            };
        });
    },
});

export const { addNotifications, resetNotifications } = userSlice.actions;
export default userSlice.reducer;
