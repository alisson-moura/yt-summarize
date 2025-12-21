import { getProfile, isAuthError, loginStrapiService, strapiRegisterUser } from "./auth";
import { updateProfileService } from "./profile";

export const services = {
    auth: {
        strapiRegisterUser,
        loginStrapiService,
        isAuthError,
        getProfile
    },
    profile: {
        updateProfileService
    }
}