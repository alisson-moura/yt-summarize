import { getAuthToken, login, logout, registerUserAction } from "./auth";
import { updateProfileAction } from "./profile";

export const actions = {
    auth: {
        registerUserAction,
        getAuthToken,
        logout,
        login
    },
    profile: {
        updateProfileAction
    }
};